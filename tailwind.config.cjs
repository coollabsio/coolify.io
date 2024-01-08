/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	daisyui: {
		themes: [
			{
				coollabs: {
					"base-100": "#323232",
					"base-200": "#242424",
					"base-300": "#181818",
					"primary": "#6B16ED",
					"primary-content": "#fff",
					"secondary": "#343232",
					"accent": "#343232",
					"neutral": "#272626",
					"info": "#0284c7",
					"success": "#16A34A",
					"warning": "#FFFF00",
					"error": "#DC2626",
					"--rounded-btn": "0.3rem",
					"--btn-text-case": "normal"
				},
			}
		],
	},
	daisyui: {
        themes: [
            {
                coollabs: {
                    primary: "#323232",
                    "primary-focus": "#242424",
                    secondary: "#4338ca",
                    accent: "#4338ca",
                    neutral: "#1B1D1D",
                    "base-100": "#181818",
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
			wiggle: 'wiggle 0.5s ease-in-out infinite'
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
