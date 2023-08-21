<template>
  <!-- 导航列表 -->
  <uni-list>
    <uni-list-item
      v-for="( item, index ) in list "
      :key="index"
      :title="item.title"
      show-arrow
      clickable
      :to="`/pages/${item.url}`"
    />
  </uni-list>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';

export default defineComponent({
  data() {
    return {
      list: [
        {
          title: '基础用法',
          url: 'HWaterFall/HWaterFallBase',
        },
      ],
    };
  },
});
</script>
