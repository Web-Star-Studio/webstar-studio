'use client';

import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { HOME_HERO_MEDIA } from '@/data/publicMedia';
import { splitHeadline } from '@/components/public/PublicPrimitives';

export default function HomeHero() {
  const { t } = useTranslation();
  const heroTitle = t('home.hero.title');
  const description = t('home.hero.description');
  const lines = splitHeadline(heroTitle, 3);

  return (
    <section id="home-hero" className="relative overflow-hidden border-b border-white/10 pt-[100px] lg:pt-[118px]">
      <div className="public-container">
        <div className="relative min-h-[calc(100svh-100px)] border-x border-white/10 bg-[#0b0b0c] lg:min-h-[calc(100svh-118px)]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.015)_0px,rgba(255,255,255,0.015)_1px,transparent_1px,transparent_3px)] opacity-40" />

          <div className="pointer-events-none absolute inset-x-0 top-0 bottom-[84px] z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,14,14,0.96)_0%,rgba(14,14,14,0.7)_8%,rgba(14,14,14,0.14)_18%,rgba(14,14,14,0.04)_55%,rgba(14,14,14,0.9)_100%)] lg:bg-[linear-gradient(180deg,rgba(14,14,14,1)_0%,rgba(14,14,14,0.12)_14%,rgba(14,14,14,0.03)_48%,rgba(14,14,14,0.92)_100%)]" />
            <video
              className="absolute inset-0 z-0 h-full w-full object-cover md:left-1/2 md:w-[116%] md:max-w-none md:-translate-x-1/2 lg:left-1/2 lg:w-[80%] lg:-translate-x-1/2 xl:w-[90%] 2xl:w-full [filter:brightness(0.46)_contrast(1.08)_saturate(0.8)]"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HOME_HERO_MEDIA.poster}
            >
              <source src={HOME_HERO_MEDIA.src} type="video/webm" />
            </video>
            <div className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(11,11,12,0.9)_0%,rgba(11,11,12,0.58)_18%,rgba(11,11,12,0.12)_36%,rgba(11,11,12,0.05)_52%,rgba(11,11,12,0.22)_66%,rgba(11,11,12,0.56)_82%,rgba(11,11,12,0.72)_100%),radial-gradient(circle_at_56%_14%,rgba(86,52,194,0.12),transparent_18%)]" />
          </div>

          <div className="relative z-20 px-6 pt-20 md:px-10 md:pt-24 lg:px-12 lg:pt-[92px] xl:px-16">
            <div className="relative mb-[43px] lg:mb-9 lg:flex lg:justify-between">
              <div className="max-w-[500px] md:max-w-[550px] lg:max-w-[500px] xl:max-w-[750px]">
                {lines.map((line) => (
                  <h1
                    key={line}
                    className="font-sans text-[clamp(4rem,7.6vw,5.625rem)] font-light leading-[1] tracking-[-0.05em] text-white"
                  >
                    {line}
                  </h1>
                ))}
              </div>

              <p className="mt-6 max-w-[400px] text-[1.25rem] leading-[1.8] text-white/85 md:max-w-[500px] md:text-[1.125rem] lg:mt-[55px] lg:max-w-[500px] lg:text-[0.9375rem] xl:max-w-[620px] xl:text-[1.125rem]">
                {description}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-6 md:px-10 lg:px-12 xl:px-16">
            <div className="border-t border-[#323232] py-[30px] md:py-10 lg:py-5 xl:py-[30px] 2xl:py-[44px]">
              <a
                href="#home-use-cases"
                className="group pointer-events-auto relative flex items-center justify-between text-white"
                aria-label={t('home.hero.scrollLabel')}
              >
                <span className="hidden text-xs uppercase lg:block">{t('home.hero.scrollLabel')}</span>
                <span className="relative h-[22px] w-[22px] overflow-hidden">
                  <span className="relative flex w-full -translate-y-8 flex-col items-center justify-center gap-[10px] transition-transform duration-500 group-hover:translate-y-0">
                    <ArrowDown size={22} strokeWidth={1.2} className="rotate-[135deg]" />
                    <ArrowDown size={22} strokeWidth={1.2} className="rotate-[135deg]" />
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
