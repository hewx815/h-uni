<template>
  <div to="body">1</div>
  <!-- <div class="phone dd">
    <iframe
      :src="src"
      class="iframe"
      scrolling="no"
    ></iframe>
  </div> -->
</template>

<script setup>
import { defineProps, computed, getCurrentInstance } from 'vue';
const props = defineProps({
  path: {
    type: String,
    required: true
  },
})

const src = computed(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : "http://localhost:8080/#/"
  return baseUrl + props.path
})

const preview = (url) => {

}

// 挂载组件到根组件上，便于 PhonePreview 组件 之间的通信
const { proxy } = getCurrentInstance()
proxy.$root.PhoneCom = proxy

</script>

<style scoped>
::-webkit-scrollbar {
  display: none
}

.phone {
  width: 365px;
  height: 667px;
  box-shadow: 0px 0px 10px -4px var(--color-lighter);
  border-radius: 2px;
  position: fixed;
  margin-top: 30px;
  top: var(--vp-nav-height);
  right: calc((100vw - var(--vp-layout-max-width)) / 4);
  transition: .2s;
  overflow: hidden;
  z-index: 11;
}

.phone:hover {
  box-shadow: 0px 0px 10px -2px var(--color-lighter);
}

.iframe {
  width: 365px;
  height: 667px;
  margin: 0;
  border-width: 0;
  background-color: #fff;
}

@media screen and (max-width: 1280px) {
  .phone {
    display: none;
  }
}

@media screen and (min-width: 1280px) and (max-width: 1400px) {
  .phone {
    right: 0;
  }
}
</style>
