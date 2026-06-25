/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#0066CC',
          700: '#1E3A8A',
          800: '#1E2D5A',
          900: '#0A2540',
        },
      },
      boxShadow: {
        'neon-blue':    '0 0 20px rgba(59,130,246,0.35), 0 0 40px rgba(59,130,246,0.15)',
        'neon-violet':  '0 0 20px rgba(139,92,246,0.35), 0 0 40px rgba(139,92,246,0.15)',
        'neon-cyan':    '0 0 20px rgba(34,211,238,0.30), 0 0 40px rgba(34,211,238,0.12)',
        'blue-glow':    '0 0 30px rgba(59,130,246,0.30)',
        'glass':        '0 8px 32px rgba(0,0,0,0.2)',
        'glass-hover':  '0 8px 40px rgba(59,130,246,0.2), 0 0 0 1px rgba(59,130,246,0.15)',
      },
      animation: {
        'gradient-x':   'gradient-x 8s ease infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'fade-up':      'fade-up 0.6s ease forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%':     { 'background-position': '100% 50%' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.3' },
          '50%':     { opacity: '0.6' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
