'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

const DESKTOP_HEADER_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'OFFERS', href: '/services', suffix: '15' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CAREERS', href: '/contact' },
  { label: 'JOBS', href: '/contact' },
  { label: 'NEWS', href: '/portfolio' },
];

function NeverhackMark() {
  return (
    <div className="flex items-center gap-3">
      <svg width="28" height="28" viewBox="0 0 1024 1024" aria-hidden="true" className="h-7 w-7 fill-white">
        <path d="M877.338 147H647.627C640.296 147 635.408 151.862 635.408 156.725V407.139C635.408 412.002 630.521 414.433 628.077 409.571L354.379 149.431C354.379 147 351.936 147 349.492 147H144.219C136.887 147 132 151.862 132 156.725V356.084C132 358.515 132 360.946 134.444 360.946L667.177 873.931C667.177 876.363 669.621 876.363 672.064 876.363H879.781C887.113 876.363 892 871.5 892 864.207V156.725C889.556 151.862 884.669 147 877.338 147Z" />
        <path d="M373.929 633.479H144.219C136.887 633.479 132 638.342 132 643.204V864.444C132 871.738 136.887 876.6 144.219 876.6H373.929C381.26 876.6 386.148 871.738 386.148 866.875V645.635C386.148 638.342 378.817 633.479 373.929 633.479Z" />
      </svg>
      <span className="text-[0.95rem] uppercase tracking-[0.1em] text-white">NEVERHACK</span>
    </div>
  );
}

function UseCasesDots() {
  return (
    <span className="grid grid-cols-3 gap-[3px]">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} className="h-[2px] w-[2px] rounded-full bg-white/45" />
      ))}
    </span>
  );
}

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const currentLanguage = (i18n.language || 'en').slice(0, 2).toUpperCase();

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 text-white"
      initial={{ y: -96 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border-b border-white/10 bg-[linear-gradient(90deg,#120b19_0%,#1d1027_50%,#120b19_100%)]">
        <div className="mx-auto flex h-[38px] max-w-[1680px] items-center justify-center gap-3 border-x border-white/10 px-4 text-[10px] tracking-[0.02em] text-white/76 md:px-8">
          <span className="hidden text-white/72 md:inline">✧</span>
          <span className="truncate text-center">{t('header.banner.message')}</span>
          <span className="hidden whitespace-nowrap text-white/88 md:inline">{t('header.banner.cta')} → →</span>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#0d0d0e]/96">
        <div className="mx-auto grid h-[62px] max-w-[1680px] grid-cols-[72px_minmax(0,1fr)_72px] border-x border-white/10 lg:hidden">
          <div className="flex items-center justify-center border-r border-white/10">
            <button
              type="button"
              onClick={onMenuClick}
              aria-label={isMenuOpen ? t('navigation.close') : t('header.menuToggle')}
              className="inline-flex items-center justify-center text-white/76 transition-colors hover:text-white"
            >
              <Menu size={17} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center justify-center border-r border-white/10 px-5">
            <NeverhackMark />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => i18n.changeLanguage(currentLanguage === 'EN' ? 'pt' : 'en')}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/68 transition-colors hover:text-white"
            >
              {currentLanguage}
            </button>
          </div>
        </div>

        <div className="mx-auto hidden h-20 max-w-[1680px] grid-cols-[210px_166px_minmax(0,1fr)_90px_130px] border-x border-white/10 lg:grid">
          <div className="flex items-center border-r border-white/10 px-9">
            <Link href="/" className="flex h-full items-center">
              <NeverhackMark />
            </Link>
          </div>

          <Link
            href="/#home-use-cases"
            className="flex items-center justify-center gap-4 border-r border-white/10 text-[0.78rem] uppercase tracking-[0.08em] text-white/82 transition-colors hover:bg-white/[0.03] hover:text-white"
          >
            <span>USE CASES</span>
            <UseCasesDots />
          </Link>

          <nav className="flex items-center gap-11 px-12">
            {DESKTOP_HEADER_ITEMS.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

              return (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  className={`text-[0.72rem] uppercase tracking-[0.08em] transition-colors ${
                    isActive ? 'text-white' : 'text-white/42 hover:text-white/78'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.suffix ? <sup className="ml-1 text-[0.55rem] text-white/35">{item.suffix}</sup> : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center justify-center border-l border-white/10">
            <button
              type="button"
              onClick={() => i18n.changeLanguage(currentLanguage === 'EN' ? 'pt' : 'en')}
              className="text-[0.82rem] uppercase tracking-[0.08em] text-white/78 transition-colors hover:text-white"
            >
              {currentLanguage}
            </button>
          </div>

          <Link
            href="/contact"
            className="flex items-center justify-center border-l border-white/10 text-[0.78rem] uppercase tracking-[0.08em] text-white/78 transition-colors hover:bg-white/[0.03] hover:text-white"
          >
            CONTACT
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
