<template>
  <div class="phone">
    <iframe :src="src" class="iframe"></iframe>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
console.log();
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

const src = computed(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : "http://localhost:8080/#/pages/"
  return baseUrl + props.name
})

</script>

<style scoped>
.phone {
  width: 320px;
  height: 568px;
  box-shadow: 0px 0px 10px -4px var(--color-lighter);
  border-radius: 4px;
  overflow: hidden;
  position: fixed;
  margin-top: 30px;
  top: var(--vp-nav-height);
  right: calc((100vw - var(--vp-layout-max-width)) / 2);
  transition: .3s;
}
.phone:hover{
  box-shadow: 0px 0px 10px -4px var(--color);
}
.iframe{
  width: 320px;
  height: 568px;
  margin: 0;
  border-width: 0;
}
</style>
