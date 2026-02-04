import React from 'react';
import { motion } from 'framer-motion';
import { NEWS, fadeInUp, staggerContainer } from '../constants';

const News: React.FC = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-24 border-b border-gray-200 pb-8">
        <h2 className="text-4xl md:text-5xl font-light tracking-wide">JOURNAL</h2>
        <a href="#journal" className="hidden md:block text-xs tracking-widest uppercase hover:underline">Read All</a>
      </div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {NEWS.map((item) => (
          <motion.article 
            key={item.id}
            variants={fadeInUp}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden mb-6 aspect-[3/2]">
              <motion.img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <span className="block text-xs tracking-widest text-gray-400 mb-2">{item.date}</span>
            <h3 className="text-xl font-light leading-snug group-hover:underline decoration-1 underline-offset-4">
              {item.title}
            </h3>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default News;