import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-32 px-4 md:px-8 max-w-[1600px] mx-auto">
      <div className="mb-24 px-4 text-center">
        <h2 className="text-4xl md:text-6xl tracking-[0.2em] font-light uppercase">Selected Works</h2>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="relative group break-inside-avoid overflow-hidden"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
               {/* Image with Zoom Effect */}
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white p-8 text-center">
                <h3 className="text-2xl tracking-[0.3em] font-light uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {project.title}
                </h3>
                <p className="text-xs tracking-widest font-mono transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  {project.category}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <button className="px-12 py-4 border border-black text-xs tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all duration-300">
          View All Projects
        </button>
      </div>
    </section>
  );
};

export default Projects;