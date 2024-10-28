import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import tailwindPlugin from 'eslint-plugin-tailwindcss'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier, // Add this to prevent conflicts with Prettier
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        React: 'readonly', // Add React to globals
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      tailwindcss: tailwindPlugin, // Add Tailwind plugin
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      'import/resolver': {
        typescript: {}, // This helps ESLint resolve TypeScript imports
      },
    },
    rules: {
      // Add these Tailwind-specific rules
      'tailwindcss/classnames-order': 'error', // Enforce classes order
      'tailwindcss/no-arbitrary-value': 'warn', // Warn about arbitrary values
      'tailwindcss/no-custom-classname': 'warn', // Warn about custom classes

      // Add more specific import rules
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-anonymous-default-export': 'warn',

      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // React rules
      'react/react-in-jsx-scope': 'off', // Vite use React 17+, this will prevent that error
      'react/prop-types': 'off', // Not needed with TypeScript
      'react/jsx-no-target-blank': 'error', // Require rel="noreferrer" with target="_blank", 'noopener' is implicitly
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' }, // Prevent unnecessary curly braces in JSX
      ],
      'react/no-array-index-key': 'warn', // Warn about using array index as key

      // React Hooks Rules
      'react-hooks/rules-of-hooks': 'error', // Enforce hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Check effect dependencies

      // Typescripr tules
      '@typescript-eslint/explicit-function-return-type': ['error'],
      '@typescript-eslint/explicit-module-boundary-types': 'error', // Force all functions to have a return type
      '@typescript-eslint/no-unused-vars': [
        // Warn on unused variables
        'warn',
        {
          argsIgnorePattern: '^_', // Ignores function parameters starting with underscore
          varsIgnorePattern: '^_', // Ignores variables starting with underscore
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // Warn when using 'any' type
      '@typescript-eslint/consistent-type-imports': [
        // Enfore use 'type' when importing types
        'error',
        { prefer: 'type-imports' }, // Enforce using type imports
      ],
      '@typescript-eslint/no-empty-interface': 'warn', // Warn on empty interfaces
      '@typescript-eslint/no-inferrable-types': 'error', // Prevent unnecessary type annotations

      // Import Rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // Installed dependencies
            'internal', // Internal modules
            ['parent', 'sibling'], // Parent and sibling directories
            'index', // Index file
            'object', // Object-imports
            'type', // Type imports
          ],
          'newlines-between': 'always', // New line between import groups
          alphabetize: {
            order: 'asc', // Alphabetical ordering
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error', // Prevent duplicate imports
      'import/no-unresolved': 'error', // Ensure imports point to existing files
      'import/no-cycle': 'error', // Prevent circular dependencies

      // General rules
      'prefer-const': 'error', // Use const when variable is never reassigned
      'no-unused-expressions': 'error',
      'no-var': 'error',
      'prefer-template': 'error', // Prefer template literals over string concatenation

      // Accessibility rules
      'jsx-a11y/alt-text': 'error', // Require alt text for images
      'jsx-a11y/no-noninteractive-element-interactions': 'error', // Prevent interaction handlers on non-interactive elements
    },
  }
)
