/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
			'coolgray-500': '#323232',
			primary: '#6B16ED',
			secondary: '#7317FF',
			accent: '#FCD34D',
			info: '#2563EB',
			success: '#16A34A',
			warning: '#FCD34D',
			error: '#DC2626',
			'base-100': '#101010',
			'base-200': '#181818',
			'base-300': '#202020',
			'base-content': '#ffffff',
			neutral: {
			  DEFAULT: '#242424',
			  50: '#fafafa',
			  100: '#f5f5f5',
			  200: '#e5e5e5',
			  300: '#d4d4d4',
			  400: '#a3a3a3',
			  500: '#737373',
			  600: '#525252',
			  700: '#404040',
			  800: '#262626',
			  900: '#171717',
			  950: '#0a0a0a',
			},
		  }
		}
	  },
	  plugins: [
		require('@tailwindcss/typography'),
	  ]
}
