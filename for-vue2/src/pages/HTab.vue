<template>
  <view>
    <HTab
      v-model="active"
      direction="y"
      :duration="300"
    >
      <HTabItem
        v-for="(item, index) in list"
        :key="index"
        :value="item.value"
        :label="item.label"
        :icon="item.src"
        :active-icon="item.activeSrc"
      />
    </HTab>
  </view>
</template>

<script>
export default {
  data() {
    return {
      active: 1,
      list: [
        {
          value: 1,
          label: '人气热卖',
          src: '/static/logo-shadow.png',
          activeSrc: '',
        },
        {
          value: 2,
          label: '限时优惠',
          src: '/static/logo-shadow.png',

        },
        {
          value: 3,
          label: '单人餐',
          src: '/static/logo-shadow.png',
        },
        {
          value: 4,
          label: '主食',
          src: '/static/logo-shadow.png',
        },
        {
          value: 5,
          label: '甜点',
          src: '/static/logo-shadow.png',
        },
        {
          value: 6,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 7,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 8,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
      ],
    };
  },
  onLoad() {

  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
