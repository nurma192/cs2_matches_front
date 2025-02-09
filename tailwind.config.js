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
				primary: '#c83e2f',
				secondary: '#1a1a27',
				third: '#232331',
				white: '#fafafa',
				gray: '#888891',
				black: '#000000',
				ct: '#6c9bc9',
				tt: '#bb9746',
			},
			screens: {
				"2xs": '380px',
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
