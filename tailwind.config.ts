import type { Config } from 'tailwindcss'

const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        primary: '#A978DE',
        'primary-focus': '#8C5DB9',
        'primary-content': '#FFFFFF',

        secondary: '#DE78C5',
        'secondary-focus': '#B95DA3',
        'secondary-content': '#ffffff',

        accent: '#d99330',
        'accent-focus': '#b57721',
        'accent-content': '#ffffff',

        neutral: '#110e0e',
        'neutral-focus': '#060404',
        'neutral-content': '#ffffff',

        'base-100': '#0f162b',
        'base-200': '#26304e',
        'base-300': '#060404',
        'base-content': '#ffffff',

        info: '#66c7ff',
        success: '#87cf3a',
        warning: '#e1d460',
        error: '#ff6b6b',

        loading: '#e779c11a',
      },
      borderRadius: {
        'rounded-box': '1rem',
        'rounded-btn': '.2rem',
        'rounded-badge': '1.9rem',
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
      keyframes: {
        orbit: {
          '0%': {
            transform:
              'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)',
          },
          '100%': {
            transform:
              'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)',
          },
        },
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        scroll: {
          to: {
            transform: 'translate(calc(-50% - 0.5rem))',
          },
        },
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        progress: 'progress 1s infinite linear',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        orbit: 'orbit calc(var(--duration)*1s) linear infinite',
      },
    },
  },
  prefix: '',
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    addVariablesForColors,
  ],
}

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  )

  addBase({
    ':root': newVars,
  })
}

export default config
