import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Expertise from './components/Expertise';
import Projects from './components/Projects';
import Logos from './components/Logos';
import News from './components/News';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fake Loading Screen
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="animate-pulse">
           <span className="text-4xl font-bold tracking-[0.5em]">C H D</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen selection:bg-black selection:text-white">
      <Header 
        isMenuOpen={isMenuOpen} 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
      />
      
      <Navigation 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />

      <main>
        <Hero />
        <Intro />
        <Expertise />
        <Projects />
        <Logos />
        <News />
      </main>

      <Footer />
    </div>
  );
};

export default App;