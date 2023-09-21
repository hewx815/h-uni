<!-- #region template -->
<template>
  <view class="box">
    <!-- directions data -->
    <view class="data">
      HTab direction= {{ tabDirection }}
      <uni-data-checkbox
        v-model="tabDirection"
        mode="button"
        :localdata="directions"
        @change="resize"
      />
      HTabItem direction= {{ tabItemDirection }}
      <uni-data-checkbox
        v-model="tabItemDirection"
        mode="button"
        :localdata="directions"
        @change="resize"
      />
    </view>
    <!-- tab -->
    <HTab
      ref="tab"
      v-model="active"
      :direction="tabDirection"
    >
      <HTabItem
        v-for="( item, index ) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
        ref="tabItem"
        :key="index"
        :direction="tabItemDirection"
        :value="index"
        :label="`套餐${item}`"
        image="/static/logo-shadow.png"
      />
    </HTab>
  </view>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';
import { HTab } from '../../packages/components';

export default defineComponent({
  data() {
    return {
      active: 0,
      tabDirection: 'y',
      tabItemDirection: 'y',

      directions: [
        {
          value: 'y',
          text: 'y',
        },
        {
          value: 'x',
          text: 'x',
        },
      ],
    };
  },
  methods: {
    resize() {
      // tab尺寸发生变化需要重新计算tab尺寸
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (this.$refs.tab as InstanceType<typeof HTab>).resize();
    },
  },
});
</script>
<!-- #endregion script -->

<!-- #region style -->
<style lang='scss' scoped>
.box {
  .data {
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
    padding: 30rpx;
  }
}
</style>
<!-- #endregion style -->
