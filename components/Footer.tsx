'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const statement = t('footer.statement.lines', { returnObjects: true }) as string[];
  const utilityLinks = t('footer.utilityLinks', { returnObjects: true }) as Array<{ label: string; href: string }>;

  return (
    <footer className="border-t border-white/10 bg-[#0b0b0c] text-white">
      <div className="public-container">
        <div className="border-x border-white/10">
          <div className="flex min-h-[460px] flex-col items-center justify-center border-b border-white/10 px-6 py-16 text-center">
            <div
              className="mb-10 h-20 w-20 rounded-[24px] bg-[linear-gradient(180deg,#c39bff,#7b44ff_52%,#efe7ff)] shadow-[0_20px_60px_rgba(123,68,255,0.26)]"
              style={{ animation: 'home-chip-float 6s ease-in-out infinite' }}
            />
            <div className="space-y-1">
              {statement.map((line) => (
                <p key={line} className="font-sans text-[clamp(3rem,5.8vw,5.4rem)] font-light leading-[0.96] tracking-[-0.07em] text-white">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-[120px_120px_minmax(0,1fr)_repeat(3,160px)] border-b border-white/10">
              <a
                href="https://www.linkedin.com/company/neverhack/"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[88px] items-center justify-center border-r border-white/10 text-white/72 transition-colors hover:text-white"
              >
                <Linkedin size={18} strokeWidth={1.6} />
              </a>
              <a
                href="https://www.youtube.com/channel/UCTWlceXeb6kQA4GOjMLCe_w"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-[88px] items-center justify-center border-r border-white/10 text-white/72 transition-colors hover:text-white"
              >
                <Youtube size={18} strokeWidth={1.6} />
              </a>
              <div className="border-r border-white/10 bg-[url('/neverhack-reference/images/dots-card.png')] bg-cover bg-center opacity-35" />
              <Link href="/about" className="flex min-h-[88px] items-center justify-center border-r border-white/10 text-white/72 transition-colors hover:text-white">
                Compliance
              </Link>
              <Link href="/portfolio" className="flex min-h-[88px] items-center justify-center border-r border-white/10 text-white/72 transition-colors hover:text-white">
                Press
              </Link>
              <Link href="/services" className="flex min-h-[88px] items-center justify-center text-white/72 transition-colors hover:text-white">
                R&amp;D
              </Link>
            </div>

            <div className="grid grid-cols-5 border-b border-white/10">
              {utilityLinks.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex min-h-[88px] items-center justify-center text-white/56 transition-colors hover:text-white ${
                    index < utilityLinks.length - 1 ? 'border-r border-white/10' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 border-b border-white/10 md:hidden">
            {utilityLinks.map((item) => (
              <Link key={item.label} href={item.href} className="public-mobile-row">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 px-2 py-5 text-center text-[11px] tracking-[0.08em] text-white/34 md:px-6">
          <p>NEVERHACK © 2026 All rights reserved</p>
          <p>Tailor-made by Makepill &amp; 60fps</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
