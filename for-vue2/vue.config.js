module.exports = {
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
      setMode: [
        {
          name: '模式1',
          env: {
            APP_MODE: '"模式1"',
          },
          manifestJson: '',
          pagesJson: {
            globalStyle: {
              navigationBarBackgroundColor: '#999',
            },
          },
        },
      ],
    },
  },
};
