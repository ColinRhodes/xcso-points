// https://eslint.org/docs/user-guide/configuring

module.exports = {
	extends : [
		'eslint:recommended',
		'plugin:vue/strongly-recommended'
	],

	plugins : [
		'vue',
	],

	parserOptions: {
    	parser: 'babel-eslint',
	},

	env: {
		browser: true,
	},

	rules : {
		'vue/html-indent' : [ "error", "tab" ],
	}
}
