'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ChatMessage } from '../../../types';

gsap.registerPlugin(ScrollTrigger);

export default function HomeChatContact() {
  const { t } = useTranslation();
  const messages = t('home.chat.messages', { returnObjects: true }) as ChatMessage[];
  const sectionRef = useRef<HTMLElement | null>(null);
  const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const typingRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const nodes = messageRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!sectionRef.current || !nodes.length) return;

      gsap.set(nodes, { opacity: 0, y: 22 });
      typingRef.current && gsap.set(typingRef.current, { opacity: 0, y: 18 });
      buttonRef.current && gsap.set(buttonRef.current, { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 1,
        },
      });

      nodes.forEach((node, index) => {
        tl.to(node, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, index * 0.25);
      });
      typingRef.current && tl.to(typingRef.current, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, nodes.length * 0.25);
      buttonRef.current && tl.to(buttonRef.current, { opacity: 1, y: 0, duration: 0.18, ease: 'power2.out' }, nodes.length * 0.25 + 0.2);
    },
    { scope: sectionRef, dependencies: [messages.length] }
  );

  return (
    <section ref={sectionRef} id="home-contact" className="border-b border-white/10 bg-[#0b0b0c] py-20 md:py-24">
      <div className="public-container px-6 md:px-6">
        <h2 className="block text-center text-[2rem] font-light leading-[1.1] text-white md:mx-auto md:w-max md:text-[4rem]">
          {t('home.chat.title')}
        </h2>

        <div className="mt-[3.75rem] flex flex-col items-center md:mt-[6.875rem] lg:flex-row lg:items-start">
          <div className="relative h-[400px] w-full overflow-hidden lg:flex-1 lg:h-[700px]">
            <div className="absolute inset-0 lg:left-[-10%] 2xl:left-[-20%]">
              <div className="absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_48%_44%,rgba(161,120,255,0.95),rgba(104,55,255,0.88)_26%,rgba(38,22,92,0.78)_48%,rgba(11,11,12,0)_72%)]" />
              <div
                className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 [background-image:radial-gradient(rgba(255,255,255,0.86)_1px,transparent_1px)] [background-size:12px_12px]"
                style={{ animation: 'home-globe-spin 18s linear infinite' }}
              />
              <div
                className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_70%_34%,rgba(255,255,255,0.72),transparent_1.4%),radial-gradient(circle_at_74%_38%,rgba(255,255,255,0.92),transparent_1.2%),radial-gradient(circle_at_78%_42%,rgba(255,255,255,0.76),transparent_1.4%),radial-gradient(circle_at_83%_47%,rgba(255,255,255,0.68),transparent_1.2%),radial-gradient(circle_at_64%_27%,rgba(255,255,255,0.72),transparent_1.2%),radial-gradient(circle_at_22%_38%,rgba(255,255,255,0.72),transparent_1.4%),radial-gradient(circle_at_28%_31%,rgba(255,255,255,0.72),transparent_1.2%)]"
                style={{ animation: 'home-globe-pulse 5s ease-in-out infinite' }}
              />
            </div>
          </div>

          <div className="relative mt-12 block w-[342px] lg:mt-0 lg:w-[530px] lg:flex-[0_0_530px]">
            <div className="relative overflow-y-hidden lg:pl-[63px]">
              <img
                src="/neverhack-reference/images/icon-chat.png"
                alt=""
                className="absolute left-1/2 top-[-24px] h-[50px] w-[50px] -translate-x-1/2 -translate-y-full overflow-hidden rounded-[8px] lg:left-0 lg:top-0 lg:h-10 lg:w-10 lg:translate-x-0 lg:translate-y-0"
              />

              {messages.map((message, index) => (
                <div
                  key={`${message.text}-${index}`}
                  ref={(node) => {
                    messageRefs.current[index] = node;
                  }}
                  className={`relative mb-3 rounded-[8px] bg-white/[0.1] px-4 py-3 text-[0.8125rem] leading-[1.4] text-white/92 transition-all duration-500 lg:text-[0.9375rem] ${
                    index === 0 ? 'mt-10 rounded-tl-none lg:mt-0' : ''
                  }`}
                >
                  <p>{message.text}</p>
                  {message.links?.length ? (
                    <div className="mt-2.5 flex gap-[6px]">
                      {message.links.map((link) => (
                        <a
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          className="rounded bg-white/[0.1] px-2 py-1 text-[0.875rem] leading-[1.2] underline transition-colors hover:bg-white/[0.15]"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              <div
                ref={typingRef}
                className="rounded-[8px] bg-white/[0.05] px-4 py-3 text-[0.8125rem] leading-[1.4] text-white/92 transition-all duration-500 lg:ml-[63px] lg:text-[0.9375rem]"
              >
                <span className="inline-flex items-center gap-[1px]">
                  is typing
                  <span className="inline-flex">
                    <span style={{ animation: 'home-typing 1.1s ease-in-out infinite' }}>.</span>
                    <span style={{ animation: 'home-typing 1.1s ease-in-out infinite 0.15s' }}>.</span>
                    <span style={{ animation: 'home-typing 1.1s ease-in-out infinite 0.3s' }}>.</span>
                  </span>
                </span>
              </div>

              <div
                ref={buttonRef}
                className="mt-4 transition-all duration-500 lg:ml-[63px]"
              >
                <a
                  href={t('home.chat.buttonHref')}
                  className="inline-flex h-fit rounded-[8px] bg-white px-5 py-2.5 text-sm text-black transition-colors hover:bg-white/90"
                >
                  {t('home.chat.buttonLabel')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
