<!-- #region script -->
<script lang="ts" setup>
import { ref } from 'vue';

const active0 = ref(1);
const active1 = ref(1);
const active2 = ref(1);
const active3 = ref(1);
const active4 = ref(1);

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
  <view>
    <uni-section
      title="选项卡样式"
      type="line"
    >
      <HTab
        ref="HTab"
        v-model="active0"
        direction="x"
      >
        <HTabItem
          v-for="(item, index) in options"
          :key="index"
          :value="item.value"
          :label="item.label"
          image="/static/logo-shadow.png"
          :styles="{
            transform: 'rotateZ(0deg)',
          }"
          :active-style="{
            transition: '.5s',
            transform: 'rotateZ(360deg)',
          }"
        />
      </HTab>
    </uni-section>

    <view class="flex_box">
      <uni-section
        title="文本样式"
        type="line"
      >
        <HTab v-model="active1">
          <HTabItem
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            :label="item.label"
            image="/static/logo-shadow.png"
            :label-style="{
              transform: 'rotateZ(0deg)',
            }"
            :active-label-style="{
              transition: '.5s',
              transform: 'rotateZ(360deg)',
            }"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="图片样式"
        type="line"
      >
        <HTab v-model="active2">
          <HTabItem
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            :label="item.label"
            image="/static/logo-shadow.png"
            :image-style="{
              transform: 'rotateZ(0deg)',
            }"
            :active-image-style="{
              transition: '.5s',
              transform: 'rotateZ(360deg)',
            }"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="更改文本"
        type="line"
      >
        <HTab v-model="active3">
          <HTabItem
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            :label="item.label"
            image="/static/logo-shadow.png"
            active-label="选中项"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="更改图片"
        type="line"
      >
        <HTab v-model="active4">
          <HTabItem
            v-for="(item, index) in options"
            :key="index"
            :value="item.value"
            :label="item.label"
            image="/static/logo-colourless.png"
            active-image="/static/logo-shadow.png"
          />
        </HTab>
      </uni-section>
    </view>
  </view>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style lang='scss' scoped>
.flex_box {
  display: flex;
  justify-content: space-between;
}
</style>
<!-- #endregion style -->
