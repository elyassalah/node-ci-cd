module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  // extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  rules: {
    // '@typescript-eslint/indent': ['error', 2],
    "@typescript-eslint/semi": ["error", "always"],
    // '@typescript-eslint/quotes': ['error', 'single'],
    // Add any other rules you want to customize
  },
};
// here write all specific rule you need to make it as a restrict on all code that typed in this project
// and can use specific group role such eslint recommended or typescript as well , by using scripts to check it and run it
//also use in as restricts on git push,comet as well
//and we use husky with hooks for doing something before such pre-comet we need to check something its done good so use with pre-comet
//some lint-staged it will go to lint staged and doing some script to ensure everything okay
