<template>
  <view
    class="h_tab_item"
    @click="itemClick"
  >
    <slot>
      <image
        v-if="icon"
        class="h_tab_item_icon"
        :src="icon"
        :style="iconDefaultStyle"
      />
      <view
        class="h_tab_item_label"
        :style="labelStyle"
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
    labelStyle: {
      type: [String, Object],
      default: '',
    },
    iconStyle: {
      type: [String, Object],
      default: '',
    },
    activeIconStyle: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
      rect: {},
    };
  },
  computed: {
    iconStyles() {
      return {
      };
    },
    iconDefaultStyle() {
      if (this.HTab.direction === 'x') {
        return `width: ${this.HTab.scrollHeight};height: ${this.HTab.scrollHeight};`;
      }
      return `width: ${this.HTab.scrollWidth};height: ${this.HTab.scrollWidth};`;
    },
  },
  async mounted() {
    // 向HTab发送节点信息和值
    const rect = await this.getRect();
    this.HTab.setItemsRect(this.value, rect);
  },
  methods: {
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
  border-right: 2rpx solid #e5e5e5;

  .h_tab_item_icon {
    box-sizing: border-box;
    padding: 20rpx;
  }

  .h_tab_item_label {
    text-align: center;
    padding-bottom: 20rpx;
  }
}
</style>
