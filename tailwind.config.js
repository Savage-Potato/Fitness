/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#10B981',
        dark: '#1F2937',
        light: '#F3F4F6',
        accent: '#F59E0B',
        highlight: '#EC4899'
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'wave': 'wave 15s linear infinite',
        'shimmer': 'shimmer 2s linear infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        wave: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(79, 70, 229, 0.3)',
        'glow-strong': '0 0 30px rgba(79, 70, 229, 0.5)',
        'glow-accent': '0 0 20px rgba(245, 158, 11, 0.4)',
        'glow-highlight': '0 0 20px rgba(236, 72, 153, 0.4)'
      },
      backgroundImage: {
        'mesh-pattern': 'radial-gradient(circle at center, var(--tw-gradient-from) 0%, transparent 70%)',
        'wave-pattern': 'repeating-linear-gradient(45deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 10%, transparent 10%, transparent 50%)',
        'shimmer-pattern': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
      }
    },
  },
  plugins: [],
}