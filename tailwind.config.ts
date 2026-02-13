import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: '#f9d7df',
        rose: '#f39bb1',
        ruby: '#a1163a',
        wine: '#5f0a1f'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif']
      },
      boxShadow: {
        glass: '0 20px 40px rgba(161, 22, 58, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
