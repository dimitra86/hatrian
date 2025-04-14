import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";


/** @type {import('eslint').Linter.Config[]} */
export default [
  globalIgnores([
		"dist/**/*", // ignore all contents in and under `build/` directory but not the `build/` directory itself
		"!dist/test.js",
    "webpack.config.js", // unignore `!build/test.js`
	]),
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
