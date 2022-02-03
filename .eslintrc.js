module.exports = {
	env: {
		browser: false,
		es2021: true,
		//commonjs: true,
		node: true
	},
	extends: [
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports,
		ecmaFeatures: {
			ts: true,
			jsx: true // Allows for the parsing of JSX
		}
	},
	plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		rootRequire: 'readonly',
		requireConfig: 'readonly',
		requireLogger: 'readonly'
	},
	settings: {},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'no-console': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-unused-vars': 'off',
		'require-atomic-updates': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					String: false,
					Boolean: false,
					Number: false,
					Symbol: false,
					'{}': false,
					Object: false,
					object: false,
					Function: false
				},
				extendDefaults: true
			}
		],
		'prettier/prettier': [
			'warn',
			{
				printWidth: 100,
				tabWidth: 2,
				semi: true,
				singleQuote: true,
				bracketSpacing: true,
				arrowParens: 'always',
				endOfLine: 'auto'
			}
		],
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				args: 'after-used',
				ignoreRestSiblings: false,
				argsIgnorePattern: '^_.*?$'
			}
		],
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'padding-line-between-statements': [
			'warn',
			{ blankLine: 'always', prev: '*', next: 'return' },
			{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
			{ blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
		]
	}
};
