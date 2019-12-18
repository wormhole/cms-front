const path = require('path');

module.exports = {
  entry: {
    web: {
      // 键名是打包后的js名字，入口文件，可以是多个入口，所以是个数组，路径必须是绝对路径
      // 开发时在最前面导入 react-hot-loader
      bundle: [
        ...(process.env.NODE_ENV === 'production' ? [] : [path.join(__dirname, '../node_modules/react-hot-loader/patch')]),
        path.join(__dirname, '../src/index.jsx')
      ]
    }
  },
  output: {
    // web 是指 web 构建目标
    web: path.join(__dirname, '../dist')
  },
  contentBase: path.join(__dirname, '../dist'),
  devServerHost: 'localhost',
  devServerPort: 3000,
  devServerOpenBrowser: true, // 启动本地开发服务器时打开浏览器
  generate: 0, // 不要强制生成缺失的文件
  proxy: {
    '/api': {
      target: 'http://localhost',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/' 
      }
    }
  }
};
