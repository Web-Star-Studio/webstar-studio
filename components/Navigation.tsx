import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const menuVariants = {
    closed: { 
      x: "100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    open: { 
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVariants = {
    closed: { x: 80, opacity: 0 },
    open: (i: number) => ({ 
      x: 0, 
      opacity: 1, 
      transition: { delay: 0.3 + (i * 0.1), duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-[#1a1a1a] text-white flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-2 hover:rotate-90 transition-transform duration-500"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Left Panel - Info */}
          <div className="hidden md:flex w-1/3 h-full flex-col justify-between p-16 border-r border-white/10">
            <div>
              <h2 className="text-xl tracking-widest font-light mb-8">CONTACT</h2>
              <p className="text-gray-400 font-light leading-relaxed">
                12 Rue de la Paix<br />
                75002 Paris, France<br />
                +33 1 42 68 53 00<br />
                hello@chd-artmaker.com
              </p>
            </div>
            <div className="flex gap-6">
              <Instagram className="cursor-pointer hover:text-gray-400 transition-colors" />
              <Linkedin className="cursor-pointer hover:text-gray-400 transition-colors" />
              <Twitter className="cursor-pointer hover:text-gray-400 transition-colors" />
            </div>
          </div>

          {/* Right Panel - Navigation */}
          <div className="flex-1 h-full flex flex-col justify-center px-8 md:px-24">
             <nav className="flex flex-col gap-6 md:gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  onClick={onClose}
                  className="text-4xl md:text-7xl font-light tracking-wide uppercase hover:text-gray-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            
            <motion.div 
              variants={linkVariants} 
              custom={5}
              className="mt-16 flex gap-4 text-sm tracking-widest"
            >
              <span className="border-b border-white cursor-pointer">EN</span>
              <span className="text-gray-500 hover:text-white cursor-pointer transition-colors">FR</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;