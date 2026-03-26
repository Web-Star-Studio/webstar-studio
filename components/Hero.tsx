'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Create a master timeline linked to scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // Fade out bottom bar upon scroll
    if (bottomBarRef.current) {
      tl.to(bottomBarRef.current, {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power1.inOut',
      }, 0);
    }

    // 1. Text fades out and moves slightly horizontally
    const textRefs = [text1Ref.current, text2Ref.current, text3Ref.current];
    tl.to(textRefs.filter(Boolean), {
      x: '-10vw',
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, 0);

    if (paragraphRef.current) {
      tl.to(paragraphRef.current, {
        x: '10vw',
        opacity: 0,
        duration: 1,
        ease: 'power1.inOut',
      }, 0);
    }

    // Initial Reveal Animation
    const allChars = [
      ...(text1Ref.current?.querySelectorAll('.char') || []),
      ...(text2Ref.current?.querySelectorAll('.char') || []),
      ...(text3Ref.current?.querySelectorAll('.char') || []),
    ];

    if (allChars.length > 0) {
      gsap.fromTo(allChars, {
        y: 50,
        opacity: 0,
        rotationX: -45,
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1.5,
        stagger: 0.03,
        ease: 'expo.out',
      });
    }

  }, { scope: containerRef });

  // Helper to split text into chars for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-transparent text-white overflow-hidden flex flex-col items-center justify-center font-sans" style={{ perspective: '1000px' }}>

      {/* Dark Cube Background Placeholder */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-60">
        <div className="w-[800px] h-[800px] bg-gradient-to-t from-black via-white/5 to-transparent border border-[#222] rounded-2xl transform rotate-12 scale-125 blur-[2px]"></div>
      </div>

      {/* Foreground UI and Typography */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full h-full max-w-[1680px] mx-auto px-4 sm:px-8 xl:px-9 flex flex-col justify-center translate-y-24 opacity-0"
      >
        {/* Giant Left Text */}
        <div className="flex flex-col items-start w-[720px] absolute left-0 bottom-[45%] translate-y-1/2 pl-9 font-sans">
          <h1 ref={text1Ref} className="text-white text-[90px] leading-[1.0] font-light tracking-[-0.02em] text-left" style={{ transformStyle: 'preserve-3d' }}>
            {splitText('Your cyber')}
          </h1>
          <h1 ref={text2Ref} className="text-white text-[90px] leading-[1.0] font-light tracking-[-0.02em] text-left" style={{ transformStyle: 'preserve-3d' }}>
            {splitText('performance')}
          </h1>
          <h1 ref={text3Ref} className="text-white text-[90px] leading-[1.0] font-light tracking-[-0.02em] text-left" style={{ transformStyle: 'preserve-3d' }}>
            {splitText('partner')}
          </h1>
        </div>

        {/* Right Paragraph */}
        <div className="hidden lg:flex flex-col items-start w-full max-w-[620px] absolute right-0 pr-9 xl:right-[240px] xl:pr-0 bottom-[25%] lg:bottom-[32%] xl:bottom-[28%] text-left pl-6">
          <p ref={paragraphRef} className="text-white/85 text-[18px] leading-[1.8] font-light font-sans tracking-wide">
            Let's make cybersecurity a strength for your business. We're here to help
            with everything from risk management and compliance to training and
            continuous monitoring, ensuring your growth is always protected.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Scroll indicator & Border Line */}
      <div ref={bottomBarRef} className="absolute bottom-0 left-0 w-full z-10 bg-transparent flex justify-center">
        <div className="w-full max-w-[1680px] flex items-center justify-between border-t border-white/15 px-9 py-[40px] xl:py-[67px]">
          
          {/* Scroll text on the left */}
          <div className="flex items-center">
            <span className="hidden lg:block text-white/50 text-[12px] font-sans tracking-[0.02em] uppercase leading-[1.2]">
              SCROLL TO DISCOVER
            </span>
          </div>

          {/* Arrow on the right */}
          <div className="relative w-[22px] h-[22px] flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity animate-bounce">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 3V21M12 21L5 14M12 21L19 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
