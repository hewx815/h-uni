<!-- #region template -->
<template>
  <view class="box">
    <HTab direction="x">
      <HTabItem
        v-for="( item, index ) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
        :key="index"
        :value="index"
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
<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';

export default defineComponent({
  data() {
    return {
      active: 0,
    };
  },
});
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
