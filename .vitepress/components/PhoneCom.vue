<template>
  <div class="phone">
    <iframe :src=""></iframe>
  </div>
</template>

<script setup>
</script>

<style lang='scss' scoped>
.dd{
width: 320px;
height: 568px;
border: 1px solid #000;
position: fixed;
margin-top: 30px;
top: var(--vp-nav-height);
right: calc((100vw - var(--vp-layout-max-width)) / 2);
}
</style>
