const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			sans: ['Varela Round', ...fontFamily.sans],
		},
		extend: {
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms')
	]
};
