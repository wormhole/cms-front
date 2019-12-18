const commonPlugins = [
  '@babel/plugin-proposal-object-rest-spread',
  ['import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css' // `style: true` 会加载 less 文件
  }]
];

module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env', {
        modules: false // import export 由 webpack 处理，不由 babel 处理
      }
    ]
  ],
  plugins: process.env.NODE_EMV !== 'production' ? ['react-hot-loader/babel', ...commonPlugins] : [...commonPlugins]
};
