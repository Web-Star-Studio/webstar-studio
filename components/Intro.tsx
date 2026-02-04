import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../constants';

const Intro: React.FC = () => {
  return (
    <section className="py-32 md:py-48 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-wide">
            WE SHAPE <br />
            <span className="font-semibold">THE INTANGIBLE</span>
          </h2>
        </div>
        <div>
          <p className="text-lg md:text-xl font-light leading-relaxed text-gray-600 mb-8">
            CHD is a creative studio dedicated to art production and spatial design. 
            We bridge the gap between artistic vision and technical reality, 
            transforming ambitious concepts into tangible experiences.
          </p>
          <p className="text-lg md:text-xl font-light leading-relaxed text-gray-600">
            From monumental sculptures to immersive installations, our team 
            orchestrates every detail with precision, passion, and a relentless 
            pursuit of aesthetic perfection.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Intro;