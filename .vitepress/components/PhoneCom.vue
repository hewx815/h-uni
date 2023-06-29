<template>
  <div class="phone dd">
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
  ::-webkit-scrollbar{display:none}

.phone {
  width: 320px;
  height: 568px;
  box-shadow: 0px 0px 10px -4px var(--color-lighter);
  border-radius: 2px;
  position: fixed;
  margin-top: 30px;
  top: var(--vp-nav-height);
  right: calc((100vw - var(--vp-layout-max-width)) / 2);
  transition: .2s;
  overflow: hidden;
  z-index: 11;
}
.phone:hover{
  box-shadow: 0px 0px 10px -2px var(--color-lighter);
}
.iframe{
  width: 333px;
  height: 568px;
  margin: 0;
  border-width: 0;
  background-color: #fff;
}
@media screen and (max-width: 1280px) {
  .phone{
    display: none;
  }
}
@media screen and (min-width: 1280px) and (max-width: 1400px) {
  .phone{
    right: 0;
  }
}
</style>
