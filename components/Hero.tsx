'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a master timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%', // Match DarkCore's window.innerHeight
          pin: true,     // Pin the entire hero section
          scrub: 1,      // Smooth scrubbing
        }
      });

      // 1. Text fades out and moves slightly horizontally
      tl.to([text1Ref.current, text2Ref.current, text3Ref.current], {
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
      const chars1 = text1Ref.current?.querySelectorAll('.char') || [];
      const chars2 = text2Ref.current?.querySelectorAll('.char') || [];
      const chars3 = text3Ref.current?.querySelectorAll('.char') || [];

      if (chars1.length > 0) {
        gsap.fromTo([...chars1, ...chars2, ...chars3], {
          y: 50,
          opacity: 0,
          rotationX: -45,
        }, {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.05,
          ease: 'expo.out',
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text into chars for animation
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section ref={containerRef} className="relative h-screen bg-transparent text-white overflow-hidden flex flex-col items-center justify-center font-sans border-b border-white/[0.08]" style={{ perspective: '1000px' }}>

      {/* Foreground UI and Typography */}
      <div
        ref={textContainerRef}
        className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-32 lg:px-40 pointer-events-none mt-10 md:mt-20"
      >
        {/* Left Typography */}
        <div className="flex flex-col items-start w-full lg:w-[50%] leading-[1.0] font-light tracking-tight font-sans">
          <h1
            ref={text1Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-[#dfdfdf]"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('Your cyber')}
          </h1>
          <h1
            ref={text2Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-[#dfdfdf] flex"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('performance')}
          </h1>
          <h1
            ref={text3Ref}
            className="text-[12vw] lg:text-[7.5vw] whitespace-nowrap text-[#dfdfdf] flex"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {splitText('partner')}
          </h1>
        </div>

        {/* Right Paragraph */}
        <div className="mt-12 lg:mt-0 flex flex-col items-start lg:items-end w-full lg:w-[45%] text-left lg:text-left lg:translate-y-6">
          <p ref={paragraphRef} className="text-[#a0a0a0] text-[13px] md:text-[15px] leading-[1.8] font-light max-w-lg lg:max-w-md">
            Let's make cybersecurity a strength for your business. We're here to help with everything from risk management and compliance to training and continuous monitoring, ensuring your growth is always protected.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Scroll indicator & Border Line */}
      <div className="absolute bottom-0 left-0 w-full z-10 bg-black">
        <div className="h-20 lg:h-24 mx-6 md:mx-32 lg:mx-40 border-t border-[#222] flex items-center justify-between">
          <span className="text-[#666] text-[9px] tracking-[0.3em] font-medium uppercase font-sans">
            SCROLL TO DISCOVER
          </span>
          <span className="text-[#666] text-sm font-extralight animate-bounce">↓</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;