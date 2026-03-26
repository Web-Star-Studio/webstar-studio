#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FIRECRAWL_API_BASE = "https://api.firecrawl.dev/v2";
const DEFAULT_FORMATS = ["markdown", "html", "links"];
const DEFAULT_LIMIT = 500;
const DEFAULT_POLL_INTERVAL_MS = 5000;
const DEFAULT_TIMEOUT_MS = 30 * 60 * 1000;

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  if (!options.url) {
    throw new Error("Missing required --url argument.");
  }

  const apiKey = await loadFirecrawlApiKey(process.cwd());

  if (!apiKey) {
    throw new Error(
      "Missing FIRECRAWL_API_KEY. Add it to .env or .env.local before running this script."
    );
  }

  const startedAt = new Date();
  const runId = startedAt.toISOString().replace(/[:.]/g, "-");
  const label = sanitizeSegment(options.label || hostnameLabel(options.url));
  const outputDir = path.join(process.cwd(), "tmp", "firecrawl", label, runId);

  await mkdir(outputDir, { recursive: true });

  log(`Output directory: ${outputDir}`);
  log(`Target: ${options.url}`);
  log("Mapping site URLs with Firecrawl...");

  const mapResult = await firecrawlRequest(apiKey, "/map", {
    method: "POST",
    body: {
      url: options.url,
      limit: options.limit,
      sitemap: "include",
    },
  });

  const mappedLinks = Array.isArray(mapResult.links) ? mapResult.links : [];
  await writeJson(path.join(outputDir, "map.json"), mapResult);
  log(`Mapped ${mappedLinks.length} URLs.`);

  log("Starting full-site crawl...");
  const crawlStart = await firecrawlRequest(apiKey, "/crawl", {
    method: "POST",
    body: {
      url: options.url,
      limit: options.limit,
      maxDiscoveryDepth: options.maxDiscoveryDepth,
      crawlEntireDomain: true,
      allowSubdomains: options.allowSubdomains,
      allowExternalLinks: false,
      sitemap: "include",
      ignoreQueryParameters: true,
      scrapeOptions: {
        formats: DEFAULT_FORMATS,
        onlyMainContent: false,
      },
    },
  });

  const crawlId = crawlStart.id;

  if (!crawlId) {
    throw new Error(`Firecrawl did not return a crawl id: ${JSON.stringify(crawlStart)}`);
  }

  log(`Crawl job id: ${crawlId}`);
  const status = await waitForCrawlCompletion({
    apiKey,
    crawlId,
    pollIntervalMs: options.pollIntervalMs,
    timeoutMs: options.timeoutMs,
  });

  await writeJson(path.join(outputDir, "crawl-result.json"), status);

  const documents = Array.isArray(status.data) ? status.data : [];
  const pagesDir = path.join(outputDir, "pages");
  await mkdir(pagesDir, { recursive: true });

  for (const doc of documents) {
    const pageUrl = doc?.metadata?.sourceURL || doc?.metadata?.url || "unknown-page";
    const pageDir = path.join(pagesDir, urlToDirectoryName(pageUrl));

    await mkdir(pageDir, { recursive: true });
    await writeJson(path.join(pageDir, "metadata.json"), doc?.metadata || {});

    if (typeof doc?.markdown === "string") {
      await writeFile(path.join(pageDir, "page.md"), doc.markdown, "utf8");
    }

    if (typeof doc?.html === "string") {
      await writeFile(path.join(pageDir, "page.html"), doc.html, "utf8");
    }

    if (Array.isArray(doc?.links)) {
      await writeJson(path.join(pageDir, "links.json"), doc.links);
    }
  }

  const summary = buildSummary({
    startedAt,
    finishedAt: new Date(),
    url: options.url,
    label,
    runId,
    mappedLinks,
    status,
    outputDir,
  });

  await writeFile(path.join(outputDir, "summary.md"), summary, "utf8");

  log("");
  log("Crawl complete.");
  log(`Saved ${documents.length} crawled pages.`);
  log(`Summary: ${path.join(outputDir, "summary.md")}`);
}

function parseArgs(args) {
  const options = {
    url: "",
    label: "",
    limit: DEFAULT_LIMIT,
    maxDiscoveryDepth: undefined,
    allowSubdomains: true,
    pollIntervalMs: DEFAULT_POLL_INTERVAL_MS,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    help: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }

    if (!arg.startsWith("--")) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const [key, inlineValue] = arg.slice(2).split("=", 2);
    const value = inlineValue ?? args[index + 1];

    switch (key) {
      case "url":
        options.url = value;
        if (inlineValue == null) index += 1;
        break;
      case "label":
        options.label = value;
        if (inlineValue == null) index += 1;
        break;
      case "limit":
        options.limit = toPositiveInteger(value, "--limit");
        if (inlineValue == null) index += 1;
        break;
      case "max-discovery-depth":
        options.maxDiscoveryDepth = toPositiveInteger(value, "--max-discovery-depth");
        if (inlineValue == null) index += 1;
        break;
      case "poll-interval-ms":
        options.pollIntervalMs = toPositiveInteger(value, "--poll-interval-ms");
        if (inlineValue == null) index += 1;
        break;
      case "timeout-ms":
        options.timeoutMs = toPositiveInteger(value, "--timeout-ms");
        if (inlineValue == null) index += 1;
        break;
      case "allow-subdomains":
        options.allowSubdomains = parseBooleanFlag(value, "--allow-subdomains");
        if (inlineValue == null) index += 1;
        break;
      default:
        throw new Error(`Unknown argument: --${key}`);
    }
  }

  return options;
}

function parseBooleanFlag(value, flagName) {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`${flagName} must be set to true or false.`);
}

