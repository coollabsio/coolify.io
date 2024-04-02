/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	daisyui: {
        themes: [
            {
                coollabs: {
                    primary: "#181818",
                    "primary-focus": "#242424",
                    secondary: "#4338ca",
                    accent: "#4338ca",
                    neutral: "#1B1D1D",
                    "base-100": "#101010",
                    info: "#2563EB",
                    success: "#16A34A",
                    warning: "#FCD34D",
                    error: "#DC2626",
                },
            },
        ],
    },
	theme: {
		extend: {
		  keyframes: {
			wiggle: {
			  '0%, 100%': { transform: 'rotate(-3deg)' },
			  '50%': { transform: 'rotate(3deg)' }
			}
		  },
		  animation: {
			bounce: 'bounce 2s infinite;'
		  },
		  colors: {
			coollabs: '#6B16ED',
			'coollabs-100': '#7317FF',
			coolblack: '#181818',
			'coolgray-100': '#181818',
			'coolgray-200': '#202020',
			'coolgray-300': '#242424',
			'coolgray-400': '#282828',
			'coolgray-500': '#323232'
		  }
		}
	  },
	  variants: {
		scrollbar: ['dark'],
		extend: {}
	  },
	  plugins: [require("daisyui")]
}
