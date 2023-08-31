/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */

const { defineConfig } = require('@vue/cli-service');
const { defineConfigHuniBuild } = require('./src/packages/plugins/vue-cli-plugin-h-uni-build');

const huniBuildConfig = defineConfigHuniBuild({
  openDevTools: {
    paths: {
      'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
    },
    exitClose: true,
  },
});

module.exports = defineConfig({
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true,
  },
  transpileDependencies: ['../node_modules/@dcloudio/uni-ui'],
  pluginOptions: {
    'h-uni-build': huniBuildConfig,
  },
});
