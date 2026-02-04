import React from 'react';
import { motion } from 'framer-motion';
import { EXPERTISE, fadeInUp, staggerContainer } from '../constants';

const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-gray-100">
      <div className="mb-24">
        <h2 className="text-sm tracking-[0.3em] uppercase text-gray-400">Our Expertise</h2>
      </div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24"
      >
        {EXPERTISE.map((item) => (
          <motion.div 
            key={item.id} 
            variants={fadeInUp}
            className="group cursor-pointer"
          >
            <div className="flex items-baseline justify-between mb-8 border-b border-gray-200 pb-4 group-hover:border-black transition-colors duration-500">
              <h3 className="text-3xl font-light tracking-widest">{item.title}</h3>
              <span className="text-xs font-mono text-gray-400">{item.number}</span>
            </div>
            <ul className="space-y-4">
              {item.points.map((point, idx) => (
                <li key={idx} className="text-gray-500 font-light flex items-center gap-4">
                  <span className="w-1 h-1 bg-gray-300 rounded-full group-hover:bg-black transition-colors" />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Expertise;