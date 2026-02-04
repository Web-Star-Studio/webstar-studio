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
      className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-6 md:py-8 flex justify-between items-center transition-colors duration-300 ${isScrolled && !isMenuOpen ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="z-50">
        <a href="#" className={`text-2xl font-bold tracking-[0.3em] transition-colors duration-300 ${isMenuOpen ? 'text-white' : (isScrolled ? 'text-black' : 'text-white mix-blend-difference')}`}>
          C H D
        </a>
      </div>

      <button 
        onClick={onMenuClick}
        className={`group flex items-center gap-4 z-50 focus:outline-none`}
      >
        <span className={`hidden md:block text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${isMenuOpen ? 'text-transparent' : (isScrolled ? 'text-black' : 'text-white mix-blend-difference')}`}>
          Menu
        </span>
        <div className="space-y-1.5 p-2">
           {!isMenuOpen && (
             <>
               <span className={`block w-8 h-0.5 transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-white'}`}></span>
               <span className={`block w-5 h-0.5 ml-auto transition-colors duration-300 ${isScrolled ? 'bg-black' : 'bg-white'} group-hover:w-8 transition-all`}></span>
             </>
           )}
        </div>
      </button>
    </motion.header>
  );
};

export default Header;