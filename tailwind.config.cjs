/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Outfit', 'sans-serif']
		},
		extend: {
			colors: {
				brand: '#0cc0df'
			}
		}
	},
	plugins: []
};
