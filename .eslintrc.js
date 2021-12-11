module.exports = {
	env: {
		browser: true,
		es2021: true,
		//commonjs: true,
		node: true
	},
	extends: [
		'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	parserOptions: {
		ecmaVersion: 12, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports,
		ecmaFeatures: {
			jsx: true // Allows for the parsing of JSX
		}
	},
	plugins: ['@typescript-eslint', 'simple-import-sort', 'react', 'react-hooks'],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
		rootRequire: 'readonly',
		requireConfig: 'readonly',
		requireLogger: 'readonly'
	},
	settings: {
		react: {
			version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
		}
	},
	rules: {
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		'no-console': 'warn',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-unused-vars': 'off',
		'require-atomic-updates': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
		'react/prop-types': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/camelcase': 'off',
		'react/jsx-no-target-blank': 'off',
		'react/display-name': 'off',
		'react-hooks/rules-of-hooks': 'warn',
		'react-hooks/exhaustive-deps': 'warn',
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
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error'
	}
};
