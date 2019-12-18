const path = require('path');

module.exports = {
  entry: {
    web: {
      // 键名是打包后的js名字，入口文件，可以是多个入口，所以是个数组
      // 如果是绝对路径或以.开头的路径（相对于项目根目录），不存在会自动生成
      // 如果不是以.开头的相对路径，ty会认为它是node_modules里的包，不会自动生成
      // 如果想禁用自动生成功能，放开下面的 generate: 0 注释
      // 开发环境下在最前面导入 react-hot-loader 包
      bundle: [
        ...(process.env.NODE_ENV === 'production' ? [] : ['react-hot-loader/patch']),
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
  // generate: 0, // 不要强制生成缺失的文件
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
