<template>
  <scroll-view
    class="h_tab"
    :style="{ height: scrollHeight, width: scrollWidth }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollTop"
    :scroll-left="scrollLeft"
    :show-scrollbar="false"
    scroll-with-animation
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
 * @description 支持横向和纵向布局的标签栏
 * @property {Any} value 选中的值
 * @property {String} direction =['x'|'y'] 标签栏的方向  x=横向  y=纵向 默认：y
 * @property {Number||String} width tab宽度 默认: direction=x:100vw:   direction=y:150rpx
 * @property {Number||String} height tab高度 默认: direction=x:150rpx  direction=y:1246rpx
 * @property {Number} duration 滑块过渡时间 默认:500
 * @property {String||Object} activeStyle 滑块元素样式
 * @event input .
 * @slot default <HTabItem/>
*/
export default {
  provide() {
    return { HTab: this }; // 与item组件通信
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
      viewScrollTop: 0, // scroll-view 滚动高度

      scrollTop: 0, // scroll-view scrollTop
      scrollLeft: 0, // scroll-view scrollLeft

      itemsRect: [], // item组件信息
      scrollViewRect: {}, // scroll-view rect
    };
  },
  computed: {
    // scroll-view 宽
    scrollWidth() {
      if (this.width) {
        if (typeof this.width === 'number') return `${this.width}px`;
        return this.width;
      }
      return this.direction === 'x' ? '100vw' : '150rpx';
    },

    // scroll-view 高
    scrollHeight() {
      if (this.height) {
        if (typeof this.height === 'number') return `${this.height}px`;
        return this.height;
      }
      return this.direction === 'x' ? '160rpx' : '1246rpx';
    },

    // 选中元素样式
    activeStyles() {
      const item = this.itemsRect.find((rect) => rect.value === this.value);

      if (!item) return '';

      const width = item ? item.right - item.left : 0;
      const height = item ? item.bottom - item.top : 0;
      const top = item.top - this.itemsRect[0].top;
      const left = item.left - this.itemsRect[0].left;

      return this.$h.cssConverter({
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
        transition: `${this.duration / 1000}s`,
        ...this.$h.cssConverter(this.activeStyle, 'object'),
      }, 'string');
    },
  },
  watch: {
    value(newValue) {
      const index = this.itemsRect.findIndex((item) => item.value === newValue);
      this.setScroll(index);
    },
    direction() {
      this.$nextTick(async () => {
        this.scrollViewRect = await this.getScrollViewRect();
      });
    },
  },
  async mounted() {
    this.scrollViewRect = await this.getScrollViewRect();
  },
  methods: {
    // item组件传递rect信息
    setItemsRect(value, rect) {
      const index = this.itemsRect.findIndex((item) => item.value === value);
      if (index !== -1) {
        Object.keys(rect).forEach((key) => {
          this.itemsRect[index][key] = rect[key];
        });
        return;
      }
      this.itemsRect.push({ ...rect, value });
    },

    // item组件点击事件
    itemClick(value) {
      this.$emit('input', value);
    },

    // 滚动某一项到中间位置
    setScroll(index) {
      const centerHeight = this.scrollViewRect.height / 2;
      const centerWidth = this.scrollViewRect.width / 2;

      const {
        top,
        height,
        left,
        width,
      } = this.itemsRect[index];

      const scrollTop = top + height / 2 - centerHeight;
      const scrollLeft = left + width / 2 - centerWidth;

      this.scrollTop = scrollTop;
      this.scrollLeft = scrollLeft;
    },

    // 记录高度高度
    scroll(e) {
      this.viewScrollTop = e.detail.scrollTop;
    },

    // 获取 scroll-view rect信息
    getScrollViewRect() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select('.h_tab').boundingClientRect((data) => {
          resolve(data);
        })
          .exec();
      });
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
    justify-content: center;
    align-items: center;
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
