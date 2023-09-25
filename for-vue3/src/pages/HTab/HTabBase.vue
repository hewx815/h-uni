<!-- #region script -->
<script setup lang="ts">
import { ref } from 'vue';

const active = ref(1); // 当前选中项value值

const options = [ // 数据列表
  { value: 1, label: '选项1' },
  { value: 2, label: '选项2' },
  { value: 3, label: '选项3' },
  { value: 4, label: '选项4' },
  { value: 5, label: '选项5' },
  { value: 6, label: '选项6' },
  { value: 7, label: '选项7' },
  { value: 8, label: '选项8' },
  { value: 9, label: '选项9' },
  { value: 10, label: '选项10' },
  { value: 11, label: '选项11' },
  { value: 12, label: '选项12' },
  { value: 13, label: '选项13' },
  { value: 14, label: '选项14' },
  { value: 15, label: '选项15' },
  { value: 16, label: '选项16' },
  { value: 17, label: '选项17' },
  { value: 18, label: '选项18' },
  { value: 19, label: '选项19' },
  { value: 20, label: '选项20' },
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <view class="box">
    <HTab v-model="active">
      <HTabItem
        v-for="( item, index ) in options"
        :key="index"
        :value="item.value"
        :label="item.label"
      />
    </HTab>
    <view class="container">
      {{ options.find(item => item.value === active)?.label }}
    </view>
  </view>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style lang='scss' scoped>
.box {
  display: flex;

  .container {
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
