<template>
  <view>
    <HButton>1</HButton>
  </view>
</template>

<script>

export default {
  data() {
    return {
      url: 'http://hewxing.cn:8000/api/test/helloWorld',
    };
  },
  async onLoad() {
    const request = new this.$h.Hhttp({
      baseUrl: 'http://hewxing.cn:8000/api/',
    });
    request.interceptor.request = (config) => config;
    request.interceptor.response = (res) => {
      console.log(res);
      return res;
    };
    await request.get('test/helloWorld');

    try {
      const data = await request.get('test/helloWorld');
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
