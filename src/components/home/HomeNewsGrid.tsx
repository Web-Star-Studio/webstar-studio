'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NewsCard } from '../../../types';

gsap.registerPlugin(ScrollTrigger);

export default function HomeNewsGrid() {
  const { t } = useTranslation();
  const items = t('home.news.items', { returnObjects: true }) as NewsCard[];
  const visibleItems = items.slice(0, 5);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cellRefs = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const nodes = cellRefs.current.filter(Boolean) as HTMLElement[];
      if (!sectionRef.current || !nodes.length) return;

      gsap.set(nodes, { opacity: 0, y: 28 });
      gsap.to(nodes, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
    },
    { scope: sectionRef, dependencies: [visibleItems.length] }
  );

  const desktopCells: Array<NewsCard | null | 'all'> = [
    visibleItems[0] ?? null,
    visibleItems[1] ?? null,
    null,
    visibleItems[2] ?? null,
    visibleItems[3] ?? null,
    null,
    visibleItems[4] ?? null,
    'all',
  ];

  return (
    <section ref={sectionRef} id="home-news" className="overflow-hidden border-b border-white/10 bg-[#0b0b0c] py-20 md:py-24">
      <div className="public-container">
        <div className="relative mb-[120px] xl:mb-[150px]">
          <h2 className="mb-9 text-[2.25rem] font-light leading-[1.2] text-white md:mb-16 md:text-[4rem]">
            {t('home.news.title')}
          </h2>

          <div className="relative">
            <div className="hidden w-full overflow-hidden rounded-[8px] border border-white/15 lg:grid lg:grid-cols-4">
              {desktopCells.map((cell, index) => {
                if (cell === 'all') {
                  return (
                    <a
                      key="all"
                      ref={(node) => {
                        cellRefs.current[index] = node;
                      }}
                      href={t('home.news.viewAllHref')}
                      className="relative flex min-h-[360px] flex-col items-center justify-center gap-6 border-l border-t border-white/15 px-8 text-center"
                    >
                      <p className="max-w-[220px] text-[1.5rem] font-medium leading-[1.2] text-white/75">All the latest news</p>
                      <span className="inline-flex min-h-[46px] items-center justify-center rounded-[8px] bg-white px-6 text-[0.92rem] text-black">
                        {t('home.news.viewAllLabel')}
                      </span>
                    </a>
                  );
                }

                if (cell === null) {
                  return (
                    <div
                      key={`empty-${index}`}
                      ref={(node) => {
                        cellRefs.current[index] = node;
                      }}
                      className="min-h-[360px] border-l border-t border-white/15 bg-[url('/neverhack-reference/images/dots-card.png')] bg-cover bg-center opacity-45"
                    />
                  );
                }

                return (
                  <a
                    key={`${cell.title}-${index}`}
                    ref={(node) => {
                      cellRefs.current[index] = node;
                    }}
                    href={cell.href}
                    className="relative flex min-h-[360px] flex-col overflow-hidden border-l border-t border-white/15 p-10"
                  >
                    <p className="text-xs leading-[1.4] text-white/45">{cell.category}</p>
                    <h3 className="mt-7 max-w-[280px] text-[1.7rem] leading-[1.12] tracking-[-0.04em] text-white">{cell.title}</h3>
                    <p className="mt-auto pt-10 text-sm text-white/35">{cell.date}</p>
                    <span className="mt-6 inline-flex min-h-[44px] w-fit items-center justify-center rounded-[8px] border border-white/10 px-5 text-[0.95rem] text-white/78 transition-colors hover:bg-white/[0.04]">
                      Read more
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="space-y-4 lg:hidden">
              {visibleItems.map((item, index) => (
                <a
                  key={item.title}
                  ref={(node) => {
                    cellRefs.current[index] = node;
                  }}
                  href={item.href}
                  className="block rounded-[8px] border border-white/15 p-6"
                >
                  <p className="text-xs leading-[1.4] text-white/45">{item.category}</p>
                  <h3 className="mt-4 text-[1.6rem] leading-[1.12] tracking-[-0.04em] text-white">{item.title}</h3>
                  <p className="mt-6 text-sm text-white/35">{item.date}</p>
                </a>
              ))}
              <a
                href={t('home.news.viewAllHref')}
                ref={(node) => {
                  cellRefs.current[visibleItems.length] = node;
                }}
                className="flex min-h-[220px] flex-col items-center justify-center gap-5 rounded-[8px] border border-white/15 px-6 text-center"
              >
                <p className="max-w-[220px] text-[1.5rem] font-medium leading-[1.2] text-white/75">All the latest news</p>
                <span className="inline-flex min-h-[46px] items-center justify-center rounded-[8px] bg-white px-6 text-[0.92rem] text-black">
                  {t('home.news.viewAllLabel')}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
