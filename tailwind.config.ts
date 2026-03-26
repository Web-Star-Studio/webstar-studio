import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roobert)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        display: ['var(--font-syne)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
        oswald: ['var(--font-oswald)', 'sans-serif'],
        bebas: ['var(--font-bebas)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        extreme: '0.3em',
        mega: '0.5em',
      },
      colors: {
        'neon-lime': '#6210CC',
        'electric-violet': '#6210CC',
        'deep-space': '#000000',
        'soft-white': '#f3f8f0',
        'lavender-mist': '#d2c5ff',
        'deep-teal': '#345c59',
      },
    },
  },
  plugins: [],
};

export default config;
