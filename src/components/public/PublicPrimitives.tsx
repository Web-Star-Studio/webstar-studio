'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ReactNode } from 'react';

import { MetricCard, SectionEyebrowBlock } from '../../../types';

export function splitHeadline(text: string, lineCount = 3) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const chunkSize = Math.max(1, Math.ceil(words.length / lineCount));
  const lines: string[] = [];

  for (let index = 0; index < words.length; index += chunkSize) {
    lines.push(words.slice(index, index + chunkSize).join(' '));
  }

  return lines;
}

export function PublicSection({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-b border-white/10 ${className}`}>
      <div className="public-container">{children}</div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, description }: SectionEyebrowBlock) {
  return (
    <div className="max-w-[840px]">
      <p className="public-eyebrow">{eyebrow}</p>
      <h2 className="public-section-title mt-4">{title}</h2>
      {description ? <p className="public-copy mt-6 max-w-3xl text-white/70">{description}</p> : null}
    </div>
  );
}

export function PublicCTA({
  href,
  label,
  className = '',
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`public-cta ${className}`}>
      <span>{label}</span>
      <ArrowUpRight size={15} strokeWidth={1.25} />
    </Link>
  );
}

export function MetricGrid({ items, columns = 3 }: { items: MetricCard[]; columns?: 2 | 3 | 4 }) {
  const className =
    columns === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';

  return (
    <div className={`grid gap-px bg-white/10 ${className}`}>
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className="public-grid-card bg-[#101011]">
          <p className="font-sans text-[2rem] leading-none tracking-[-0.06em] text-white md:text-[3.2rem]">{item.value}</p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.24em] text-white/46">{item.label}</p>
          {item.note ? <p className="mt-3 text-sm leading-relaxed text-white/58">{item.note}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function PublicPageHero({
  id,
  eyebrow,
  title,
  description,
  image,
  railItems,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  railItems?: MetricCard[];
}) {
  const lines = splitHeadline(title, 3);

  return (
    <section id={id} className="border-b border-white/10 pt-[122px] md:pt-[130px]">
      <div className="public-container">
        <div className="grid min-h-[calc(100svh-122px)] grid-rows-[auto_1fr_auto] md:min-h-[calc(100svh-130px)]">
          <div className="grid gap-10 pt-14 md:grid-cols-[0.92fr_1.08fr] md:gap-16 md:pt-16">
            <div>
              <p className="public-eyebrow">{eyebrow}</p>
              <div className="mt-5">
                {lines.map((line, index) => (
                  <h1
                    key={`${line}-${index}`}
                    className={`public-display ${
                      index === 1 ? 'text-white/26 font-light' : index === lines.length - 1 ? 'font-medium text-white' : 'text-white'
                    }`}
                  >
                    {line}
                  </h1>
                ))}
              </div>
              <p className="public-copy mt-8 max-w-[620px]">{description}</p>
            </div>

            <div className="public-panel relative overflow-hidden p-0">
              <img src={image} alt="" className="h-[340px] w-full object-cover md:h-[560px]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(15,15,16,0.12),rgba(15,15,16,0.64))]" />
            </div>
          </div>

          {railItems?.length ? (
            <div className="grid gap-px bg-white/10 md:grid-cols-4">
              {railItems.map((item, index) => (
                <div key={`${item.label}-${index}`} className="bg-[#101011] px-5 py-5 md:px-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">{item.label}</p>
                  <p className="mt-2 text-[1.45rem] uppercase tracking-[-0.04em] text-white md:text-[2rem]">{item.value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
