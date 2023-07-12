<template>
  <view
    class="h_tab_item"
    :style="itemStyles"
    @click="itemClick"
  >
    <slot>
      <image
        v-if="icon"
        class="h_tab_item_icon"
        :src="icon"
        :style="iconStyles"
      />
      <view
        v-if="label || value"
        class="h_tab_item_label"
        :style="labelStyles"
      >
        {{ label || value }}
      </view>
    </slot>
  </view>
</template>

<script>
/**
 * @name HTabItem
 * @description HTab  item
 * @property {Any}  value
 * @property {String}  label 显示文字
 * @property {String}  direction =['x'|'y'] 图片与文字方向  x=横向  y=纵向
 * @property {String}  icon 显示的图标链接
 * @property {String}  activeIcon 选中时显示的图标链接
 * @slot default
*/
export default {
  inject: ['HTab'],
  props: {
    value: {
      validator: () => true,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    direction: {
      default: 'y',
      validator(value) {
        return ['x', 'y'].includes(value);
      },
    },
    icon: {
      type: String,
      default: '',
    },
    activeIcon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rect: {},
    };
  },
  computed: {
    HTabsRect() {
      return this.HTab.scrollViewRect;
    },
    HTabsDirection() {
      return this.HTab.direction;
    },
    itemStyles() {
      return this.$h.cssConverter({
        flexDirection: this.direction === 'x' ? 'row' : 'column',
        width: this.HTab.direction === 'x' ? 'auto' : `${this.HTabsRect.width}px`,
        height: this.HTab.direction === 'x' ? `${this.HTabsRect.height}px` : 'auto',
      });
    },
    iconStyles() {
      let width = 0;
      let height = 0;
      if (this.HTab.direction === 'x') {
        if (this.direction === 'x') {
          width = this.HTabsRect.height * 0.3;
          height = this.HTabsRect.height * 0.3;
        }
        if (this.direction === 'y') {
          width = this.HTabsRect.height * 0.6;
          height = this.HTabsRect.height * 0.6;
        }
      }

      if (this.HTab.direction === 'y') {
        if (this.direction === 'x') {
          width = this.HTabsRect.width * 0.3;
          height = this.HTabsRect.width * 0.3;
        }
        if (this.direction === 'y') {
          width = this.HTabsRect.width * 0.6;
          height = this.HTabsRect.width * 0.6;
        }
      }

      return this.$h.cssConverter({
        width: `${width}px`,
        height: `${height}px`,
        margin: this.direction === 'x' ? '0 4rpx 0 0' : '0 0 10rpx 0',
      });
    },
    labelStyles() {
      return this.$h.cssConverter({
        width: this.direction === 'x' ? '100%' : 'auto',
        wordBreak: this.HTab.direction === 'x' ? 'keep-all' : 'break-all',
      });
    },

  },
  watch: {
    HTabsRect: {
      handler() {
        // htab尺寸发生变化，此时item也会发生变化，更新item尺寸数据
        this.$nextTick(async () => {
          this.resize();
        });
      },
      deep: true,
    },
    direction() {
      this.$nextTick(async () => {
        this.resize();
      });
    },
  },
  mounted() {
    this.resize();
  },
  methods: {
    async resize() {
      // 向HTab发送节点信息和值
      const rect = await this.getRect();
      this.HTab.setItemsRect(this.value, rect);
    },
    // 获取节点信息
    getRect() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select('.h_tab_item').boundingClientRect((data) => {
          this.rect = data;
          resolve(data);
        })
          .exec();
      });
    },

    // 点击事件
    itemClick() {
      this.HTab.itemClick(this.value);
    },
  },
};
</script>

<style lang='scss' scoped>
.h_tab_item {
  font-size: 28rpx;
  line-height: 28rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 30rpx 10rpx;

  .h_tab_item_icon {
    display: block;
  }

  .h_tab_item_label {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
