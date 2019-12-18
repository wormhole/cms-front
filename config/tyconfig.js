const path = require('path')

module.exports = {
  entry: {
    web: {
      // 键名是打包后的js名字，入口文件，可以是多个入口，所以是个数组
      bundle: [path.join(__dirname, '../src/index.jsx')]
    }
  },
  output: {
    // web 是指 web 构建目标
    web: path.join(__dirname, '../dist')
  },
  contentBase: path.join(__dirname, '../dist'),
  devServerHost: 'localhost',
  devServerPort: 3000,
  devServerOpenBrowser: true,
  proxy: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/' 
      }
    }
  }
}
