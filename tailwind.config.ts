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
      spacing: {
        'negative-header': 'calc(-1 * var(--header-height))',
      },
      colors: {
        bg: 'var(--bg)',
        fg: 'var(--fg)',
        heading: 'var(--headingcolor)',
        primary: 'var(--primary-color)',
      },
      animation: {
        spinner: 'spin 1s ease-in-out infinite',
        themeSpinner: 'theme-spin 0.4s ease-out',
        opacityTransX: 'opacity-trans-x 0.7s ease-in-out',
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
        'opacity-trans-x': {
          '0%': { opacity: '0', transform: 'translateX(-8%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
