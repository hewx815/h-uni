<template>
  <view class="h_tab_item">
    <slot />
  </view>
</template>

<script>
export default {
  inject: ['HTab'],
  props: {
    value: {
      validator: () => true,
      required: true,
    },
  },
  data() {
    return {
      rect: {},
    };
  },
  mounted() {
    this.getRect();
    console.log(this.HTab);
  },
  methods: {
    getRect() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select('.h_tab_item').boundingClientRect((data) => {
          this.rect = data;
          resolve(data);
        })
          .exec();
      });
    },
  },
};
</script>

<style lang='scss' scoped>

</style>
