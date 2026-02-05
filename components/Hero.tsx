import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Helper to split text into words for cinematic reveal
  const splitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span key={index} className="inline-block mr-4 md:mr-8 overflow-hidden">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      </span>
    ));
  };

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">
      {/* Note: Background is now handled by ParticleGrid in App.tsx */}

      {/* Fog/Mist Layers - Retained for Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [-100, 100], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -bottom-1/2 -left-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(201,255,0,0.05)_0%,transparent_60%)] blur-[100px]"
        />
      </div>

      {/* Main Content - Cinematic Layout */}
      <motion.div
        style={{ y: y1 }}
        className="relative z-10 text-center text-soft-white mix-blend-difference"
      >
        <h1
          ref={titleRef}
          className="text-[15vw] md:text-[12vw] font-bold leading-none select-none font-display uppercase tracking-tighter drop-shadow-2xl"
        >
          {splitText(t('hero.title'))}
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 text-xl md:text-3xl tracking-[0.1em] font-editorial text-neon-lime/90 mix-blend-screen"
        >
          {t('hero.subtitle')}
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} strokeWidth={1} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;