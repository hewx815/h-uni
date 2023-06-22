<template>
  <scroll-view
    class="h_tab"
    :style="{ height, width }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    :show-scrollbar="false"
    @scroll="scroll"
  >
    <view
      class="h_tab_container"
      :class="`h_tab_container-${direction}`"
    >
      <view class="h_tab_active" />
      <slot />
    </view>
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

      itemsRect: [],
    };
  },
  watch: {
    value(newValue) {
      this.setScroll(newValue);
    },
  },
  created() {
  },
  methods: {
    setItemsRect(value, rect) {
      const index = this.itemsRect.findIndex((item) => item.value === value);
      if (index !== -1) {
        this.itemsRect[index].rect = rect;
        return;
      }
      this.itemsRect.push(rect);
    },
    itemClick(value) {
      this.$emit('input', value);
    },
    setScroll(value) {
      console.log(value);
    },
    scroll(e) {
      console.log(e);
    },
  },
};
</script>

<style lang='scss' scoped>
.h_tab {
  border-right: 2rpx solid #e5e5e5;

  ::-webkit-scrollbar {
  display: none;
}

  .h_tab_container {
    display: flex;
  }

  .h_tab_container-x {
    flex-direction: row;
  }

  .h_tab_container-y {
    flex-direction: column;
  }

  .h_tab_active{
    width: 100%;
  }
}
</style>
