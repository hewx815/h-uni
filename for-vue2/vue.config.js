module.exports = {
  pluginOptions: {
    'h-uni-build': {
      openDevTools: {
        paths: {
          'mp-weixin': 'E:\\微信web开发者工具',
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
              navigationBarBackgroundColor: '#00000',
            },
          },
        },
      ],
    },
  },
};
