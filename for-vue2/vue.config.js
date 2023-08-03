module.exports = {
  transpileDependencies: ['@dcloudio/uni-ui'],
  devServer: {
    open: true,
    host: '127.0.0.1',
  },
  pluginOptions: {
    'h-uni-build': {
      delOldFile: true,
      openDevTools: {
        // exitClose: true,
        paths: {
          'mp-weixin': 'D:\\wechatDev\\微信web开发者工具',
          'mp-toutiao': 'D:\\dyDev\\@bytedminiprogram-ide',
          // 'mp-toutiao': 'E:\\bytedminiprogram-ide\\@bytedminiprogram-ide',
          'mp-alipay': 'D:\\payDev\\小程序开发者工具',
          'mp-baidu': 'D:\\baiduDev\\swan-ide-gui',
          'mp-lark': 'C:\\Users\\admin\\AppData\\Local\\Programs\\opdev-ide',
        },
      },
    },
  },
};
