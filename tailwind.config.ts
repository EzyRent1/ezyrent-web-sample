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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primaryPurple: '#7065F0',
        greyText: '#666666'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
          '75%': { transform: 'translateX(-2px)' }
        },
        slideRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        slideLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        pulldown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10%)',
            visibility: 'hidden'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
            visibility: 'visible'
          }
        },
        errorPulse: {
          '0%': { borderColor: '#ff0000', transform: 'scale(1)' },
          '50%, 100%': { borderColor: '#ff8080', transform: 'scale(1.05)' }
        },
        successPulse: {
          '0%, 100%': { borderColor: '#00ff00', transform: 'scale(1)' },
          '50%': { borderColor: '#80ff80', transform: 'scale(1.05)' }
        },
        smoothBounce: {
          '0%': {
            transform: 'translateY(40px)'
          },
          '100%': {
            transform: 'translateY(-40px)'
          }
        },
        sendZ: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(2px, -2px)' }
        }
      },
      animation: {
        errorPulse: 'errorPulse 0.5s ease-in-out forwards',
        successPulse: 'successPulse 0.5s ease-in-out forwards',
        shake: 'shake 0.5s ease-in-out infinite',
        slideRight: 'slideRight 0.5s ',
        slideLeft: 'slideLeft 0.5s ease-in-out',
        pulldown: 'pulldown 0.3s ease-out',
        smoothBounce:
          'smoothBounce 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        sendZ: 'sendZ 2.5s cubic-bezier(0.45, 0, 0.55, 1) infinite'
      }
    }
  },
  plugins: []
};

export default config;
