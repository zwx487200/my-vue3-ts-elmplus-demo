const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  configureWebpack: {
    devtool: 'source-map'
  },

  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  },

  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8081,  // 此前端项目的端口号
    open: true,  //表示在启动开发服务器时，会自动打开浏览器并访问指定的地址
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', //接口域名
        changeOrigin: true,       //是否跨域
        ws: true,            //是否代理 websockets
        secure: false,          //是否https接口
        pathRewrite: {
          '^/api': ''  //假如我们的地址是 /api/member/getToken 会转化为 /member/getToken
        }
      }
    }
  }
})