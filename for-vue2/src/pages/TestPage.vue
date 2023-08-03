<template>
  <view>
    <view
      v-for="(item, index) in 10"
      :key="item"
    >
      {{ item }}{{ index }}
    </view>
  </view>
</template>
