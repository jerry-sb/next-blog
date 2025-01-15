import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        heading: 'var(--headingcolor)',
      },
      animation: {
        spinner: 'spin 1s ease-in-out infinite',
        themeSpinner: 'theme-spin 0.4s ease-out',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'theme-spin': {
          '0%': { transform: 'rotate(90deg)', opacity: '0.5' },
          '100%': { transform: 'rotate(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
