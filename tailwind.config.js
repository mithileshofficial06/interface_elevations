/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F4A103',
        'primary-dark': '#C98500',
        'primary-light': '#FFB92E',
        background: '#0B0B0B',
        section: '#1A1A1A',
        'section-light': '#242424',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        'text-muted': '#707070',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            textShadow: '0 0 20px rgba(244, 161, 3, 0.3), 0 0 40px rgba(244, 161, 3, 0.1)',
          },
          '50%': {
            textShadow: '0 0 30px rgba(244, 161, 3, 0.5), 0 0 60px rgba(244, 161, 3, 0.2)',
          },
        },
      },
    },
  },
  plugins: [],
};
