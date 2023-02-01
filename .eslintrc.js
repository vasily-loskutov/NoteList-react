module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "react/prop-types": "off",
    semi: [2, "always"],
    indent: [0, 4],
    "space-before-function-paren": [
      "error",
      { anonymous: "always", named: "never" },
    ],
    "multiline-ternary": ["off"],
    quotes: [
      "error",
      "double",
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
  },
};
