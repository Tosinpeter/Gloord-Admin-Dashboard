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
    			tet: '#20201E'
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