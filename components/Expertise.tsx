import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const Expertise: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const listItems = wordsRef.current?.children;

    if (listItems && listItems.length > 0) {
      const ctx = gsap.context(() => {
        // Pin the container and scrub through the items
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'center center',
            end: '+=400%', // 4x height scroll duration
            pin: true,
            scrub: true,
            snap: [0, 0.25, 0.5, 0.75, 1], // The "Smooth Snap" Content Stacking
          }
        });

        // Loop through each item to highlight one by one
        Array.from(listItems).forEach((item, index) => {
          // Fade in/Highlight
          tl.to(item, {
            color: '#FFFFFF', // Change to solid white
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'none',
          }, index); // Absolute timing based on index

          // Fade out (unless it's the last one)
          if (index < listItems.length - 1) {
            tl.to(item, {
              color: 'rgba(255, 255, 255, 0)', // Outline stroke color
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.2)',
              opacity: 0.3,
              scale: 0.95,
              duration: 1,
              ease: 'none',
            }, index + 1);
          }
        });

      }, containerRef);
      return () => ctx.revert();
    }
  }, [t]);

  // Use raw translation keys since the dynamic ones would need to be rewired.
  const words = [
    "EXPERIENCE",
    "CURIOSITY",
    "INQUISITIVE",
    "INNOVATION",
    "CRAFT"
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#000000] text-soft-white relative z-10 flex min-h-screen items-center justify-center font-sans">
      <div className="px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col items-center">

        <p className="text-sm tracking-[0.3em] font-mono text-white/50 mb-12 uppercase">
          [ OUR DNA ]
        </p>

        <ul ref={wordsRef} className="flex flex-col items-center justify-center space-y-4">
          {words.map((word, index) => (
            <li
              key={index}
              className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
                opacity: 0.3,
                scale: 0.95
              }}
            >
              {word}
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
};

export default Expertise;