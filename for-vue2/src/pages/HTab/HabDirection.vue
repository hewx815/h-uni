<template>
  <HTab
    v-model="active"
    direction="y"
  >
    <HTabItem
      v-for="( item, index ) in list"
      :key="index"
      direction="x"
      :value="item.value"
      :label="item.label"
      :icon="item.icon"
    />
  </HTab>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
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

<style lang='scss' scoped></style>
