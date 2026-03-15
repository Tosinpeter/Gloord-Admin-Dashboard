import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			pry: '#CF604A',
    			sec: '#EDEBE3',
    			tet: '#20201E',
    			// Additional theme colors
    			'text-primary': '#0A0A0A',
    			'text-secondary': '#d6d6d6',
    			'bg-overlay': '#0000003D',
    			'bg-card': '#F6F0EE',
    			'bg-hover': '#F6FEF9',
    			'border-light': '#EDEBE3',
    			'border-hover': '#17B26A',
    			'error-bg': '#FEF2F2',
    			'error-border': '#FECACA',
    			'error-text': '#F04438',
    			'error-text-light': '#FECDCA',
    			'success-text': '#016630',
    			'success-bg': '#DCFCE7',
    			'warning-text': '#DC6803',
    			'warning-bg': '#FEF0C7',
    			'chart-orange': '#D2644D',
    			'btn-success': '#17B26A',
    			'btn-success-hover': '#129955'
    		},
    		container: {
    			center: true,
    			padding: {
    				DEFAULT: '1.2rem',
    				sm: '0.8rem'
    			},
    			screens: {
    				sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
    			}
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		},
			fontFamily: {
				aeonik: ['var(--font-aeonik)'],
				'host-grotesk': ['var(--font-host-grotesk)'],
			},
    	}
    },
	plugins: [],
} satisfies Config;