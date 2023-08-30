<template>
  <view>
    <swiper />
    <div :class="[]" />
  </view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';
// eslint-disable-next-line import/extensions
import { type movableView } from '@/packages/utils/TypeHelper';

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      dd: 1,
    };
  },
  created() { },
  methods: {
    change(e: Parameters<movableView['events']['scale']>[0]) {
      e.x = 1;
    },
  },
});
</script>

<style lang='scss' scoped></style>
