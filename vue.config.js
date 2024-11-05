const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  // 修改 src 目录为 examples 目录
  pages: {
    index :{
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
        .rule("js")
        .include
        .add("/packages")
        .end()
        .use("babel")
        .loader("babel-loader")
        .tap(options => {
          // 修改其他的选项
          return options
        })
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}