import React from 'react';
import { CITIES } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111] text-white overflow-hidden">
      {/* City Marquee */}
      <div className="py-8 border-b border-white/10 overflow-hidden">
        <div className="animate-marquee-reverse whitespace-nowrap flex gap-12">
           {[...CITIES, ...CITIES, ...CITIES].map((city, idx) => (
            <span key={idx} className="text-sm tracking-[0.3em] text-gray-500">
              {city}
            </span>
          ))}
        </div>
      </div>

      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div>
          <h2 className="text-2xl font-bold tracking-widest mb-8">C H D</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Crafting the extraordinary through <br/> art, design, and technology.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-6">Address</h4>
          <p className="font-light leading-relaxed">
            12 Rue de la Paix<br />
            75002 Paris<br />
            France
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-6">Contact</h4>
          <p className="font-light leading-relaxed mb-4">
            +33 1 42 68 53 00<br />
            hello@chd-artmaker.com
          </p>
          <div className="flex gap-4 text-xs tracking-widest underline underline-offset-4">
            <a href="#" className="hover:text-gray-400">INSTAGRAM</a>
            <a href="#" className="hover:text-gray-400">LINKEDIN</a>
          </div>
        </div>

        <div>
           <h4 className="text-xs tracking-widest uppercase text-gray-500 mb-6">Legal</h4>
           <ul className="space-y-2 text-sm text-gray-400">
             <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
             <li><a href="#" className="hover:text-white transition-colors">Credits</a></li>
           </ul>
        </div>
      </div>

      <div className="py-8 text-center border-t border-white/10">
        <p className="text-[10px] tracking-[0.2em] text-gray-600">
          © {new Date().getFullYear()} CHD ART MAKER. ALL RIGHTS RESERVED.
        </p>
      </div>

      <style>{`
        .animate-marquee-reverse {
          animation: marqueeReverse 40s linear infinite;
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;