<!-- #region template -->
<template>
  <view class="box">
    <HTab v-model="active">
      <HTabItem
        v-for="( item, index ) in 30"
        :key="index"
        :value="item"
        :label="`套餐${item}`"
      />
    </HTab>
    <view class="container">
      套餐 {{ active + 1 }}
    </view>
  </view>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script>
export default {
  data() {
    return {
      active: 1,
    };
  },
};
</script>
<!-- #endregion script -->

<!-- #region style -->
<style lang='scss' scoped>
.box {
  display: flex;

  .container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bolder;
    font-size: 100rpx;
  }
}
</style>
<!-- #endregion style -->
