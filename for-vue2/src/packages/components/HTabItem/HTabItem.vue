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
 * @property {*}  value
 * @property {String}  label 显示文字
 * @property {String}  icon 显示的图标链接
 * @property {String}  activeIcon 选中时显示的图标链接
 * @event
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
    itemStyles() {
      return this.$h.cssConverter({
        width: `${this.HTabsRect.width}px`,
        height: 'auto',
      });
    },
    iconStyles() {
      return this.$h.cssConverter({
        width: `${this.HTabsRect.width * 0.8}px`,
        height: `${this.HTabsRect.width * 0.8}px`,
        paddingTop: '20rpx',
      });
    },
  },
  watch: {
    HTabsRect() {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .h_tab_item_icon {
    display: block;
  }

  .h_tab_item_label {
    padding: 20rpx 0;
    text-align: center;
    font-size: 32rpx;
    line-height: 32rpx;
  }
}
</style>
