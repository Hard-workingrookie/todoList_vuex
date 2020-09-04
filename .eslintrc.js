module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-multi-spaces': 'warn',
    'vue/block-spacing': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-unused-vars': 'off',
    'vue/no-unused-components': 'warn',
    'vue/arrow-spacing': 'warn',
    'space-before-function-paren': 0,
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
