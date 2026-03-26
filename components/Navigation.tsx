'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, X } from 'lucide-react';

import { HOME_STORY_ANCHORS, PRIMARY_NAV_ITEMS } from '@/data/navigation';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="ml-auto flex h-full w-[min(92vw,460px)] flex-col border-l border-white/10 bg-[#0f0f10]"
          >
            <div className="flex h-[78px] items-center justify-between border-b border-white/10 px-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/45">
                {t('navigation.label')}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center text-white/72 transition-colors hover:text-white"
                aria-label={t('navigation.close')}
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="border-b border-white/10 px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">{t('navigation.contactLabel')}</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/68">
                  {t('navigation.contactBlock.line1')}
                  <br />
                  {t('navigation.contactBlock.line2')}
                  <br />
                  {t('navigation.contactBlock.line3')}
                </p>
              </div>

              <nav className="border-b border-white/10">
                {PRIMARY_NAV_ITEMS.map((item) => {
                  const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className={`public-mobile-row ${isActive ? 'text-white' : 'text-white/74'}`}
                    >
                      <span className="font-sans text-[13px] uppercase tracking-[0.24em]">{t(item.labelKey)}</span>
                      <ArrowUpRight size={15} strokeWidth={1.25} />
                    </Link>
                  );
                })}
              </nav>

              <div className="border-b border-white/10 px-5 py-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">{t('nav.story.label')}</p>
                <div className="mt-4 grid gap-2">
                  {HOME_STORY_ANCHORS.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onClose}
                      className="text-sm uppercase tracking-[0.2em] text-white/68 transition-colors hover:text-white"
                    >
                      {t(item.labelKey)}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-white/10">
                {['en', 'pt', 'es'].map((language) => (
                  <button
                    key={language}
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage(language);
                      onClose();
                    }}
                    className={`public-mobile-utility ${
                      currentLanguage.startsWith(language) ? 'text-white' : 'text-white/45'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Navigation;
