const themeDir = __dirname + '/../../';
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
	plugins: [
		require('postcss-import')({
			path: [themeDir],
		}),
		require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
		require('autoprefixer')({
			path: [themeDir],
		}),

		purgecss({
			content: ['./**/*.html'],
		}),
	],
};
