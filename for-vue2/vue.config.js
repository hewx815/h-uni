module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    open: true,
    host: '127.0.0.1',
  },
  pluginOptions: {
    'h-uni-build': {
      openDevTools: {
        paths: {
          'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
        },
      },
    },
  },
};
