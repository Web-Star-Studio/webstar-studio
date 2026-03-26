'use client';

import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import Header from '../../../components/Header';
import Navigation from '../../../components/Navigation';
import CustomCursor from '../../../components/CustomCursor';

const BackgroundCanvas = dynamic(() => import('@/components/BackgroundCanvas'), {
  ssr: false,
});

interface SiteShellProps {
  children: ReactNode;
  withBackground?: boolean;
  withCursor?: boolean;
}

export default function SiteShell({ children, withBackground = false, withCursor = false }: SiteShellProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="public-shell selection:bg-white selection:text-black">
      <div className="relative z-[9999]">
        <Header isMenuOpen={isMenuOpen} onMenuClick={() => setIsMenuOpen((prev) => !prev)} />
        <Navigation isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </div>

      {withBackground ? (
        <div className="pointer-events-none fixed left-0 top-0 z-0 h-screen w-full opacity-30">
          <BackgroundCanvas />
        </div>
      ) : null}

      {withCursor ? <CustomCursor /> : null}

      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </main>
  );
}
