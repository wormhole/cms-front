module.exports = {
  root: true, // 项目根目录，不再往上一级找
  env: {
    browser: true, // 浏览器环境
    node: true // node 环境
  },
  parser: 'babel-eslint', // 需要babel转译检查
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  rules: {
    semi: ['error', 'always'], // 要分号
    quotes: ['error', 'single'] // 字符串用单引号
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
