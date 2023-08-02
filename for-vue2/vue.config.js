module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    open: true,
    host: '127.0.0.1',
  },
  pluginOptions: {
    'h-uni-build': {
      openDevTools: {
        exitClose: true,
        paths: {
          'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
          'mp-toutiao': 'D:\\dyDev\\@bytedminiprogram-ide',
          'mp-alipay': 'D:\\payDev\\小程序开发者工具',
          // 'mp-toutiao': 'E:\\bytedminiprogram-ide\\@bytedminiprogram-ide',
        },
      },
    },
  },
};
