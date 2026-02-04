import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [currentBg, setCurrentBg] = useState(0);

  // Simulate morphing background with simple crossfade of abstract textures
  const backgrounds = [
    'https://picsum.photos/id/16/1920/1080',
    'https://picsum.photos/id/29/1920/1080',
    'https://picsum.photos/id/33/1920/1080'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Layer */}
      {backgrounds.map((bg, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
          style={{ backgroundImage: `url(${bg})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentBg ? 0.4 : 0 }}
          transition={{ duration: 2 }}
        />
      ))}
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Main Content */}
      <motion.div 
        style={{ y: y1 }} 
        className="relative z-10 text-center text-white mix-blend-difference"
      >
        <motion.h1 
          initial={{ opacity: 0, letterSpacing: '0.1em' }}
          animate={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[12vw] md:text-[15vw] font-bold leading-none select-none"
        >
          C H D
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-sm md:text-base tracking-[0.5em] uppercase font-light"
        >
          Art Maker Studio
        </motion.p>
      </motion.div>

      {/* Floating Card - Bottom Right */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-8 md:right-16 md:bottom-16 w-64 bg-white text-black p-6 hidden md:block shadow-2xl"
      >
        <p className="text-xs tracking-widest text-gray-500 mb-2">FEATURED</p>
        <h3 className="text-xl tracking-widest font-semibold mb-2">LUMINOUS</h3>
        <div className="w-full h-1 bg-black mb-2" />
        <p className="text-xs leading-relaxed">
          Explore the latest installation at the intersection of light and matter.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
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