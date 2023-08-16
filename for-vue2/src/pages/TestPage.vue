<template>
  <view>
    <button @click="dd1">
      发送请求
    </button>
  </view>
</template>
<script>
export default {
  methods: {
    async dd1() {
      const request = new this.$h.Hhttp();
      // 发起get请求
      const { response } = await request.request({
        url: 'https://www.baidu.com/s',
        data: { wd: '哈哈哈' },
        timeout: 5000,
      });

      // 发起post请求
      const { response: { response1 } } = await request.request({
        url: 'https://www.baidu.com/s',
        method: 'POST',
        data: { wd: '哈哈哈' },
        timeout: 7000,
      });
      console.log(response, response1);
    },
    async dd2() {
      const { Hhttp } = this.$h;
      // 实例配置
      const baseOptions = {
        baseUrl: 'https://www.baidu.com',
      };
      // 实例化Hhttp
      const request = new Hhttp(baseOptions);
      // 也可以在实例化后配置实例属性
      request.baseTimeout = 10000;
      // 发起get请求
      const { response } = await request.get('/s', { wd: '哈哈哈' });
      // 发起post请求
      const { response: response1 } = await request.post('/s', { wd: '哈哈哈' });

      // 拿到响应数据
      console.log(response, response1);
    },
  },
};
</script>
