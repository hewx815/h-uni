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
    const request = new this.$h.Hhttp({ data: { dd: 1 } });
    console.log(request);
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
