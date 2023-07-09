<!-- #region template -->
<template>
  <view class="h_tab_base">
    <HTab v-model="active">
      <HTabItem
        v-for="( item, index ) in list"
        :key="index"
        :value="item.value"
        :label="item.label"
        :icon="item.icon"
      />
    </HTab>
    <view class="box">
      {{ list.find((item) => item.value === active).label }}
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
      list: [
        {
          value: 1,
          label: '人气热卖',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 2,
          label: '限时优惠',
          icon: '/static/logo-shadow.png',
        },
        {
          value: 3,
          label: '单人餐',
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
