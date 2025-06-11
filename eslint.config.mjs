import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];


// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     files: ['**/*.{ts,tsx,js,jsx}'],
//     plugins: {
//       'simple-import-sort': simpleImportSort,
//       'unused-imports': unusedImports,
//     },
//     rules: {
//       'simple-import-sort/imports': 'warn',
//       'simple-import-sort/exports': 'warn',
//       'unused-imports/no-unused-imports': 'error',
//       'unused-imports/no-unused-vars': [
//         'warn',
//         { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
//       ],
//     },
//   },
// ];

export default eslintConfig;
