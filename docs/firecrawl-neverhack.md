# Firecrawl Neverhack Crawl

This repo now includes a reusable Firecrawl crawler for pulling a full-site content dump that we can use as reference while rebuilding the Neverhack experience for Webstar.

## Setup

Add your Firecrawl key to either `.env` or `.env.local`:

```bash
FIRECRAWL_API_KEY=fc-...
```

## Run

For Neverhack specifically:

```bash
npm run crawl:neverhack
```

For any site:

```bash
npm run crawl:site -- --url https://example.com --label example
```

## Output

Every run is saved under:

```text
tmp/firecrawl/<label>/<timestamp>/
```

Each crawl folder contains:

- `summary.md`: quick run summary
- `map.json`: Firecrawl map response
- `crawl-result.json`: full crawl payload
- `pages/<slug>/metadata.json`: per-page metadata
- `pages/<slug>/page.md`: LLM-friendly markdown
- `pages/<slug>/page.html`: rendered HTML snapshot
- `pages/<slug>/links.json`: extracted links when Firecrawl returns them

## Notes

- The script maps first, then starts a recursive crawl.
- `crawlEntireDomain` is enabled so it follows the whole Neverhack domain.
- `allowSubdomains` defaults to `true`, which helps if the site uses `www` or localized subdomains.
- Firecrawl charges per crawled page, so adjust `--limit` if you want to cap usage during exploration.
