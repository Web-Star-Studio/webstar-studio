'use client';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';
import { PAGE_HERO_IMAGES } from '@/data/publicMedia';
import { PublicCTA, PublicPageHero, PublicSection, SectionIntro } from '@/components/public/PublicPrimitives';

type PortfolioCase = {
  slug: string;
  title: string;
  summary: string;
  sector: string;
  country: string;
  website: string;
};

const CASE_IMAGES: Record<string, string> = {
  'identity-operating-model': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2200&auto=format&fit=crop',
  'resilience-command-layer': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2200&auto=format&fit=crop',
  'third-party-risk-map': 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2200&auto=format&fit=crop',
  'board-risk-dashboard': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2200&auto=format&fit=crop'
};

export default function PortfolioPage() {
  const { t } = useTranslation();
  const cases = t('portfolio.cases', { returnObjects: true }) as PortfolioCase[];
  const [sectorFilter, setSectorFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  const sectors = useMemo(() => Array.from(new Set(cases.map((item) => item.sector))), [cases]);
  const countries = useMemo(() => Array.from(new Set(cases.map((item) => item.country))), [cases]);

  const filteredCases = useMemo(
    () =>
      cases.filter((item) => {
        const sectorMatch = sectorFilter === 'all' || item.sector === sectorFilter;
        const countryMatch = countryFilter === 'all' || item.country === countryFilter;
        return sectorMatch && countryMatch;
      }),
    [cases, countryFilter, sectorFilter]
  );

  return (
    <SiteShell>
      <div className="relative z-10 w-full overflow-x-hidden bg-[#0f0f10] text-white">
        <PublicPageHero
          id="portfolio-hero"
          eyebrow={t('portfolio.hero.eyebrow')}
          title={t('portfolio.hero.title')}
          description={t('portfolio.hero.description')}
          image={PAGE_HERO_IMAGES.portfolio}
        />

        <PublicSection className="bg-[#0f0f10] py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <SectionIntro eyebrow={t('portfolio.grid.eyebrow')} title={t('portfolio.grid.title')} description={t('portfolio.grid.description')} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="public-panel p-4 md:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">Sector</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSectorFilter('all')}
                    className={`text-[11px] uppercase tracking-[0.2em] ${sectorFilter === 'all' ? 'text-white' : 'text-white/44'}`}
                  >
                    {t('portfolio.filters.all')}
                  </button>
                  {sectors.map((sector) => (
                    <button
                      key={sector}
                      type="button"
                      onClick={() => setSectorFilter(sector)}
                      className={`text-[11px] uppercase tracking-[0.2em] ${sectorFilter === sector ? 'text-white' : 'text-white/44'}`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </div>

              <div className="public-panel p-4 md:p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">Country</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCountryFilter('all')}
                    className={`text-[11px] uppercase tracking-[0.2em] ${countryFilter === 'all' ? 'text-white' : 'text-white/44'}`}
                  >
                    {t('portfolio.filters.all')}
                  </button>
                  {countries.map((country) => (
                    <button
                      key={country}
                      type="button"
                      onClick={() => setCountryFilter(country)}
                      className={`text-[11px] uppercase tracking-[0.2em] ${countryFilter === country ? 'text-white' : 'text-white/44'}`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PublicSection>

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <div className="space-y-12">
            {filteredCases.map((item, index) => (
              <article key={item.slug} className="grid gap-8 border-b border-white/10 pb-12 last:border-b-0 last:pb-0 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} public-panel overflow-hidden p-0`}>
                  <img src={CASE_IMAGES[item.slug]} alt={item.title} className="h-[300px] w-full object-cover md:h-[520px]" />
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">
                    {String(index + 1).padStart(2, '0')} / {item.sector} / {item.country}
                  </p>
                  <h2 className="mt-5 font-sans text-[2rem] leading-[0.98] tracking-[-0.05em] text-white md:text-[3.1rem]">
                    {item.title}
                  </h2>
                  <p className="mt-6 max-w-[620px] text-base leading-relaxed text-white/68 md:text-lg">{item.summary}</p>
                  <PublicCTA href={item.website} label={t('portfolio.grid.visit')} className="mt-8" />
                </div>
              </article>
            ))}
          </div>
        </PublicSection>

        <Footer />
      </div>
    </SiteShell>
  );
}
