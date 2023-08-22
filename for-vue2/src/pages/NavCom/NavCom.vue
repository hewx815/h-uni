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

<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';

export default defineComponent({
  data() {
    return {
      list: [
        {
          title: 'HTab',
          note: '标签栏',
        },
        {
          title: 'HWaterFall',
          note: '瀑布屏',
        },
      ],
    };
  },

});
</script>

<style lang='scss' scoped></style>
