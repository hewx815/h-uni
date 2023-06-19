<template>
  <view>
    <HColumnTab
      v-model="value"
      :list="list"
      image
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      value: 1,
      list: [
        {
          value: 1,
          label: '人气热卖',
          src: '1',
          activeSrc: '',
        },
        {
          value: 2,
          label: '限时优惠',
          src: '1',
        },
        {
          value: 3,
          label: '单人餐',
        },
        {
          value: 4,
          label: '主食',
        },
        {
          value: 5,
          label: '甜点',
        },
        {
          value: 6,
          label: '饮品',
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

<style lang='scss' scoped>

</style>