function toPositiveInteger(value, flagName) {
  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${flagName} must be a positive integer.`);
  }

  return parsed;
}

async function waitForCrawlCompletion({ apiKey, crawlId, pollIntervalMs, timeoutMs }) {
  const started = Date.now();
  let nextUrl = `${FIRECRAWL_API_BASE}/crawl/${crawlId}`;
  let latestStatus = null;

  while (Date.now() - started < timeoutMs) {
    latestStatus = await firecrawlRequest(apiKey, nextUrl, { absoluteUrl: true });
    printProgress(latestStatus);

    if (latestStatus.status === "completed") {
      if (latestStatus.next) {
        latestStatus.data = await collectPaginatedData(apiKey, latestStatus);
      }

      return latestStatus;
    }

    if (latestStatus.status === "failed" || latestStatus.status === "cancelled") {
      throw new Error(`Firecrawl crawl ended with status "${latestStatus.status}".`);
    }

    await sleep(pollIntervalMs);
  }

  throw new Error(`Timed out waiting for crawl ${crawlId} after ${timeoutMs}ms.`);
}

async function collectPaginatedData(apiKey, initialStatus) {
  const pages = Array.isArray(initialStatus.data) ? [...initialStatus.data] : [];
  let nextUrl = initialStatus.next;

  while (nextUrl) {
    const page = await firecrawlRequest(apiKey, nextUrl, { absoluteUrl: true });

    if (Array.isArray(page.data)) {
      pages.push(...page.data);
    }

    nextUrl = page.next;
  }

  return pages;
}

async function firecrawlRequest(apiKey, endpointOrUrl, options = {}) {
  const url = options.absoluteUrl ? endpointOrUrl : `${FIRECRAWL_API_BASE}${endpointOrUrl}`;
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `Firecrawl request failed (${response.status} ${response.statusText}): ${JSON.stringify(payload)}`
    );
  }

  return payload;
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

async function loadFirecrawlApiKey(cwd) {
  const envPaths = [path.join(cwd, ".env"), path.join(cwd, ".env.local")];

  for (const envPath of envPaths) {
    const env = await readEnvFile(envPath);

    if (env.FIRECRAWL_API_KEY) {
      return env.FIRECRAWL_API_KEY;
    }
  }

  return process.env.FIRECRAWL_API_KEY || "";
}

async function readEnvFile(filePath) {
  try {
    const source = await readFile(filePath, "utf8");
    return parseEnv(source);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

function parseEnv(source) {
  const result = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const equalsIndex = line.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = line.slice(0, equalsIndex).trim();
    let value = line.slice(equalsIndex + 1).trim();

    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function buildSummary({ startedAt, finishedAt, url, label, runId, mappedLinks, status, outputDir }) {
  const pages = Array.isArray(status.data) ? status.data : [];
  const topLevelUrls = pages
    .map((doc) => doc?.metadata?.sourceURL || doc?.metadata?.url)
    .filter(Boolean)
    .slice(0, 50);

  return [
    `# Firecrawl summary: ${label}`,
    "",
    `- Source URL: ${url}`,
    `- Run ID: ${runId}`,
    `- Started: ${startedAt.toISOString()}`,
    `- Finished: ${finishedAt.toISOString()}`,
    `- Output directory: ${outputDir}`,
    `- Map URL count: ${mappedLinks.length}`,
    `- Crawl status: ${status.status}`,
    `- Crawl total: ${status.total ?? pages.length}`,
    `- Crawl completed: ${status.completed ?? pages.length}`,
    `- Credits used: ${status.creditsUsed ?? "unknown"}`,
    "",
    "## Sample crawled URLs",
    "",
    ...topLevelUrls.map((pageUrl) => `- ${pageUrl}`),
    "",
    "## Files",
    "",
    "- `map.json`: Firecrawl site map response",
    "- `crawl-result.json`: Full crawl status payload with all returned documents",
    "- `pages/<slug>/metadata.json`: Per-page metadata",
    "- `pages/<slug>/page.md`: Per-page markdown",
    "- `pages/<slug>/page.html`: Per-page rendered HTML",
    "- `pages/<slug>/links.json`: Per-page extracted links when available",
  ].join("\n");
}

function hostnameLabel(url) {
  return new URL(url).hostname.replace(/^www\./, "");
}

function urlToDirectoryName(url) {
  const parsed = new URL(url);
  const pathname = parsed.pathname === "/" ? "home" : parsed.pathname;
  const raw = `${parsed.hostname}${pathname}${parsed.search}`.toLowerCase();
  return sanitizeSegment(raw);
}

function sanitizeSegment(value) {
  return value
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9._/-]+/g, "-")
    .replace(/[/?#]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 180);
}

function printProgress(status) {
  const completed = status?.completed ?? 0;
  const total = status?.total ?? "?";
  const creditsUsed = status?.creditsUsed ?? "?";
  log(`Status: ${status?.status ?? "unknown"} (${completed}/${total}, credits ${creditsUsed})`);
}

function log(message) {
  process.stdout.write(`${message}\n`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function printHelp() {
  log("Firecrawl full-site crawler");
  log("");
  log("Usage:");
  log("  node scripts/firecrawl-crawl-site.mjs --url https://example.com [options]");
  log("");
  log("Options:");
  log("  --url <url>                    Starting URL to crawl");
  log("  --label <name>                 Output folder label");
  log("  --limit <number>               Crawl page limit (default: 500)");
  log("  --max-discovery-depth <n>      Optional Firecrawl discovery depth");
  log("  --allow-subdomains true|false  Follow subdomains (default: true)");
  log("  --poll-interval-ms <n>         Status polling interval in ms (default: 5000)");
  log("  --timeout-ms <n>               Overall timeout in ms (default: 1800000)");
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
