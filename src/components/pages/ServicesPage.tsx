'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';
import { NarrativeStep } from '../../../types';
import { PAGE_HERO_IMAGES } from '@/data/publicMedia';
import { PublicCTA, PublicPageHero, PublicSection, SectionIntro } from '@/components/public/PublicPrimitives';

type ServiceTrack = {
  title: string;
  summary: string;
  modules: string[];
};

type PillarItem = {
  title: string;
  description: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

const SERVICE_IMAGES = [
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2200&auto=format&fit=crop'
];

export default function ServicesPage() {
  const { t } = useTranslation();
  const tracks = t('services.tracks', { returnObjects: true }) as ServiceTrack[];
  const pillars = t('services.pillars.items', { returnObjects: true }) as PillarItem[];
  const faqs = t('services.faq.items', { returnObjects: true }) as FAQItem[];
  const [activeIndex, setActiveIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let nextIndex = activeIndex;
        let bestRatio = 0;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index ?? '-1');
          if (index < 0) continue;
          if (entry.intersectionRatio >= bestRatio) {
            bestRatio = entry.intersectionRatio;
            nextIndex = index;
          }
        }

        setActiveIndex(nextIndex);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-15% 0px -35% 0px' }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [activeIndex]);

  const activeTrack = useMemo(() => tracks[activeIndex] ?? tracks[0], [activeIndex, tracks]);

  return (
    <SiteShell>
      <div className="relative z-10 w-full overflow-x-hidden bg-[#0f0f10] text-white">
        <PublicPageHero
          id="services-hero"
          eyebrow={t('services.hero.eyebrow')}
          title={t('services.hero.title')}
          description={t('services.hero.description')}
          image={PAGE_HERO_IMAGES.services}
        />

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
            <SectionIntro
              eyebrow={t('services.proof.eyebrow')}
              title={t('services.proof.title')}
              description={t('services.proof.description')}
            />

            <div className="public-panel overflow-x-auto p-0">
              <div className="flex min-w-max">
                {tracks.map((track, index) => (
                  <button
                    key={`${track.title}-${index}`}
                    type="button"
                    onClick={() => refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className={`min-h-[86px] min-w-[240px] border-r border-white/10 px-5 text-left transition-colors first:border-l ${
                      index === activeIndex ? 'bg-white/[0.04]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="mt-2 block text-sm uppercase tracking-[0.18em] text-white/74">{track.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PublicSection>

        <PublicSection id="delivery-model" className="bg-[#101011] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div className="lg:sticky lg:top-[162px]">
              <div className="public-panel overflow-hidden p-0">
                <img src={SERVICE_IMAGES[activeIndex % SERVICE_IMAGES.length]} alt={activeTrack?.title} className="h-[320px] w-full object-cover md:h-[560px]" />
              </div>

              <div className="public-panel mt-4 p-6 md:p-8">
                <p className="public-eyebrow">{t('services.railEyebrow')}</p>
                <h2 className="mt-4 font-sans text-[1.9rem] leading-[1] tracking-[-0.05em] text-white md:text-[2.8rem]">
                  {activeTrack?.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">{activeTrack?.summary}</p>
              </div>
            </div>

            <div className="space-y-12">
              {tracks.map((track, index) => (
                <article
                  key={`${track.title}-${index}`}
                  ref={(node) => {
                    refs.current[index] = node;
                  }}
                  data-index={index}
                  className="public-panel p-6 md:p-8"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-4 font-sans text-[1.9rem] leading-[1] tracking-[-0.05em] text-white md:text-[2.8rem]">
                    {track.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">{track.summary}</p>
                  <div className="mt-8 grid gap-px bg-white/10 md:grid-cols-2">
                    {track.modules.map((module, moduleIndex) => (
                      <div key={`${module}-${moduleIndex}`} className="bg-[#111113] px-5 py-5 text-sm uppercase tracking-[0.16em] text-white/78">
                        {module}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </PublicSection>

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <SectionIntro eyebrow={t('services.pillars.eyebrow')} title={t('services.pillars.title')} />
          <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <article key={`${pillar.title}-${index}`} className="public-grid-card bg-[#101011]">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/38">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-sans text-[1.7rem] leading-[1.02] tracking-[-0.05em] text-white md:text-[2.3rem]">
                  {pillar.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">{pillar.description}</p>
              </article>
            ))}
          </div>
        </PublicSection>

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <SectionIntro eyebrow={t('services.faq.eyebrow')} title={t('services.faq.title')} />
          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <article key={`${faq.question}-${index}`} className="public-panel overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between px-5 py-5 text-left md:px-6"
                  >
                    <span className="text-base uppercase tracking-[0.16em] text-white/88 md:text-lg">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      strokeWidth={1.25}
                      className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen ? <p className="border-t border-white/10 px-5 py-5 text-base leading-relaxed text-white/68 md:px-6 md:text-lg">{faq.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </PublicSection>

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <div className="public-panel p-6 text-center md:p-10">
            <p className="public-eyebrow">{t('services.cta.eyebrow')}</p>
            <h2 className="public-section-title mx-auto mt-4 max-w-[900px]">{t('services.cta.title')}</h2>
            <PublicCTA href="/contact" label={t('services.cta.button')} className="mt-8" />
          </div>
        </PublicSection>

        <Footer />
      </div>
    </SiteShell>
  );
}
