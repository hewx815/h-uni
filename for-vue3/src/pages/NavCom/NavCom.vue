<script lang="ts" setup>
const list = [
  {
    title: 'HButton',
    note: '按钮',
  },
  {
    title: 'HTab',
    note: '标签栏',
  },
];
</script>

<template>
  <view>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :note="item.note"
        show-arrow
        clickable
        :to="`/pages/${item.title}/${item.title}`"
      />
    </uni-list>
  </view>
</template>
