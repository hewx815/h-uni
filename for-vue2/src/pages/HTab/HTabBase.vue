<!-- #region template -->
<template>
  <view class="h_tab_base">
    <HTab v-model="active">
      <HTabItem
        v-for="( item, index ) in 30"
        :key="index"
        :value="index"
        :label="`套餐${item}`"
      />
    </HTab>
    <view class="box">
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
.h_tab_base {
  display: flex;

  .box {
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
