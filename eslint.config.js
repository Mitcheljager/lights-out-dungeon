import prettier from "eslint-config-prettier"
import js from "@eslint/js"
import { includeIgnoreFile } from "@eslint/compat"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import { fileURLToPath } from "node:url"
import ts from "typescript-eslint"
const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url))

export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs["flat/recommended"],
  prettier,
  ...svelte.configs["flat/prettier"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  {
    files: ["**/*.svelte"],

    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    rules: {
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "comma-spacing": ["error"],
      "comma-dangle": ["error", "never"],
      indent: ["error", 2, {
        SwitchCase: 1
      }],
      "no-trailing-spaces": ["error"],
      "space-before-function-paren": ["error", "never"],
      "no-var": ["error"],
      "prefer-const": ["error"],

      "arrow-spacing": ["error", {
        before: true,
        after: true
      }],
      "template-curly-spacing": ["error", "never"],
      "no-whitespace-before-property": ["error"],
      "block-spacing": ["error"],
      "prefer-arrow-callback": ["error"],
      "prefer-spread": ["error"],
      "no-duplicate-imports": ["error"],
      "space-before-blocks": ["error"],

      "no-console": ["warn", {
        allow: ["error"]
      }],
      "space-infix-ops": ["error"],
      "no-multiple-empty-lines": ["warn", {
        max: 1
      }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/no-unused-vars": ["error", {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }]
    }
  }
)
