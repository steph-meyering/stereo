import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "app/assets/javascripts/**"],
  },
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    files: ["frontend/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.jest,
        // CommonJS globals for mixed-module files
        require: "readonly",
        module: "readonly",
        exports: "readonly",
        // jQuery is injected via Sprockets
        $: "readonly",
        process: "readonly",
        // 404.jsx animation code references `global` (bundled by webpack)
        global: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "react/prop-types": "off",
      // React 16 uses some deprecated APIs; downgraded from error to warn
      "react/no-deprecated": "warn",
      "no-case-declarations": "off",
      // Pre-existing double-negation patterns; downgraded to warn
      "no-extra-boolean-cast": "warn",
      // Pre-existing unescaped entities in JSX; downgraded to warn
      "react/no-unescaped-entities": "warn",
      // Pre-existing target="_blank" without rel; downgraded to warn
      "react/jsx-no-target-blank": "warn",
    },
  },
];
