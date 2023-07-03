<template></template>

<script setup>
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
console.log(proxy.$root.PhoneCom.path)

</script>

<style lang='scss' scoped></style>
