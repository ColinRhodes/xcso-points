// https://eslint.org/docs/user-guide/configuring
module.exports = {
	root: true,

	// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
	// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
	extends : [
		'eslint:recommended',
		'plugin:vue/strongly-recommended'
	],

	parserOptions : {
		ecmaVersion : 6,
		parser      : 'babel-eslint',
	},

	env : {
		es6     : true,
		browser : true,
	},

	// required to lint *.vue files
	plugins: [
		'vue',
	],

	globals : {
		setImmediate : true,
		require      : true,
	},

	rules : {
		// Possible Errors
		'no-cond-assign'           : 'error',
		'no-constant-condition'    : 'error',
		'no-debugger'              : process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-dupe-args'             : 'error',
		'no-dupe-keys'             : 'error',
		'no-duplicate-case'        : 'error',
		'no-empty-character-class' : 'error',
		'no-extra-boolean-cast'    : 'error',
		'no-func-assign'           : 'error',
		'no-inner-declarations'    : 'error',
		'no-invalid-regexp'        : 'error',
		'no-irregular-whitespace'  : 'error',
		'no-negated-in-lhs'        : 'error',
		'no-obj-calls'             : 'error',
		'valid-typeof'             : 'error',

		// Best Practices
		'no-eval'               : 'error',
		'no-else-return'        : 'error',
		'no-loop-func'          : 'error',
		'no-implied-eval'       : 'error',
		'no-buffer-constructor' : 'error',

		// Variables
		'no-unused-vars' : 'error',

		// Stylistic
		'arrow-body-style'         : [ 'error' ],
		'block-spacing'            : [ 'error' ],
		'brace-style'              : [ 'error', 'stroustrup' ],
		'camelcase'                : [ 'error', { properties : 'always' } ],
		'no-array-constructor'     : [ 'error' ],
		'no-nested-ternary'        : [ 'error' ],
		'no-mixed-spaces-and-tabs' : [ 'error', 'smart-tabs' ],
		'object-property-newline'  : [ 'error', { allowMultiplePropertiesPerLine : true } ],
		'func-style'               : [ 'error', 'declaration', { allowArrowFunctions : true } ],

		// automatically fixable
		'no-unsafe-negation'    : [ 'error' ],
		'dot-location'          : [ 'error', 'property' ],
		'dot-notation'          : [ 'error', { allowPattern : '^[A-Za-z]+(_[A-Za-z0-9]+)+$' } ],
		'no-extra-bind'         : [ 'error' ],
		'no-floating-decimal'   : [ 'error' ],
		'no-implicit-coercion'  : [ 'error', { allow : [ '!!' ] } ],
		'yoda'                  : [ 'error' ],
		'no-undef-init'         : [ 'error' ],
		'array-bracket-spacing' : [ 'error', 'always', { objectsInArrays : true, arraysInArrays : true } ],
		'comma-dangle'          : [ 'error', { objects : 'always-multiline', arrays : 'always-multiline', functions : 'never' } ],
		'comma-spacing'         : [ 'error' ],
		'comma-style'           : [ 'error' ],
		'curly'                 : [ 'error' ],
		'eol-last'              : [ 'error', 'always' ],
		'func-call-spacing'     : [ 'error' ],
		'indent'                : [ 'error', 'tab', { SwitchCase : 1 } ],
		'key-spacing'           : [ 'error', {
			beforeColon : true,
			afterColon  : true,
			align       : 'colon',
		} ],
		'keyword-spacing'               : [ 'error' ],
		'linebreak-style'               : [ 'error', 'unix' ],
		'new-parens'                    : [ 'error' ],
		'no-lonely-if'                  : [ 'error' ],
		'no-multiple-empty-lines'       : [ 'error', { max : 2, maxEOF : 1, maxBOF : 0 } ],
		'no-trailing-spaces'            : [ 'error' ],
		'no-whitespace-before-property' : [ 'error' ],
		'object-curly-spacing'          : [ 'error', 'always' ],
		'operator-linebreak'            : [ 'error', 'before' ],
		'quote-props'                   : [ 'error', 'consistent-as-needed' ],
		'quotes'                        : [ 'error', 'single', { avoidEscape : true } ],
		'semi'                          : [ 'error', 'always' ],
		'computed-property-spacing'     : [ 'error', 'never' ],
		'semi-spacing'                  : [ 'error' ],
		'space-before-blocks'           : [ 'error' ],
		'space-before-function-paren'   : [ 'error', {
			anonymous  : 'never',
			named      : 'never',
			asyncArrow : 'always',
		} ],
		'space-in-parens'         : [ 'error', 'never' ],
		'space-infix-ops'         : [ 'error' ],
		'space-unary-ops'         : [ 'error', { words : true, nonwords : false } ],
		'spaced-comment'          : [ 'error', 'always' ],
		'arrow-parens'            : [ 'error', 'as-needed' ],
		'arrow-spacing'           : [ 'error' ],
		'generator-star-spacing'  : [ 'error', 'neither' ],
		'no-useless-rename'       : [ 'error' ],
		'no-var'                  : [ 'error' ],
		'prefer-const'            : [ 'error' ],
		'prefer-numeric-literals' : [ 'error' ],
		'prefer-template'         : [ 'error' ],
		'prefer-spread'           : [ 'error' ],
		'template-curly-spacing'  : [ 'error' ],
		'yield-star-spacing'      : [ 'error' ],
		'no-return-await'         : [ 'error' ],
		'no-return-assign'        : [ 'error', 'always' ],
		'object-shorthand'        : [ 'error', 'properties' ],

		// Vue: disable some extended rules
		'vue/max-attributes-per-line' : 'off', // doesn't work with our pattern of allowing `class` and `id` static attrs on first line
		'vue/require-default-prop'    : 'off',

		// Vue: configure extended rules
		// 'vue/component-name-in-template-casing' : [ 'error', 'kebab-case' ],
		'vue/html-indent'                       : [ 'error', 'tab' ],

		// Vue: enable extra rules
		'vue/no-v-html'           : 'error',
		'vue/order-in-components' : 'error',
		'vue/this-in-template'    : 'error',
	},
};