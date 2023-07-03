<template>
  <button @click="clickBtn">预览</button>
</template>

<script setup>
import { getCurrentInstance, defineProps } from 'vue'
const props = defineProps({
  path: {
    type: String,
    required: true
  },
})
const { proxy } = getCurrentInstance()

const clickBtn = () => {
  console.log(proxy.$root.preview(props.path));
}
</script>

<style lang='scss' scoped></style>
