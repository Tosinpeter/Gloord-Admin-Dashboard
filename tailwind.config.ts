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
    			// Core brand tokens
    			pry: '#CF604A',
    			sec: '#EDEBE3',
    			tet: '#20201E',

    			// Surfaces / neutrals
    			surface: '#F6F0EE',
    			"teal-bg": "#F0FDFA",
    			muted: '#d6d6d6',
    			ink: '#0A0A0A',
    			neutral: '#D9D9D9',

    			// Status: success / approved / active
    			success: '#016630',
    			'success-accent': '#17B26A',
    			'success-muted': '#067647',
    			'success-bg': '#DCFCE7',
    			'success-border': '#B9F8CF',
    			'success-pale': '#ECFDF3',
    			'success-pale-border': '#ABEFC6',

    			// Status: warning / pending
    			warning: '#973C00',
    			'warning-bg': '#FEF3C6',
    			'warning-border': '#FEE685',

    			// Status: error / rejected
    			error: '#9F0712',
    			'error-bg': '#FFE2E2',
    			'error-border': '#FFC9C9',
    			'error-accent': '#F04438',
    			'error-pale': '#FEE4E2',
    			'error-pale-hover': '#FECDCA',

    			// Error banner (Offline/off) styling
    			'error-soft-bg': '#FEF2F2',
    			'error-soft-border': '#FECACA',
    			'error-soft-text': '#991B1B',

    			// Misc
    			overlay: '#0000003D',
    			'chart-accent': '#D2644D',

    			// Brand/status translucency + UI helpers
    			'pry-soft': '#CF604A0D',
    			'tet-99': '#20201E99',
    			'muted-green': '#7B988A',
    			'error-border-soft': '#FFA2A2',

    			// Muted text used in admin forms
    			'muted-text': '#717182',

    			// UI greens / borders used in legacy components
    			'success-green': '#00A63E',
    			'black-soft': '#0000001A',

    			// Form/input placeholders + validation
    			'form-muted': '#344054',
    			'error-text': '#B91C1C',

    			// Misc legacy colors used in auth UI
    			'hero-overlay': '#413E3E4D',
    			'muted-gray': '#a5a5a5',

    			// Hover/interaction helpers (keep explicit if used)
    			'success-accent-hover': '#129955',
    			'success-hover-bg': '#F6FEF9',

    			// Orange/moderate intensity used in treatment plan UI
    			'orange-accent': '#DC6803',
    			'orange-bg': '#FEF0C7',

    			// Admin table/filters legacy surfaces
    			'sec-hover': '#E0DED6',
    			'surface-variant': '#FAFAF8',
    			'warning-text-offline': '#9A3412',

    			// Legacy neutral/muted surfaces
    			'surface-muted': '#F5F5F0',

    			// Additional status shades used in case review screens
    			'warning-text-alt': '#93370D',
    			'warning-dot': '#F79009',
    			'error-text-alt': '#9B1C1C',
    			'error-bg-alt': '#FEE2E2',
    			'danger-hover': '#B42318',
    			'error-hover': '#d33a2f',

    			// Light error/warning backgrounds used in doctor pages
    			'warning-bg-light': '#FFFAEB',
    			'error-bg-light': '#FEF3F2',

				// Modal/menu destructive accent used in some buttons
				'danger-accent': '#E7000B',

				// Product catalog category pill styling
				'product-cleanser-text': '#1447E6',
				'product-cleanser-bg': '#EFF6FF',
				'product-cleanser-border': '#8EC5FF',
				'product-serum-text': '#7C3AED',
				'product-serum-bg': '#F5F3FF',
				'product-serum-border': '#C4B5FD',
				'product-moisturizer-text': '#059669',
				'product-moisturizer-bg': '#ECFDF5',
				'product-moisturizer-border': '#A7F3D0',
				'product-toner-text': '#D97706',
				'product-toner-bg': '#FFFBEB',
				'product-toner-border': '#FDE68A',
				'product-exfoliator-text': '#DC2626',
				'product-sunscreen-text': '#0891B2',
				'product-sunscreen-bg': '#ECFEFF',
				'product-sunscreen-border': '#A5F3FC'
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