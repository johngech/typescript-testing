export default {
  // Use single quotes instead of double quotes
  singleQuote: false,

  // Use semicolons at the end of statements
  semi: true,

  // Print width (lines longer than this will be wrapped)
  printWidth: 79,

  // Number of spaces per indentation level
  tabWidth: 2,

  // Use spaces for indentation (not tabs)
  useTabs: false,

  // Print trailing commas wherever possible (ES5-compatible)
  trailingComma: "es5",

  // Print spaces between brackets in object literals
  bracketSpacing: true,

  // Put > on the last line of multi-line JSX elements (deprecated, use bracketSameLine)
  bracketSameLine: false,

  // Format single quotes in JSX
  jsxSingleQuote: false,

  // No spaces between parentheses in function calls
  arrowParens: "always",

  // End files with a single newline
  endOfLine: "lf",

  // Don't require quotes around object keys when they are safe
  quoteProps: "as-needed",

  // Override settings for specific files
  overrides: [
    {
      files: "*.{js,ts,tsx,jsx}",
      options: {},
    },
  ],

  // Plugins (add if needed, e.g., prettier-plugin-tailwindcss)
  // plugins: [],
};
