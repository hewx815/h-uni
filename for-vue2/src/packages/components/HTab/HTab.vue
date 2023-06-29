<template>
  <scroll-view
    class="h_tab"
    :style="{ height: scrollHeight, width: scrollWidth }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    :show-scrollbar="false"
    @scroll="scroll"
  >
    <view
      class="h_tab_active"
      :style="activeStyles"
    >
      <view class="h_tab_active_clip h_tab_active_clip_top" />
      <view class="h_tab_active_clip h_tab_active_clip_bottom" />
    </view>
    <view
      class="h_tab_container"
      :class="{
        'h_tab_container-x': direction === 'x',
        'h_tab_container-y': direction === 'y',
      }"
    >
      <slot />
    </view>
  </scroll-view>
</template>

<script>
/**
 * @name HTab 标签栏
 * @description 支持横向和纵向的标签栏
 * @property {Any} value 选中的值
 * @property {String} direction =['x'|'y'] 标签栏的方向  x=横向  y=纵向
 * @property {String} width tab宽度
 * @property {String} height tab高度
 * @property {Number} duration active元素的动画时间
 * @property {Number} duration active元素的动画时间
 * @event input .
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
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    duration: {
      type: Number,
      default: 500,
    },
    activeStyle: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      viewScrollTop: 0,

      scrollTop: 0,
      scrollLeft: 0,

      activeTop: 0,
      activeLeft: 0,

      itemsRect: [],
    };
  },
  computed: {
    // scroll-view 宽
    scrollWidth() {
      if (this.width) return this.width;
      return this.direction === 'x' ? '100vw' : '150rpx';
    },

    // scroll-view 高
    scrollHeight() {
      if (this.height) return this.height;
      return this.direction === 'x' ? '150rpx' : `${this.$h.sys.screenHeight - uni.upx2px(88) - this.$h.sys.safeAreaInsets.top}px`;
    },

    // 选中元素宽
    activeWidth() {
      const item = this.itemsRect.find((rect) => rect.value === this.value);
      return item ? item.right - item.left : 0;
    },

    // 选中元素高
    activeHeight() {
      const item = this.itemsRect.find((rect) => rect.value === this.value);
      return item ? item.bottom - item.top : 0;
    },

    // 选中元素样式
    activeStyles() {
      return this.$h.cssConverter({
        width: `${this.activeWidth}px`,
        height: `${this.activeHeight}px`,
        top: `${this.activeTop}px`,
        left: `${this.activeLeft}px`,
        transition: `${this.duration / 1000}s`,
        ...this.$h.cssConverter(this.activeStyle, 'object'),
      }, 'string');
    },
  },
  watch: {
    value(newValue) {
      const index = this.itemsRect.findIndex((item) => item.value === newValue);
      this.setScroll(index);
      this.setActive(index);
    },
  },
  mounted() {
  },
  methods: {
    setItemsRect(value, rect) {
      const index = this.itemsRect.findIndex((item) => item.value === value);
      if (index !== -1) {
        this.itemsRect[index].rect = rect;
        return;
      }
      this.itemsRect.push({ ...rect, value });
    },
    itemClick(value) {
      this.$emit('input', value);
    },
    setScroll(index) {
      // console.log(index);
    },
    setActive(index) {
      this.activeTop = this.itemsRect[index].top;
    },
    scroll(e) {
      this.viewScrollTop = e.detail.scrollTop;
    },
  },
};
</script>

<style lang='scss' scoped>
.h_tab {
  background-color: #ececec;

  ::-webkit-scrollbar {
    display: none;
  }

  .h_tab_container {
    display: flex;
    position: absolute;
  }

  .h_tab_container-x {
    flex-direction: row;
  }

  .h_tab_container-y {
    flex-direction: column;
  }

  .h_tab_active {
    width: 100%;
    position: absolute;
    background-color: #fff;
    border-radius: 20rpx 0 0 20rpx;
    top: 101px;

    .h_tab_active_clip {
      display: block;
      position: absolute;
      background-color: #fff;
      width: 20rpx;
      height: 20rpx;
      right: 0rpx;
    }

    .h_tab_active_clip_top {
      bottom: -20rpx;
    }

    .h_tab_active_clip_bottom {
      top: -20rpx;
    }

    .h_tab_active_clip_top {
      &::after {
        content: '';
        display: block;
        width: 20rpx;
        height: 20rpx;
        background-color: #ececec;
        clip-path: circle(20rpx at 0 20rpx);
      }
    }

    .h_tab_active_clip_bottom {
      &::after {
        content: '';
        display: block;
        width: 20rpx;
        height: 20rpx;
        clip-path: circle(20rpx at 0 0rpx);
        background-color: #ececec;
      }
    }
  }
}
</style>
