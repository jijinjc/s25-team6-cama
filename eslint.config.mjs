import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

// ESLint configuration
//
// Customize this file in consultation with the rest of your team to ensure that
// your team's JavaScript style is followed by everyone. See the ESLint
// documentation for more information: https://eslint.org/docs/latest/use/configure/


export default defineConfig([{
    extends: compat.extends("eslint:recommended"),

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        ecmaVersion: "latest",
        sourceType: "module",
    },

    rules: {
        camelcase: ["error"],
        "comma-dangle": ["error", "always-multiline"],

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "no-trailing-spaces": ["error"],

        "no-use-before-define": ["error", {
            allowNamedExports: true,
        }],

        "no-var": ["error"],
        "object-curly-spacing": ["error", "always"],

        semi: ["error", "always", {
            omitLastInOneLineBlock: true,
        }],
    },
}]);