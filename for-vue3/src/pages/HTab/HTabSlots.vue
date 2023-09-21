<!-- #region script -->
<script lang="ts" setup>
import { ref } from 'vue';

const active0 = ref(1);
const active1 = ref(1);
const active2 = ref(1);
</script>
<!-- #endregion script -->

<!-- #region template -->
<template>
  <view class="flex_box">
    <uni-section
      title="HTab插槽"
      type="line"
    >
      <HTab v-model="active0">
        <view class="title">
          套餐
        </view>
        <HTabItem
          :value="1"
          image="/static/logo-shadow.png"
          label="单人餐"
        />
        <HTabItem
          :value="2"
          image="/static/logo-shadow.png"
          label="双人餐"
        />
        <view class="title">
          主食
        </view>
        <HTabItem
          :value="3"
          image="/static/logo-shadow.png"
          label="米饭"
        />
        <HTabItem
          :value="4"
          image="/static/logo-shadow.png"
          label="馒头"
        />
        <view class="title">
          饮品
        </view>
        <HTabItem
          :value="5"
          image="/static/logo-shadow.png"
          label="雷碧"
        />
        <HTabItem
          :value="6"
          image="/static/logo-shadow.png"
          label="勇闯天堂"
        />
      </HTab>
    </uni-section>

    <uni-section
      title="HTab-active插槽"
      type="line"
    >
      <HTab
        v-model="active1"
        width="125px"
      >
        <template #active>
          <view class="active" />
        </template>
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
          :label="`选项${item}`"
          :label-style="{
            fontWeight: 'bold'
          }"
        />
      </HTab>
    </uni-section>

    <uni-section
      title="HTabItem插槽"
      type="line"
    >
      <HTab v-model="active2">
        <HTabItem
          v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
          :key="index"
          :value="index"
        >
          <view>item:{{ item }}</view>
          <view>index:{{ index }}</view>
        </HTabItem>
      </HTab>
    </uni-section>
  </view>
</template>
<!-- #endregion template -->

<!-- #region style -->
<style lang='scss' scoped>
.flex_box {
  display: flex;
  justify-content: space-between;
}

.title {
  width: 100%;
  height: 60rpx;
  text-align: center;
  color: rgb(95, 95, 205);
  font-weight: bolder;
  border-top: 4px solid rgb(95, 95, 205);
}

.active {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(135deg,
      rgb(95, 95, 205) 0,
      rgb(95, 95, 205) 4px,
      rgb(145, 145, 205) 4px,
      rgb(145, 145, 205) 8px,
      rgb(145, 145, 205) 8px,
    );
}
</style>
<!-- #endregion style -->
