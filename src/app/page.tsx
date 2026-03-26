'use client';

import SiteShell from '@/components/layout/SiteShell';
import Footer from '../../components/Footer';
import HomeChatContact from '@/components/home/HomeChatContact';
import HomeHero from '@/components/home/HomeHero';
import HomeKeyNumbers from '@/components/home/HomeKeyNumbers';
import HomeNewsGrid from '@/components/home/HomeNewsGrid';
import HomeUseCases from '@/components/home/HomeUseCases';
import HomeValues from '@/components/home/HomeValues';

export default function Home() {
  return (
    <SiteShell>
      <div className="relative z-10 w-full overflow-x-hidden font-sans">
        <HomeHero />
        <HomeUseCases />
        <HomeValues />
        <HomeKeyNumbers />
        <HomeChatContact />
        <HomeNewsGrid />
        <Footer />
      </div>
    </SiteShell>
  );
}
