'use client';

import { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BackgroundCanvas from '@/components/BackgroundCanvas';
import Header from '../../components/Header';
import Navigation from '../../components/Navigation';
import Hero from '../../components/Hero';
import Intro from '../../components/Intro';
import Expertise from '../../components/Expertise';
import Projects from '../../components/Projects';
import Logos from '../../components/Logos';
import News from '../../components/News';
import StackedCards from '@/components/StackedCards';
import GlobeSection from '@/components/GlobeSection';
import Footer from '../../components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="relative bg-[#000000] min-h-screen selection:bg-neon-lime selection:text-deep-space">
      
      {/* Universal Navigation System - Highest Z-Index */}
      <div className="relative z-[9999]">
        <Header 
          isMenuOpen={isMenuOpen} 
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
        />
        <Navigation 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>

      {/* 3D Master Layer: Persistent R3F Canvas */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      {/* UI Layer: Scrollable HTML content */}
      <div className="relative z-10 w-full font-sans overflow-x-hidden">
        
        {/* Core Introductory Block */}
        <Hero />
        
        {/* The Cinematic Globe Expansion happens during this segment */}
        <GlobeSection />
        
        {/* Narrative Flow */}
        <Intro />
        <Expertise />
        <Projects />
        <Logos />
        <News />
        
        {/* End-page Scroll Experience */}
        <div id="stacked-cards-trigger" className="relative w-full">
          <StackedCards />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
