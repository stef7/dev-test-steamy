/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["next/core-web-vitals", "plugin:eslint-comments/recommended"],
  rules: {
    "eslint-comments/no-unused-disable": "error",
    "eslint-comments/require-description": "error",
    "no-process-env": "error",
  },
};

module.exports = config;
