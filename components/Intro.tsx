import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { fadeInUp } from '../constants';

const Intro: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start"
      >
        <div className="text-soft-white mb-16">
          <h2 className="text-5xl md:text-7xl font-bold leading-[0.9] tracking-tight font-display mb-8">
            {t('intro.line1')} <br />
            <span className="text-neon-lime font-editorial italic font-light tracking-normal">{t('intro.line2')}</span>
          </h2>
        </div>
        <div>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-lavender-mist mb-8 font-editorial">
            {t('intro.desc1')}
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed text-lavender-mist/80 max-w-2xl">
            {t('intro.desc2')}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;