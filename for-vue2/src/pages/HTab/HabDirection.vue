<!-- #region template -->
<template>
  <view class="h_tab_direction">
    <!-- directions data -->
    <view class="data">
      HTab direction= {{ tabDirection }}
      <uni-data-checkbox
        v-model="tabDirection"
        :localdata="directions"
      />
      HTabItem direction= {{ tabItemDirection }}
      <uni-data-checkbox
        v-model="tabItemDirection"
        :localdata="directions"
      />
    </view>
    <!-- tab -->
    <HTab
      v-model="active"
      :direction="tabDirection"
    >
      <HTabItem
        v-for="( item, index ) in list"
        :key="index"
        :direction="tabItemDirection"
        :value="item.value"
        :label="item.label"
        :icon="item.icon"
      />
    </HTab>
  </view>
</template>
<!-- #endregion template -->

<!-- #region script -->
<script>
export default {
  data() {
    return {
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

      active: 1,
      list: [
        {
          value: 1,
          label: '人气热卖',
        },
        {
          value: 2,
          label: '限时优惠',
        },
        {
          value: 3,
          label: '单人餐',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 4,
          label: '主食',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 5,
          label: '甜点',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 6,
          label: '饮品',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 7,
          label: '小吃',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 8,
          label: '小吃1',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 9,
          label: '小吃2',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 10,
          label: '小吃3',
          icon: '/static/logo-shadow.png',
        },
      ],
    };
  },
};
</script>
<!-- #endregion script -->

<!-- #region style -->
<style lang='scss' scoped>
.h_tab_direction {
  .data {
    position: absolute;
    bottom: 30rpx;
    right: 30rpx;
    padding: 30rpx;
  }
}
</style>
<!-- #endregion style -->
