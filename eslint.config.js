// Import ESLint modules
const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const prettier = require("eslint-plugin-prettier");
const babelParser = require("@babel/eslint-parser");

module.exports = [
  js.configs.recommended,
  {
    extends: ["react-app"],
    plugins: {
      react,
      prettier,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        module: "readonly",
        require: "readonly",
        test: "readonly",
        expect: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
    // Correctly ignore `.history` and other unwanted files or folders
    ignores: [
      ".history/**", // Ignore all files in the `.history` directory
      "node_modules/**", // (Optional) Ignore node_modules, if needed
    ],
  },
];
