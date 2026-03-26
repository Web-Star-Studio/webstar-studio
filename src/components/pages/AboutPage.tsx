'use client';

import { useTranslation } from 'react-i18next';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../../components/Footer';
import { MetricCard, NarrativeStep } from '../../../types';
import { PAGE_HERO_IMAGES } from '@/data/publicMedia';
import { MetricGrid, PublicPageHero, PublicSection, SectionIntro } from '@/components/public/PublicPrimitives';

type PresenceItem = { city: string; detail: string };
type StoryBlock = {
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  name: string;
  bio: string;
};

export default function AboutPage() {
  const { t } = useTranslation();
  const values = t('about.values.items', { returnObjects: true }) as NarrativeStep[];
  const presence = t('about.presence.items', { returnObjects: true }) as PresenceItem[];
  const metrics = t('about.metrics.items', { returnObjects: true }) as MetricCard[];
  const story = t('about.story', { returnObjects: true }) as StoryBlock;

  return (
    <SiteShell>
      <div className="relative z-10 w-full overflow-x-hidden bg-[#0f0f10] text-white">
        <PublicPageHero
          id="about-hero"
          eyebrow={t('about.hero.eyebrow')}
          title={t('about.hero.title')}
          description={t('about.hero.description')}
          image={PAGE_HERO_IMAGES.about}
          railItems={metrics}
        />

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <SectionIntro
              eyebrow={t('about.positioning.eyebrow')}
              title={t('about.positioning.title')}
              description={t('about.positioning.description')}
            />

            <div className="public-panel p-6 md:p-8">
              <p className="public-eyebrow">{t('about.positioning.pitchLabel')}</p>
              <p className="mt-5 text-base leading-relaxed text-white/72 md:text-lg">{t('about.positioning.pitch')}</p>
            </div>
          </div>
        </PublicSection>

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <SectionIntro
            eyebrow={t('about.values.eyebrow')}
            title={t('about.values.title')}
            description={t('about.values.description')}
          />

          <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2">
            {values.map((value, index) => (
              <article key={`${value.title}-${index}`} className="public-grid-card bg-[#101011] md:min-h-[300px]">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-sans text-[1.8rem] leading-[1] tracking-[-0.05em] text-white md:text-[2.6rem]">
                  {value.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">{value.description}</p>
              </article>
            ))}
          </div>
        </PublicSection>

        <PublicSection className="bg-[#0f0f10] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="public-panel overflow-hidden p-0">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2200&auto=format&fit=crop"
                alt={story.name}
                className="h-[360px] w-full object-cover md:h-[620px]"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="public-eyebrow">{story.eyebrow}</p>
              <h2 className="public-section-title mt-4">{story.title}</h2>
              <p className="mt-6 text-base leading-relaxed text-white/72 md:text-lg">{story.description}</p>
              <div className="public-panel mt-8 p-6 md:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">{story.role}</p>
                <p className="mt-3 font-sans text-[1.8rem] uppercase tracking-[-0.05em] text-white md:text-[2.7rem]">{story.name}</p>
                <p className="mt-5 text-base leading-relaxed text-white/68 md:text-lg">{story.bio}</p>
              </div>
            </div>
          </div>
        </PublicSection>

        <PublicSection className="bg-[#101011] py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
            <SectionIntro
              eyebrow={t('about.presence.eyebrow')}
              title={t('about.presence.title')}
              description={t('about.presence.description')}
            />

            <div className="space-y-4">
              {presence.map((item, index) => (
                <article key={`${item.city}-${index}`} className="public-panel p-6 md:p-8">
                  <p className="font-sans text-[1.6rem] uppercase tracking-[-0.04em] text-white md:text-[2.4rem]">{item.city}</p>
                  <p className="mt-4 text-base leading-relaxed text-white/66 md:text-lg">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </PublicSection>

        <PublicSection id="metrics" className="bg-[#0f0f10] py-16 md:py-24">
          <SectionIntro eyebrow={t('about.metrics.eyebrow')} title={t('about.positioning.title')} />
          <div className="mt-10">
            <MetricGrid items={metrics} columns={4} />
          </div>
        </PublicSection>

        <Footer />
      </div>
    </SiteShell>
  );
}
