<!-- #region script -->
<script lang="ts" setup>
import { ref } from 'vue';

const active = ref(1);// 当前选中项value值

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
];
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <view>
    <!-- 滑块的朝向 -->
    <uni-section
      title="滑块的朝向"
      type="line"
    >
      <view class="flex_box">
        <!-- none -->
        <HTab
          v-model="active"
          height="100px"
        >
          <HTabItem
            v-for="( item, index ) in options"
            :key="index"
            :value="item.value"
            label="none"
          />
        </HTab>

        <!-- left -->
        <HTab
          v-model="active"
          active-aspect="left"
          height="100px"
        >
          <HTabItem
            v-for="( item, index ) in options"
            :key="index"
            :value="item.value"
            label="left"
          />
        </HTab>

        <!-- right -->
        <HTab
          v-model="active"
          active-aspect="right"
          height="100px"
        >
          <HTabItem
            v-for="( item, index ) in options"
            :key="index"
            :value="item.value"
            label="right"
          />
        </HTab>
      </view>

      <!--top -->
      <HTab
        v-model="active"
        direction="x"
        active-aspect="top"
        style="margin-top: 20rpx;"
      >
        <HTabItem
          v-for="( item, index ) in options"
          :key="index"
          :value="item.value"
          label="top"
        />
      </HTab>

      <!-- bottom -->
      <HTab
        v-model="active"
        direction="x"
        active-aspect="bottom"
        style="margin-top: 20rpx;"
      >
        <HTabItem
          v-for="( item, index ) in options"
          :key="index"
          :value="item.value"
          label="bottom"
        />
      </HTab>
    </uni-section>

    <view class="flex_box">
      <uni-section
        title="设置过渡时间"
        type="line"
      >
        <!-- 设置过渡时间 -->
        <HTab
          v-model="active"
          height="200px"
          :active-duration="2000"
        >
          <HTabItem
            v-for="( item, index ) in options"
            :key="index"
            :value="item.value"
            label="过渡时间"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="设置背景颜色"
        type="line"
      >
        <!-- 设置背景颜色 -->
        <HTab
          v-model="active"
          height="200px"
          active-background-color="rgb(145, 145, 205)"
        >
          <HTabItem
            v-for="( item, index ) in options"
            :key="index"
            :value="item.value"
            label="背景颜色"
          />
        </HTab>
      </uni-section>

      <uni-section
        title="自定义样式"
        type="line"
      >
        <!-- 自定义样式 -->
        <HTab
          v-model="active"
          height="200px"
          width="130px"
          active-aspect="left"
          :active-style="{
            width: '125px',
            borderLeft: '5px solid rgb(145, 145, 205)',
            borderRadius: 0,
          }"
        >
          <HTabItem
            v-for="( item, index ) in options "
            :key="index"
            :value="item.value"
            label="自定义样式"
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
