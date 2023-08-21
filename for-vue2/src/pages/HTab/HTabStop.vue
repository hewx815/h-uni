<!-- #region template -->
<template>
  <view class="flex_box">
    <uni-section
      title="关闭滚动动画"
      type="line"
    >
      <HTab
        v-model="active"
        :scroll-animation="false"
      >
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
        />
      </HTab>
    </uni-section>

    <uni-section
      title="关闭滑块动画"
      type="line"
    >
      <HTab
        v-model="active"
        :active-animation="false"
      >
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
        />
      </HTab>
    </uni-section>

    <uni-section
      title="关闭自动滚动"
      type="line"
    >
      <HTab
        v-model="active"
        :scroll-center="false"
      >
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
        />
      </HTab>
    </uni-section>

    <uni-section
      title="关闭滑块"
      type="line"
    >
      <HTab
        v-model="active"
        :show-active="false"
      >
        <!-- 关闭滑块后无法区分当前选中项，可通过 `activeStyle` 设置选中项样式 -->
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
          :active-style="{
            backgroundColor: 'rgb(145, 145, 205)'
          }"
        />
      </HTab>
    </uni-section>
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
.flex_box {
  display: flex;
  justify-content: space-between;
}
</style>
<!-- #endregion style -->
