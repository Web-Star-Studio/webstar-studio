'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HOME_USE_CASE_MEDIA } from '@/data/publicMedia';
import { HeroMediaConfig } from '../../../types';
import { PublicCTA, PublicSection, SectionIntro } from '@/components/public/PublicPrimitives';

gsap.registerPlugin(ScrollTrigger);

type UseCaseItem = {
  category: string;
  label: string;
  title: string;
  summary: string;
  ctaLabel: string;
  ctaHref: string;
};

const REFERENCES = ['UC_000', 'UC_001', 'UC_003', 'UC_010', 'UC_011'];

function MediaFrame({
  media,
  onRef,
}: {
  media: HeroMediaConfig;
  onRef: (node: HTMLVideoElement | null) => void;
}) {
  if (media.type === 'video') {
    return (
      <video ref={onRef} className="h-full w-full object-contain" muted loop playsInline poster={media.poster} preload="metadata">
        <source src={media.src} type="video/webm" />
      </video>
    );
  }

  return <img src={media.src} alt="" className="h-full w-full object-contain" />;
}

export default function HomeUseCases() {
  const { t } = useTranslation();
  const items = t('home.useCases.items', { returnObjects: true }) as UseCaseItem[];
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsViewportRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const contentRef = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgRef = useRef<(HTMLDivElement | null)[]>([]);
  const navRef = useRef<(HTMLButtonElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const stackedItems = useMemo(() => {
    return items.map((item, index) => ({
      ...item,
      media: HOME_USE_CASE_MEDIA[index % HOME_USE_CASE_MEDIA.length],
      reference: REFERENCES[index] ?? `UC_${String(index).padStart(3, '0')}`,
    }));
  }, [items]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      const contents = contentRef.current.filter(Boolean) as HTMLDivElement[];
      const mediaWrappers = mediaRef.current.filter(Boolean) as HTMLDivElement[];
      const backgrounds = bgRef.current.filter(Boolean) as HTMLDivElement[];
      const navItems = navRef.current.filter(Boolean) as HTMLButtonElement[];
      const videos = videoRefs.current.filter(Boolean) as HTMLVideoElement[];

      if (!cards.length || !cardsViewportRef.current) return;

      gsap.set(cards, { y: () => window.innerHeight, z: 50, rotateX: -30, rotateY: 10, transformOrigin: '50% 100%' });
      gsap.set(cards[0], { y: 0, z: 0, rotateX: 0, rotateY: 0 });
      gsap.set(contents[0], { opacity: 1, y: 0 });
      gsap.set(mediaWrappers[0], { y: 0 });
      gsap.set(backgrounds[0], { opacity: 1 });

      contents.slice(1).forEach((node) => gsap.set(node, { opacity: 0.6, y: 350 }));
      mediaWrappers.slice(1).forEach((node) => gsap.set(node, { y: 850 }));
      backgrounds.slice(1).forEach((node) => gsap.set(node, { opacity: 1 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsViewportRef.current,
          start: 'top top+=80',
          end: `+=${window.innerHeight * stackedItems.length * 1.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(stackedItems.length - 1, Math.round(self.progress * (stackedItems.length - 1)));
            setActiveIndex(nextIndex);
          },
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        const label = `card-${index}`;
        tl.addLabel(label);
        tl.to(card, { y: 0, z: 0, rotateX: 0, rotateY: 0, duration: 1, ease: 'none' }, label);
        tl.to(contents[index], { y: 0, opacity: 1, duration: 1, ease: 'none' }, label);
        tl.to(mediaWrappers[index], { y: 0, duration: 1, ease: 'none' }, label);

        for (let previousIndex = 0; previousIndex < index; previousIndex += 1) {
          tl.to(
            cards[previousIndex],
            { z: -200 * (index - previousIndex), duration: 0.65, ease: 'none' },
            `${label}+=0.35`
          );
          tl.to(contents[previousIndex], { opacity: 0.5, duration: 0.65, ease: 'none' }, `${label}+=0.35`);
          tl.to(backgrounds[previousIndex], { opacity: 0.8, duration: 0.65, ease: 'none' }, `${label}+=0.35`);
        }
      });

      timelineRef.current = tl;

      navItems.forEach((node, index) => {
        const activate = () => {
          const trigger = tl.scrollTrigger;
          if (!trigger) return;
          const perCard = (trigger.end - trigger.start) / Math.max(stackedItems.length - 1, 1);
          window.scrollTo({ top: trigger.start + perCard * index, behavior: 'smooth' });
        };
        node.onclick = activate;
      });

      return () => {
        navItems.forEach((node) => {
          if (node) node.onclick = null;
        });
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [stackedItems.length] }
  );

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    navRef.current.forEach((node, index) => {
      if (!node) return;
      node.dataset.active = index === activeIndex ? 'true' : 'false';
    });
  }, [activeIndex]);

  return (
    <PublicSection id="home-use-cases" className="bg-[#0b0b0c] py-20 md:py-24">
      <div className="mx-auto max-w-[980px] text-center">
        <SectionIntro
          eyebrow={t('home.useCases.eyebrow')}
          title={t('home.useCases.title')}
          description={t('home.useCases.description')}
        />
      </div>

      <div className="mt-[35px] border-y border-white/10 md:mt-[60px]">
        <div className="flex h-[70px] min-w-max overflow-x-auto px-6 md:h-20 md:px-11">
          {stackedItems.map((item, index) => (
            <button
              key={item.reference}
              ref={(node) => {
                navRef.current[index] = node;
              }}
              type="button"
              className="flex h-full min-w-[160px] flex-col items-center justify-center gap-[10px] border-r border-white/10 px-[15px] text-center transition-colors first:border-l data-[active=true]:bg-white/[0.03] md:min-w-[232px] md:px-5"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 data-[active=true]:text-white/50 md:text-xs">
                / {item.reference}
              </span>
              <span className="truncate text-sm leading-none text-white/50 data-[active=true]:text-white md:text-[0.875rem]">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div ref={sectionRef} className="relative mt-[35px] md:mt-[60px]">
        <div ref={cardsViewportRef} className="relative min-h-[calc(100vh-80px)] pb-4">
          <div className="relative mx-auto flex h-[calc(100vh-80px)] w-[calc(100%-50px)] items-center">
            <div className="relative mx-auto aspect-[342/510] max-h-[700px] w-full perspective-[100vw] perspective-origin-[50%_-30%] md:max-w-[min(1680px,calc(100%-88px))] md:aspect-[1250/620] xl:max-h-[95%] 2xl:max-w-[min(1680px,calc(100%-176px))] 2xl:max-h-[750px]">
              {stackedItems.map((item, index) => (
                <article
                  key={item.reference}
                  ref={(node) => {
                    cardsRef.current[index] = node;
                  }}
                  className="absolute inset-0 overflow-hidden rounded-[14px] bg-black shadow-[0_-22px_20px_-14px_rgba(0,0,0,0.25)]"
                  style={{ zIndex: 100 - index }}
                >
                  <div
                    ref={(node) => {
                      bgRef.current[index] = node;
                    }}
                    className="absolute inset-0 rounded-[14px] border border-white/10 bg-[radial-gradient(94.68%_316.73%_at_0%_0%,#151515,#070707),linear-gradient(0deg,rgba(255,255,255,0.012),rgba(255,255,255,0.012))]"
                  />
                  <div className="absolute inset-0 bg-[url('/neverhack-reference/images/dots-card.png')] bg-cover bg-center opacity-[0.08]" />

                  <div className="relative h-full px-8 py-6 md:px-16 md:py-16">
                    <div
                      ref={(node) => {
                        contentRef.current[index] = node;
                      }}
                      className="relative z-20 max-w-[520px]"
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 md:text-xs">{item.reference}</p>
                      <h3 className="mt-[6px] text-[1.75rem] font-normal leading-none text-white md:mt-4 md:text-[3rem] md:leading-[1.1]">
                        {item.title}
                      </h3>
                      <p className="mt-[10px] text-xs leading-[1.45] text-white/72 md:mt-4 md:max-w-[40%] md:text-[1.25rem] md:leading-[1.4]">
                        {item.summary}
                      </p>
                    </div>

                    <div className="absolute inset-0 overflow-hidden md:rounded-[14px]">
                      <div className="absolute inset-0 bottom-[110px] flex items-end md:bottom-0">
                        <div className="relative h-full w-full">
                          <div
                            ref={(node) => {
                              mediaRef.current[index] = node;
                            }}
                            className="absolute inset-0 flex items-end md:block"
                          >
                            <div className="relative w-full md:ml-auto md:h-full md:w-[74%] md:translate-x-[7vw] md:-translate-y-[1vw]">
                              <MediaFrame
                                media={item.media}
                                onRef={(node) => {
                                  videoRefs.current[index] = node;
                                }}
                              />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,12,0.82)_0%,rgba(11,11,12,0.34)_22%,rgba(11,11,12,0.06)_48%,rgba(11,11,12,0.12)_68%,rgba(11,11,12,0.42)_100%),linear-gradient(180deg,rgba(11,11,12,0)_0%,rgba(11,11,12,0.18)_72%,rgba(11,11,12,0.48)_100%)]" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-[3.75rem] left-[4.0625rem] hidden md:block">
                      <PublicCTA href={item.ctaHref} label={item.ctaLabel} className="w-fit" />
                    </div>

                    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center border-t border-white/20 bg-[#0e0e0e33] py-9 md:hidden">
                      <PublicCTA href={item.ctaHref} label={item.ctaLabel} className="w-fit" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicSection>
  );
}
