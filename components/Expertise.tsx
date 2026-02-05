import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { EXPERTISE, fadeInUp, staggerContainer } from '../constants';

const Expertise: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="expertise" className="py-24 md:py-32 bg-deep-space text-soft-white border-t border-white/5">
      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-sm tracking-[0.3em] uppercase mb-16 font-display text-neon-lime">
            {t('expertise.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {EXPERTISE.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="group border border-white/5 p-8 hover:bg-white/5 transition-all duration-500 hover:border-white/10"
              >
                <span className="block text-4xl font-light mb-6 text-neon-lime/50 font-display">0{index + 1}</span>
                <h3 className="text-xl tracking-widest mb-6 font-display group-hover:text-neon-lime transition-colors">
                  {t(`expertise.list.e${index + 1}.title`)}
                </h3>
                <ul className="space-y-3">
                  {(t(`expertise.list.e${index + 1}.points`, { returnObjects: true }) as string[]).map((point, i) => (
                    <li key={i} className="text-sm font-light text-lavender-mist tracking-wide group-hover:text-soft-white transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;