'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, FileText, Lock, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cardsData = [
  { id: 1, tag: '/ UC_001', title: 'Cyber risk assessment', desc: 'Identify critical vulnerabilities across your entire digital infrastructure.', Icon: Shield },
  { id: 2, tag: '/ UC_002', title: 'Test & compare', desc: 'Simulate real-world attacks to validate your security posture against global benchmarks.', Icon: FileText },
  { id: 3, tag: '/ UC_003', title: 'Cyber regulation', desc: 'Ensure absolute compliance with international data privacy frameworks.', Icon: Lock },
  { id: 4, tag: '/ UC_004', title: 'Security concerns', desc: 'Continuous monitoring to preemptively neutralize emerging threat vectors.', Icon: Eye },
];

const StackedCards: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    // Reset layout for robust calculation
    gsap.set(cards, { y: () => window.innerHeight }); // Function-based for dynamic resize
    gsap.set(cards[0], { y: 0 }); // First card is active immediately in the pinned view

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // Pin for 4 screen heights
        scrub: 1,
        pin: true,     // Extremely important: This section must PIN itself so the cards can slide up inside it
        anticipatePin: 1,
      },
    });

    // Loop para criar o empilhamento sucessivo
    cards.forEach((card, index) => {
      if (index === 0) return;

      // 1. O cartão atual sobe para o centro
      tl.to(card, { y: 0, duration: 1, ease: 'none' }, index);
      
      // 2. Os cartões anteriores sobem um pouco (efeito pasta) e diminuem
      for (let i = 0; i < index; i++) {
        tl.to(
          cards[i],
          {
            y: -40 * (index - i),
            scale: 1 - 0.05 * (index - i),
            duration: 1,
            ease: 'none',
          },
          index // O index garante que roda junto com o cartão subindo
        );

        // 3. Apaga o texto do cartão de trás
        tl.to(
          cards[i]!.querySelector('.card-content'),
          {
            opacity: 0,
            duration: 0.5,
          },
          index
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#000000] z-10 font-sans overflow-hidden">
      <div className="absolute top-0 left-0 h-screen w-full flex items-center justify-center">
        
        {/* Horizontal Navigation Bar */}
        <div className="absolute top-12 left-0 w-full flex justify-center z-50 pointer-events-none">
          <ul className="flex gap-12 text-[10px] md:text-xs text-white/30 uppercase tracking-[0.2em] font-mono">
            {cardsData.map((card) => (
              <li key={`nav-${card.id}`}>{card.title}</li>
            ))}
          </ul>
        </div>

        {cardsData.map((card, index) => {
          const Icon = card.Icon;
          return (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="ios-glass absolute w-[80vw] max-w-4xl h-[60vh] rounded-[2rem] flex flex-col justify-between p-12 origin-top"
              style={{
                zIndex: index, 
              }}
            >
              
              <div className="card-content h-full flex flex-col justify-between relative z-20">
                {/* Top Left Tag */}
                <span className="text-[10px] text-[#666] font-mono tracking-widest uppercase">
                  {card.tag}
                </span>

                {/* Bottom Left Content */}
                <div className="flex flex-col gap-4 max-w-xl">
                  <h3 className="text-5xl md:text-7xl font-light text-white/90 tracking-tighter leading-none">
                    {card.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-md">
                    {card.desc}
                  </p>
                </div>

                {/* Massive Background Icon (Right absolute) */}
                <div className="absolute right-[-5%] md:right-10 top-1/2 -translate-y-1/2 opacity-[0.02] text-white/5 pointer-events-none transition-transform">
                  <Icon size={350} strokeWidth={1} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StackedCards;
