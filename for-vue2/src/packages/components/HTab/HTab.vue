<template>
  <scroll-view
    :class="[`h_tab`, `h_tab-${vueId}`]"
    :style="{ height: scrollHeight, width: scrollWidth }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollXY.y"
    :scroll-left="scrollXY.x"
    :show-scrollbar="false"
    :scroll-with-animation="scrollAnimation"
  >
    <!-- 滑块 -->
    <view
      v-if="showActive"
      class="h_tab_active"
      :class="[
        `h_tab_active-${activeAspect}`,
        `h_tab_active-${vueId}`
      ]"
      :style="activeStyles"
    >
      <slot name="active" />
    </view>
    <!-- 选项卡容器 -->
    <view
      class="h_tab_container"
      :class="[
        `h_tab_container-${direction}`,
        `h_tab_container-${vueId}`
      ]"
    >
      <slot />
    </view>
  </scroll-view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';
import HTabItem from '../HTabItem/HTabItem.vue';

type HTabItemType = InstanceType<typeof HTabItem>;

/**
 * @name HTab 标签栏
 * @description 支持横向和纵向布局的标签栏
 * @property {String||Number||Boolean} value 选中的值
 * @property {String} direction =['x'|'y'] 标签栏的方向  x=横向  y=纵向 默认：y
 * @property {Number||String} width tab宽度 默认: direction=x:100vw:   direction=y:150rpx
 * @property {Number||String} height tab高度 默认: direction=x:150rpx  direction=y:1246rpx
 * @property {String} activeAspect 滑块的朝向 =[none,left,right,top,bottom]
 * @property {Number} activeDuration 滑块过渡时间 默认:500
 * @property {String} activeBackgroundColor 滑块的背景颜色
 * @property {Boolean} activeStyle 滑块的样式
 * @property {Boolean} scrollAnimation 是否开启滚动动画
 * @property {Boolean} activeAnimation 是否开启滑块动画
 * @property {Boolean} scrollCenter 是否开启选中项自动滚动至中间功能
 * @property {Boolean} showActive 是否开启滑块
 * @event input .
 * @slot default <HTabItem/>
 * @slot active 自定义滑块
*/

