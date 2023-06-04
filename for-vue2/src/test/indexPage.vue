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
    console.log(process.env);
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
