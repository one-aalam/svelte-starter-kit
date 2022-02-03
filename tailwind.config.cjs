const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Varela Round', ...fontFamily.sans],
		},
		extend: {
		}
	},
	plugins: []
};
