const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
	//prefix: 'wdx-',
	darkMode: 'class',
	content: [
		'./**/content/**/*.md',
		'./**/content/**/*.html',

		'./**/layouts/**/*.html', // All fles
		'!./**/layouts/partials/bootstrap.html', // Exclusion pattern
	],
	variants: {},
	plugins: [
		require('@tailwindcss/typography')({
			className: 'wysiwyg',
		}),
		require('@tailwindcss/forms')({
			strategy: 'base', // only generate global styles
			strategy: 'class', // only generate classes
		}),
	],
};
