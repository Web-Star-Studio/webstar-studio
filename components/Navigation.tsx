import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Instagram, Linkedin, Twitter } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
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
          className="fixed inset-0 z-50 bg-deep-space text-soft-white flex flex-col md:flex-row"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-2 hover:rotate-90 transition-transform duration-500 hover:text-neon-lime"
          >
            <X size={32} strokeWidth={1} />
          </button>

          {/* Left Panel - Info */}
          <div className="hidden md:flex w-1/3 h-full flex-col justify-between p-16 border-r border-white/10">
            <div>
              <h2 className="text-xl tracking-widest font-light mb-8 font-display text-neon-lime">CONTACT</h2>
              <p className="text-lavender-mist font-light leading-relaxed">
                12 Rue de la Paix<br />
                75002 Paris, France<br />
                +33 1 42 68 53 00<br />
                hello@webstar-studio.com
              </p>
            </div>
            <div className="flex gap-6">
              <Instagram className="cursor-pointer hover:text-neon-lime transition-colors" />
              <Linkedin className="cursor-pointer hover:text-neon-lime transition-colors" />
              <Twitter className="cursor-pointer hover:text-neon-lime transition-colors" />
            </div>
          </div>

          {/* Right Panel - Navigation */}
          <div className="flex-1 h-full flex flex-col justify-center px-8 md:px-24">
            <nav className="flex flex-col gap-6 md:gap-8">
              <motion.a
                href="#projects"
                custom={0}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase hover:text-neon-lime transition-colors font-display"
              >
                {t('nav.projects')}
              </motion.a>
              <motion.a
                href="#expertise"
                custom={1}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase hover:text-neon-lime transition-colors font-display"
              >
                {t('nav.expertise')}
              </motion.a>
              <motion.a
                href="#agency"
                custom={2}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase hover:text-neon-lime transition-colors font-display"
              >
                {t('nav.agency')}
              </motion.a>
              <motion.a
                href="#contact"
                custom={3}
                variants={linkVariants}
                onClick={onClose}
                className="text-4xl md:text-7xl font-light tracking-wide uppercase hover:text-neon-lime transition-colors font-display"
              >
                {t('nav.contact')}
              </motion.a>
            </nav>

            <motion.div
              variants={linkVariants}
              custom={5}
              className="mt-16 flex gap-6 text-sm tracking-widest"
            >
              <button onClick={() => i18n.changeLanguage('en')} className={`${i18n.language.startsWith('en') ? 'border-b border-neon-lime text-neon-lime' : 'text-gray-500 hover:text-soft-white'} transition-colors`}>EN</button>
              <button onClick={() => i18n.changeLanguage('pt')} className={`${i18n.language.startsWith('pt') ? 'border-b border-neon-lime text-neon-lime' : 'text-gray-500 hover:text-soft-white'} transition-colors`}>PT</button>
              <button onClick={() => i18n.changeLanguage('es')} className={`${i18n.language.startsWith('es') ? 'border-b border-neon-lime text-neon-lime' : 'text-gray-500 hover:text-soft-white'} transition-colors`}>ES</button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;