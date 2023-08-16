<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  dd: {
    type: Number,
    default: 0,
  },
});

</script>

<template>
  {{ props.modelValue }} {{ props.dd }}
</template>

<style lang='scss' scoped></style>
