module.exports = {
	env: {
		browser: true,
		node: true,
		es2021: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"no-use-before-define": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"react/prop-types": "off"
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
