<template>
  <view>
    {{ num }}
  </view>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    toJSON() { return this; },
  },
};
</script>
