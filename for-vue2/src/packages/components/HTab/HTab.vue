<template>
  <scroll-view
    class="h_tab"
    :style="{ height, width }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    @scroll="scroll"
  >
    <slot />
  </scroll-view>
</template>

<script>
/**
 * @name HTab 标签栏
 * @description 支持横向和纵向的标签栏
 * @property {String} direction =['x'|'y'] 标签栏的方向  x=横向  y=纵向
 * @property {String} width tab宽度
 * @property {String} height tab高度
 * @event
 * @slot
*/
export default {
  provide() {
    return { HTab: this };
  },
  props: {
    value: {
      required: true,
      validator: () => true,
    },
    direction: {
      default: 'y',
      validator(value) {
        return ['x', 'y'].includes(value);
      },
    },
    width: {
      type: String,
      default() {
        if (this.direction === 'x') return '100vw';
        return '150rpx';
      },
    },
    height: {
      type: String,
      default() {
        if (this.direction === 'x') return '150rpx';
        return `${this.$h.sys.windowHeight - uni.upx2px(88) - this.$h.sys.safeAreaInsets.top}px`;
      },
    },
  },
  data() {
    return {
      scrollTop: 0,
      scrollLeft: 0,

      HTabItems: this.$slots.default,
    };
  },
  created() {
  },
  methods: {
    scroll(e) {
      console.log(e);
    },
  },
};
</script>

<style lang='scss' scoped></style>
