<!-- #region template -->
<template>
  <view>
    <uni-section
      title="选项卡样式"
      type="line"
    >
      <HTab
        ref="HTab"
        v-model="active0"
        direction="x"
      >
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
          image="/static/logo-shadow.png"
          :styles="{
            transform: 'rotateZ(0deg)',
          }"
          :active-style="{
            transition: '.5s',
            transform: 'rotateZ(360deg)',
          }"
        />
      </HTab>
    </uni-section>

    <view class="flex_box">
      <uni-section
        title="文本样式"
        type="line"
      >
        <HTab v-model="active1">
          <HTabItem
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="index"
            :value="index"
            :label="`选项${item}`"
            image="/static/logo-shadow.png"
            :label-style="{
              transform: 'rotateZ(0deg)',
            }"
            :active-label-style="{
              transition: '.5s',
              transform: 'rotateZ(360deg)',
            }"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="图片样式"
        type="line"
      >
        <HTab v-model="active2">
          <HTabItem
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="index"
            :value="index"
            :label="`选项${item}`"
            image="/static/logo-shadow.png"
            :image-style="{
              transform: 'rotateZ(0deg)',
            }"
            :active-image-style="{
              transition: '.5s',
              transform: 'rotateZ(360deg)',
            }"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="更改文本"
        type="line"
      >
        <HTab v-model="active3">
          <HTabItem
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="index"
            :value="index"
            :label="`选项${item}`"
            image="/static/logo-shadow.png"
            active-label="选中项"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="更改图片"
        type="line"
      >
        <HTab v-model="active4">
          <HTabItem
            v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
            :key="index"
            :value="index"
            :label="`选项${item}`"
            image="/static/logo-colourless.png"
            active-image="/static/logo-shadow.png"
          />
        </HTab>
      </uni-section>
    </view>
  </view>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script>
export default {
  data() {
    return {
      active0: 0,
      active1: 0,
      active2: 1,
      active3: 2,
      active4: 3,
    };
  },
  mounted() {
    /**
     * 在小程序中：首次获取尺寸时由于第一个选项卡设置了:
     * active-style="{
     *       transition: '.5s',
     *       transform: 'rotateZ(360deg)',
     *   }"
     * 导致获取尺寸异常,需要等待旋转结束后重新计算尺寸
     */
    setTimeout(() => {
      this.$refs.HTab.resize();
    }, 500);
  },
};
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
