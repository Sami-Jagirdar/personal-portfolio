import type { Config } from "tailwindcss";
import tailWindCssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: 'jit',
  theme: {
  	extend: {
		container: {
			center: true,
			padding: "5vw",
		},
		dropShadow: {
			spotlight: [
				'0 0 15px rgba(216, 64, 74, 0.6)',  // Base red (matches the text color with a glow effect)
				'0 0 20px rgba(253, 95, 124, 0.8)', // Soft pinkish-red layer
				'0 0 40px rgba(250, 126, 117, 0.66)', // Subtle warm glow for contrast
			],
		  },
		  fontFamily: {
			primary: 'var(--font-roboto-mono)',
		},
  		colors: {
			primary:'#19191a',
			accent:{
				DEFAULT: '#d8404a',
				hover: '#650000',
			},
			card: {
				DEFAULT: '#080808',
				hover: '#1a2a2a',
			},
			silver: '#c0c0c0',
			blue: '#0e67a1',
			green: '#00c853',
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '960px',
			xl: '1200px'
		},
		keyframes: {
			spotlight: {
			  '0%': { 
				color: 'rgb(255, 255, 255)',
				filter: 'drop-shadow(0 0 0px rgba(216, 64, 74, 0))',
			  },
			  '100%': {
				color: 'rgb(216, 64, 74)',
				filter: 'drop-shadow(0 0 15px rgba(216, 64, 74, 0.6)) drop-shadow(0 0 20px rgba(253, 95, 124, 0.8)) drop-shadow(0 0 40px rgba(250, 126, 117, 0.66))'
			  }
			}
		  },
		  animation: {
			'spotlight': 'spotlight 0.5s ease-out forwards',
		  },
		
  	}
  },
  plugins: [tailWindCssAnimate],
} satisfies Config;
