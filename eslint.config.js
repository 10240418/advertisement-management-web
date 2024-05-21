const process = require('node:process')
const antfu = require('@antfu/eslint-config').default

// 查看应用的 eslint 规则
// npx eslint-flat-config-viewer
module.exports = antfu({
  vue: true,
  unocss: true,
  formatters: true,
  markdown: false,
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-async-promise-executor': 'off',
    'no-cond-assign': 'off',
    'array-callback-return': 'off',
    'antfu/if-newline': 'off',
    // 必须使用大括号
    'curly': ['error', 'all'],
    // else、catch、finally ... 大括号显示在同一行
    'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    // typescript
    'ts/prefer-literal-enum-member': 'off',
    // vue
    'vue/brace-style': ['error', '1tbs', { allowSingleLine: false }],
    'vue/singleline-html-element-content-newline': 'off',
  },
})