export default defineComponent({
  provide() {
    return { // 与item组件通信
      getHTabDirection: () => this.direction,
      getHTabValue: () => this.value,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      setItem: this.setItem,
      // eslint-disable-next-line @typescript-eslint/unbound-method
      itemClick: this.itemClick,
    };
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    direction: {
      default: 'y',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator(value: string) {
        return ['x', 'y'].includes(value);
      },
    },
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
      default: '',
    },
    activeAspect: {
      default: 'none',
      validator(value) {
        if (typeof value !== 'string') return false;
        return ['left', 'right', 'top', 'bottom', 'none'].includes(value);
      },
    },
    activeDuration: {
      type: Number,
      default: 500,
    },
    activeBackgroundColor: {
      type: String,
      default: '#FFFFFF',
    },
    activeStyle: {
      type: [String, Object],
      default: '',
    },
    scrollAnimation: {
      type: Boolean,
      default: true,
    },
    activeAnimation: {
      type: Boolean,
      default: true,
    },
    scrollCenter: {
      type: Boolean,
      default: true,
    },
    showActive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      vueId: 'vueId',

      scrollViewScroll: {} as UniNamespace.NodeInfo, // scroll-view 滚动信息

      scrollViewRect: {} as UniNamespace.NodeInfo, // scroll-view 节点信息

      containerRect: {} as UniNamespace.NodeInfo, // Container 节点信息

      items: [] as Array<
        UniNamespace.NodeInfo
        & {
          value: HTabItemType['$props']['value'];
          select: HTabItemType['select'];
          resize: () => Promise<UniNamespace.NodeInfo>;
        }>,
    };
  },
  computed: {
    // scroll-view 宽
    scrollWidth() {
      if (this.width) {
        if (typeof this.width === 'number') return `${this.width}px`;
        return this.width;
      }
      return this.direction === 'x' ? '100vw' : '160rpx';
    },
    // scroll-view 高
    scrollHeight() {
      if (this.height) {
        if (typeof this.height === 'number') return `${this.height}px`;
        return this.height;
      }
      return this.direction === 'x' ? '160rpx' : '1000rpx';
    },
    // 滚动到中间为止的坐标值
    scrollXY() {
      if (!this.scrollCenter) return {};

      const item = this.items.find((items) => items.value === this.value);
      if (!item) return {};

      if (item.dataset && item.select) {
        item.select();
      }
      const {
        top, height, left, width,
      } = item;

      if (
        this.scrollViewRect.height === undefined
        || this.scrollViewRect.width === undefined
        || this.items[0].left === undefined
        || this.items[0].top === undefined
        || top === undefined
        || left === undefined
        || width === undefined
        || height === undefined
      ) {
        return {
          x: 0,
          y: 0,
        };
      }

      const centerHeight = this.scrollViewRect.height / 2;
      const centerWidth = this.scrollViewRect.width / 2;

      return {
        x: (left - this.items[0].left + width / 2) - centerWidth,
        y: (top - this.items[0].top + height / 2) - centerHeight,
      };
    },
    // 滑块样式
    activeStyles() {
      if (!this.showActive) return '';
      const item = this.items.find((items) => items.value === this.value);
      if (!item) return '';

      if (
        item.right === undefined
        || item.left === undefined
        || item.bottom === undefined
        || item.top === undefined
        || this.containerRect.top === undefined
        || this.containerRect.left === undefined

      ) return '';

      const width = item ? item.right - item.left : 0;
      const height = item ? item.bottom - item.top : 0;

      const top = item.top - this.containerRect.top;
      const left = item.left - this.containerRect.left;

      return this.$h.cssConverterString({
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
        transition: `${this.activeAnimation ? (this.activeDuration / 1000) : 0}s`,
        '--h-tab-active-background': this.activeBackgroundColor,
        ...this.$h.cssConverterObject(this.activeStyle),
      });
    },

  },
  created() {
    // #ifdef MP-BAIDU
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-underscore-dangle, @typescript-eslint/no-unsafe-member-access
    this.vueId = this.$scope._$vueId;
    // #endif
  },
  mounted() {
    this.resize().catch((error) => {
      // eslint-disable-next-line no-console
      console.error('[HTab]', error);
    });
  },
  methods: {
    // 设置item组件信息
    setItem(
      value: typeof this.value,
      resizeFn: () => Promise<UniNamespace.NodeInfo>,
      select: HTabItemType['select'],
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      this.items.push({ value, resize: resizeFn, select });
    },
    // item组件点击事件
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemClick(value: any) {
      this.$emit('input', value);
    },
    // 重新计算尺寸
    async resize(value?: typeof this.value) {
      await this.$nextTick();
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      setTimeout(async () => {
        await this.$nextTick();
        const arr = value
          ? [this.items.find((item) => item.value === value)?.resize()]
          : [...this.items.map((item) => item.resize())];

        Promise.all([
          this.getRect(),
          this.getScroll(),
          this.getContainerRect(),
          ...arr,
        ])
          .then(([rect, scroll, containerRect, ...itemsRect]) => {
            this.scrollViewRect = rect || {};
            this.scrollViewScroll = scroll || {};
            this.containerRect = containerRect || {};
            if (value) {
              const index = this.items.find((item) => item.value === value);
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call
              this.$set(this.items, index, itemsRect[0]);
            } else {
              itemsRect.forEach((itemRect, index) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                this.$set(this.items, index, { ...this.items[index], ...itemsRect[index] });
              });
            }

            return '';
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err);
          });
      }, 200);
    },
    // 获取 scroll-view rect信息
    getRect() {
      let className = '.h_tab';
      // #ifdef MP-BAIDU
      className = `.h_tab-${this.vueId}`;
      // #endif
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select(className).boundingClientRect((data) => {
          resolve(data);
        })
          .exec();
      });
    },
    // 获取 scroll-view scroll信息
    getScroll() {
      let className = '.h_tab';
      // #ifdef MP-BAIDU
      className = `.h_tab-${this.vueId}`;
      // #endif
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select(className).scrollOffset((data) => {
          resolve(data);
        })
          .exec();
      });
    },
    getContainerRect() {
      let className = '.h_tab_container';
      // #ifdef MP-BAIDU
      className = `.h_tab_container-${this.vueId}`;
      // #endif
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select(className).boundingClientRect((data) => {
          resolve(data);
        })
          .exec();
      });
    },
  },
});
</script>

<style lang='scss' scoped>
.h_tab {
  background-color: #ececec;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  .h_tab_container {
    display: flex;
    position: relative;
  }

  .h_tab_container-y {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  .h_tab_container-x {
    width: auto;
    height: 100%;
    white-space: nowrap;
    flex-direction: row;
  }

  .h_tab_active {
    width: 100%;
    position: absolute;
    background-color: var(--h-tab-active-background);

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 20rpx;
      height: 20rpx;
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 20rpx;
      height: 20rpx;
    }
  }

  .h_tab_active-left {
    border-radius: 20rpx 0rpx 0rpx 20rpx;

    &::before {
      content: '';
      right: 0;
      top: -20rpx;
      background-image:
        radial-gradient(circle at top left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      right: 0;
      bottom: -20rpx;
      background-image:
        radial-gradient(circle at bottom left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-right {
    border-radius: 0rpx 20rpx 20rpx 0rpx;

    &::before {
      content: '';
      left: 0;
      top: -20rpx;
      background-image:
        radial-gradient(circle at top right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      left: 0;
      bottom: -20rpx;
      background-image:
        radial-gradient(circle at bottom right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-top {
    border-radius: 20rpx 20rpx 0rpx 0rpx;

    &::before {
      content: '';
      bottom: 0;
      left: -20rpx;
      background-image:
        radial-gradient(circle at top left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      bottom: 0;
      right: -20rpx;
      background-image:
        radial-gradient(circle at top right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-bottom {
    border-radius: 0rpx 0rpx 20rpx 20rpx;

    &::before {
      content: '';
      top: 0;
      left: -20rpx;
      background-image:
        radial-gradient(circle at bottom left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      top: 0;
      right: -20rpx;
      background-image:
        radial-gradient(circle at bottom right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }
}
</style>
