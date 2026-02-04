import React from 'react';
import { CLIENT_LOGOS } from '../constants';

const Logos: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="mb-12 text-center">
        <h3 className="text-xs tracking-[0.3em] uppercase text-gray-400">Trusted By</h3>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex gap-16 md:gap-32 items-center">
          {/* Double the list for seamless loop */}
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
            <span 
              key={idx} 
              className="text-3xl md:text-5xl font-serif text-gray-300 uppercase select-none hover:text-gray-800 transition-colors duration-300 cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
      
      {/* Styles for animation */}
      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default Logos;