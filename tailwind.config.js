const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				'cera': ['"Cera Pro Regular"', 'sans-serif'],
			},
			colors: {
				primary: '#006fee',
				secondary: '#fafafa',
				black: '#000000',
			},
			screens: {
				xs: '480px',
				md: '768px',
				xl: '1000px',
				"2xl": '1200px',
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
