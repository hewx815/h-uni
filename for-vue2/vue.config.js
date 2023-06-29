module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    open: true,
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
