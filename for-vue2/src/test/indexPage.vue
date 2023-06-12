<template>
  <view class="box">
    <HColumnTab
      v-model="active"
      :list="list"
    />
  </view>
</template>

<script>

// eslint-disable-next-line import/no-unresolved
import HColumnTab from '@/packages/components/HColumnTab/HColumnTab.vue';

export default {
  components: { HColumnTab },
  data() {
    return {
      list: [
        {
          value: 1,
          label: '选项1',
        },
        {
          value: 2,
          label: '选项2',
        },
        {
          value: 3,
          label: '选项3',
        },
        {
          value: 4,
          label: '选项3',
        },
        {
          value: 5,
          label: '选项3',
        },
        {
          value: 6,
          label: '选项3',
        },
        {
          value: 7,
          label: '选项3',
        },
        {
          value: 8,
          label: '选项3',
        },
        {
          value: 9,
          label: '选项3',
        },
        {
          value: 10,
          label: '选项3',
        },
        {
          value: 11,
          label: '选项3',
        },
        {
          value: 12,
          label: '选项3',
        },

      ],
      active: 1,
    };
  },
  onLoad() {
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.box{
  width: 150rpx;
  height: 100vh;
  margin-top: 20rpx;
}
</style>
