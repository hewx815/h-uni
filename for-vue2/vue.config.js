const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
  },
  transpileDependencies: ['../node_modules/@dcloudio/uni-ui'],
  pluginOptions: {
    'h-uni-build': {
      openDevTools: {
        paths: {
          'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
        },
        exitClose: true,
      },
    },
  },
});
