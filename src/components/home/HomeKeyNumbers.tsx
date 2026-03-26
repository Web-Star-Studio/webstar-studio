'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { HOME_METRIC_MEDIA } from '@/data/publicMedia';
import { MetricCard } from '../../../types';

gsap.registerPlugin(ScrollTrigger);

function parseMetricValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match || value.includes('/')) {
    return null;
  }

  return { number: Number(match[1]), suffix: match[2] };
}

export default function HomeKeyNumbers() {
  const { t } = useTranslation();
  const items = t('home.metrics.items', { returnObjects: true }) as MetricCard[];
  const sectionRef = useRef<HTMLElement | null>(null);
  const valueRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useGSAP(
    () => {
      const values = valueRefs.current.filter(Boolean) as HTMLDivElement[];
      const labels = labelRefs.current.filter(Boolean) as HTMLParagraphElement[];
      if (!sectionRef.current || !values.length) return;

      gsap.set(values, { opacity: 0 });
      gsap.set(labels, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      values.forEach((node, index) => {
        const parsed = parseMetricValue(items[index]?.value ?? '');
        if (parsed) {
          const counter = { value: 0 };
          tl.to(
            counter,
            {
              value: parsed.number,
              duration: 1.2,
              ease: 'power3.out',
              onUpdate: () => {
                node.textContent = `${Math.round(counter.value)}${parsed.suffix}`;
              },
            },
            index * 0.08
          );
        } else {
          tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'linear' }, index * 0.08);
        }

        tl.to(node, { opacity: 1, duration: 0.8, ease: 'linear' }, index * 0.08);
        labels[index] && tl.to(labels[index], { opacity: 1, duration: 0.8, ease: 'linear' }, index * 0.08 + 0.15);
      });
    },
    { scope: sectionRef, dependencies: [items] }
  );

  return (
    <section ref={sectionRef} id="home-metrics" className="overflow-hidden border-b border-white/10 bg-[#0b0b0c]">
      <div className="public-container">
        <div className="relative my-20 overflow-hidden md:my-[350px] md:mb-[300px]">
          <div className="relative w-full md:ml-auto md:w-[55%] md:aspect-[924/594]">
            <video
              className="w-[120%] -translate-x-[10%] object-cover [filter:brightness(0.5)_contrast(1.02)] md:w-full md:translate-x-[50px]"
              autoPlay
              muted
              loop
              playsInline
              poster={HOME_METRIC_MEDIA.poster}
            >
              <source src={HOME_METRIC_MEDIA.src} type="video/webm" />
            </video>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.02),rgba(11,11,12,0.62)_94%)]" />
          </div>

          <div className="relative mt-[-3.4375rem] px-6 md:mt-[-9.6875rem] md:w-1/2 md:px-0">
            <h2 className="text-[2rem] leading-[1.1] text-white md:text-[4rem]">{t('home.metrics.title')}</h2>
            <p className="mt-[0.9375rem] text-sm leading-[1.6] text-white/75 md:mt-10 md:text-[1.125rem]">
              {t('home.metrics.description')}
            </p>

            <div className="relative mt-10 md:mt-[60px]">
              <ul className="relative left-1/2 grid w-[124%] -translate-x-1/2 grid-cols-3 grid-rows-2 border border-white/15 md:left-0 md:mx-auto md:mt-[3.75rem] md:w-[840px] md:translate-x-0">
                {items.slice(0, 3).map((item, index) => (
                  <li key={`${item.label}-${index}`} className="flex min-h-[124px] flex-col items-center justify-center border-b border-white/15 text-center md:min-h-[204px]">
                    <div
                      ref={(node) => {
                        valueRefs.current[index] = node;
                      }}
                      className="text-[2rem] leading-none text-white/25 md:text-[4rem] md:text-white/50"
                    >
                      {item.value}
                    </div>
                    <p
                      ref={(node) => {
                        labelRefs.current[index] = node;
                      }}
                      className="mt-2.5 text-xs leading-[1.6] text-white/35 md:mt-[0.9375rem] md:text-base md:text-white/60"
                    >
                      {item.label}
                    </p>
                  </li>
                ))}

                <li className="flex min-h-[124px] flex-col items-center justify-center border-r border-white/15 text-center md:min-h-[204px]">
                  <div
                    ref={(node) => {
                      valueRefs.current[3] = node;
                    }}
                    className="text-[2rem] leading-none text-white/18 md:text-[4rem] md:text-white/30"
                  >
                    {items[3]?.value}
                  </div>
                  <p
                    ref={(node) => {
                      labelRefs.current[3] = node;
                    }}
                    className="mt-2.5 text-xs leading-[1.6] text-white/28 md:mt-[0.9375rem] md:text-base md:text-white/50"
                  >
                    {items[3]?.label}
                  </p>
                </li>

                <li className="relative flex min-h-[124px] items-center justify-center border-r border-white/15 text-center md:min-h-[204px]">
                  <a
                    href={t('home.metrics.buttonHref')}
                    className="inline-flex min-h-[52px] items-center justify-center rounded-[8px] bg-white px-6 text-sm text-black transition-colors hover:bg-white/90 md:-translate-y-1/2"
                  >
                    {t('home.metrics.buttonLabel')}
                  </a>
                </li>

                <li className="flex min-h-[124px] flex-col items-center justify-center text-center md:min-h-[204px]">
                  <div
                    ref={(node) => {
                      valueRefs.current[4] = node;
                    }}
                    className="text-[2rem] leading-none text-white/18 md:text-[4rem] md:text-white/30"
                  >
                    {items[4]?.value}
                  </div>
                  <p
                    ref={(node) => {
                      labelRefs.current[4] = node;
                    }}
                    className="mt-2.5 text-xs leading-[1.6] text-white/28 md:mt-[0.9375rem] md:text-base md:text-white/50"
                  >
                    {items[4]?.label}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
