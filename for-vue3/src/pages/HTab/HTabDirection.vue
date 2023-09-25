<!-- #region script -->
<script setup lang="ts">
import { ref } from 'vue';
import type { HTab } from '@/packages/index';

const active = ref(1); // 当前选中项value值
const tabDirection = ref<'x' | 'y'>('y'); // tab 方向
const tabItemDirection = ref<'x' | 'y'>('y'); // tabItem 方向

// tab尺寸发生变化需要调用方法`resize`重新计算tab尺寸
const tab = ref<InstanceType<typeof HTab> | null>(null);
const resize = () => {
  tab.value?.resize();
};

const directions = [ // 选择器数据
  { value: 'y', text: 'y' },
  { value: 'x', text: 'x' },
];

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
        v-for="( item, index ) in options"
        ref="tabItem"
        :key="index"
        :direction="tabItemDirection"
        :value="item.value"
        :label="item.label"
        image="/static/logo-shadow.png"
      />
    </HTab>
  </view>
</template>
<!-- #endregion template -->

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
