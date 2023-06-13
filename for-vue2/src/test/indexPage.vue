<template>
  <view class="box">
    <h-column-tab
      v-model="active"
      :list="list"
      image
      :item-style="{width:'200rpx'}"
    />
  </view>
</template>

<script>
import logo from '@/static/logo.png';
import dd from '@/static/dd.png';

// eslint-disable-next-line import/no-unresolved
export default {
  data() {
    return {
      list: [],
      active: 1,
    };
  },
  onLoad() {
    const arr = [];
    for (let index = 0; index <= 10; index += 1) {
      arr.push({
        value: index,
        label: `选项${index}`,
        src: logo,
        activeSrc: dd,
        image: index < 6,
      });
    }
    this.list = arr;
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.box{

}
</style>
