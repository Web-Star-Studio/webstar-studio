'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NarrativeStep } from '../../../types';

gsap.registerPlugin(ScrollTrigger);

export default function HomeValues() {
  const { t } = useTranslation();
  const items = t('home.values.items', { returnObjects: true }) as NarrativeStep[];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);
  const titleItemsRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const descItemsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const detailItemsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const progressFillRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const itemNodes = itemsRef.current.filter(Boolean) as HTMLElement[];
      const titleNodes = titleItemsRef.current.filter(Boolean) as HTMLHeadingElement[];
      const descNodes = descItemsRef.current.filter(Boolean) as HTMLParagraphElement[];
      const detailNodes = detailItemsRef.current.filter(Boolean) as HTMLParagraphElement[];

      if (!sectionRef.current || !titleRef.current || !itemNodes.length) return;

      gsap.set(itemNodes, { opacity: 0 });
      gsap.set(itemNodes[0], { opacity: 1 });
      gsap.set(titleNodes, { yPercent: 100, opacity: 0 });
      gsap.set(descNodes, { yPercent: 100, opacity: 0 });
      gsap.set(detailNodes, { yPercent: 100, opacity: 0 });
      gsap.set([titleNodes[0], descNodes[0], detailNodes[0]], { yPercent: 0, opacity: 1 });
      gsap.set(progressFillRef.current.filter(Boolean), { xPercent: -100 });

      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 50%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current?.querySelectorAll('[data-value-title-line]') ?? [],
            { yPercent: 105, rotate: 10 },
            { yPercent: 0, rotate: 0, stagger: 0.13, duration: 1, ease: 'power3.out' }
          );
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * items.length}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const nextIndex = Math.min(items.length - 1, Math.round(self.progress * (items.length - 1)));
            setActiveIndex(nextIndex);
          },
        },
      });

      items.forEach((_, index) => {
        const label = `value-${index}`;
        if (index === 0) {
          progressFillRef.current[0] && tl.to(progressFillRef.current[0], { xPercent: 0, duration: 1, ease: 'none' }, 0);
          return;
        }

        tl.addLabel(label);
        tl.to(itemNodes[index - 1], { opacity: 0, duration: 0.12, ease: 'none' }, label);
        tl.set(itemNodes[index], { opacity: 1 }, label);
        tl.fromTo(titleNodes[index], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, `${label}+=0.08`);
        tl.fromTo(descNodes[index], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }, `${label}+=0.16`);
        tl.fromTo(detailNodes[index], { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }, `${label}+=0.2`);
        progressFillRef.current[index] && tl.to(progressFillRef.current[index], { xPercent: 0, duration: 1, ease: 'none' }, label);
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (sectionRef.current?.contains(trigger.trigger as Node) || titleRef.current?.contains(trigger.trigger as Node)) {
            trigger.kill();
          }
        });
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [items.length] }
  );

  useEffect(() => {
    itemsRef.current.forEach((node, index) => {
      if (!node) return;
      node.style.pointerEvents = index === activeIndex ? 'auto' : 'none';
    });
  }, [activeIndex]);

  return (
    <section id="home-values" className="relative border-b border-white/10 bg-[#0b0b0c]">
      <div className="public-container">
        <div ref={titleRef} className="relative flex h-[50vh] min-h-[500px] items-center justify-center md:min-h-[640px] lg:h-[90vh]">
          <div className="text-center">
            <p className="public-eyebrow">{t('home.values.eyebrow')}</p>
            <h2 className="mt-5 font-sans text-[2rem] font-light leading-[1.1] tracking-[-0.06em] text-white md:text-[4rem]">
              {t('home.values.title').split(' ').map((word, index) => (
                <span key={`${word}-${index}`} data-value-title-line className="mr-[0.35ch] inline-block overflow-hidden">
                  <span className="inline-block">{word}</span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div ref={sectionRef} className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden border-b border-white/10">
            <div className="absolute bottom-[-8%] left-[-12%] h-[58%] w-[45%] rounded-full bg-[radial-gradient(circle_at_center,rgba(119,53,255,0.92),rgba(119,53,255,0.14)_44%,transparent_72%)] blur-[32px]" />
            <div className="absolute bottom-[-10%] left-[28%] h-[52%] w-[28%] rounded-full bg-[radial-gradient(circle_at_center,rgba(119,53,255,0.8),rgba(119,53,255,0.16)_42%,transparent_72%)] blur-[34px]" />
            <div className="absolute bottom-[-9%] right-[-10%] h-[58%] w-[42%] rounded-full bg-[radial-gradient(circle_at_center,rgba(119,53,255,0.92),rgba(119,53,255,0.14)_44%,transparent_72%)] blur-[32px]" />
            <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.01)_0px,rgba(255,255,255,0.01)_1px,transparent_1px,transparent_3px)] opacity-30" />
            <div className="pointer-events-none absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-white/15 lg:block" />
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/15 lg:block" />
          </div>

          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              ref={(node) => {
                itemsRef.current[index] = node;
              }}
              className="absolute inset-0 flex flex-col justify-center px-6 text-white md:px-10 lg:px-0"
            >
              <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
                <div className="lg:flex lg:h-1/2 lg:w-1/2 lg:items-end lg:justify-end lg:pr-8 lg:pb-8">
                  <h3
                    ref={(node) => {
                      titleItemsRef.current[index] = node;
                    }}
                    className="text-[1.75rem] font-medium leading-[1.1] md:text-[2.4rem] lg:text-[3rem]"
                  >
                    {item.title}
                  </h3>
                </div>

                <div className="relative mt-6 lg:mt-0">
                  <div className="h-px bg-white/15 lg:hidden" />
                  <div className="pt-6 lg:h-1/2 lg:w-1/2 lg:self-end lg:pt-8 lg:pr-8 lg:pl-8">
                    <div className="relative lg:max-w-[576px]">
                      <p
                        ref={(node) => {
                          descItemsRef.current[index] = node;
                        }}
                        className="text-base leading-[1.6] text-white md:text-[1.125rem]"
                      >
                        {item.description}
                      </p>
                      <p
                        ref={(node) => {
                          detailItemsRef.current[index] = node;
                        }}
                        className="mt-2.5 text-sm leading-[1.6] text-white/78 md:text-base"
                      >
                        {item.detail ?? ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="absolute bottom-0 left-0 w-full px-6 py-[33px] md:px-10 lg:px-0 lg:py-[34px]">
            <div className="mx-auto flex max-w-[380px] items-center justify-between text-center">
              {items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="contents">
                  <span className={`inline-block w-[18px] text-sm font-medium leading-none ${index <= activeIndex ? 'text-white' : 'text-white/50'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {index < items.length - 1 ? (
                    <span className="relative flex flex-1 flex-col gap-1 px-3 text-[0]">
                      <span className="h-[2px] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_2px,transparent_2px)] bg-[length:6px_2px]" />
                      <span className="h-[2px] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_2px,transparent_2px)] bg-[length:6px_2px]" />
                      <span className="absolute inset-y-0 left-0 w-full overflow-hidden px-3">
                        <span
                          ref={(node) => {
                            progressFillRef.current[index + 1] = node;
                          }}
                          className="block h-[2px] bg-[linear-gradient(to_right,rgb(255,255,255)_2px,transparent_2px)] bg-[length:6px_2px]"
                        />
                        <span className="mt-1 block h-[2px] bg-[linear-gradient(to_right,rgb(255,255,255)_2px,transparent_2px)] bg-[length:6px_2px]" />
                      </span>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
