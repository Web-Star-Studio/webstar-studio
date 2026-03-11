import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isMenuOpen }) => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 flex flex-col transition-all duration-500 bg-[#0a0a0a] text-white/80 font-sans uppercase text-[10px] tracking-widest`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Top Banner Row */}
      <div className="w-full h-10 border-b border-[#222] flex items-center justify-center bg-[#081808]">
        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-[#88d388]">
          <span className="text-[12px]">✧</span>
          <span className="normal-case tracking-normal">Post-quantum cryptography: Gartner® recommendations available with NEVERHACK</span>
          <span className="ml-2 font-medium">Access the report → →</span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="flex items-center h-[72px] w-full border-b border-[#222]">
        
        {/* Left Spacing / Optional Hamburger Area */}
        <div className="w-16 md:w-24 h-full border-r border-[#222] flex items-center justify-center shrink-0">
          {/* Mobile Hamburger (Hidden on Desktop) */}
          <button
            onClick={onMenuClick}
            className={`lg:hidden group flex flex-col items-center justify-center gap-1.5 focus:outline-none`}
          >
           {!isMenuOpen && (
              <>
                <span className={`block w-6 h-0.5 transition-colors duration-300 bg-white group-hover:bg-neon-lime`}></span>
                <span className={`block w-6 h-0.5 transition-colors duration-300 bg-white group-hover:bg-neon-lime`}></span>
              </>
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="px-8 md:px-12 h-full border-r border-[#222] flex items-center shrink-0">
          <a href="#" className={`text-lg md:text-xl font-bold tracking-[0.1em] font-display transition-colors duration-300 text-white`}>
            WEBSTAR
          </a>
        </div>

        {/* Use Cases */}
        <div className="px-8 h-full border-r border-[#222] hidden lg:flex items-center hover:text-white transition-colors cursor-pointer shrink-0 group">
          <span className="flex items-center gap-3">
            USE CASES 
            <span className="opacity-50 text-[14px] leading-none mb-1 group-hover:opacity-100 transition-opacity">⠿</span>
          </span>
        </div>

        {/* Center Links (Flex-1 allows it to fill available space) */}
        <nav className="flex-1 hidden lg:flex items-center h-full px-12 gap-12">
          <a href="#home" className="hover:text-white transition-colors">HOME</a>
          <a href="#offers" className="hover:text-white transition-colors flex items-start">OFFERS</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
          <a href="#careers" className="hover:text-white transition-colors">CAREERS</a>
          <a href="#jobs" className="hover:text-white transition-colors">JOBS</a>
          <a href="#news" className="hover:text-white transition-colors">NEWS</a>
        </nav>

        {/* Spacer for Mobile to push edge items right */}
        <div className="flex-1 lg:hidden border-r border-[#222] h-full" />

        {/* Right: Language */}
        <div className="w-16 md:w-24 h-full border-l border-[#222] flex items-center justify-center hover:text-white transition-colors cursor-pointer shrink-0">
          EN
        </div>

        {/* Right: Contact */}
        <div className="w-24 md:w-32 h-full border-l border-r border-[#222] hidden md:flex items-center justify-center hover:text-white transition-colors cursor-pointer shrink-0">
          <a href="#contact">CONTACT</a>
        </div>
        
        {/* Right Spacing equivalent to Left Spacing */}
        <div className="w-16 md:w-24 h-full hidden lg:block shrink-0 bg-[#0a0a0a]"></div>

      </div>
    </motion.header>
  );
};

export default Header;