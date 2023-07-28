<template>
  <view
    class="h_tab_item"
    :class="{
      'h_tab_item-y': direction === 'y',
      'h_tab_item-x': direction === 'x',
      'h_tab_item-tab-y': HTabsDirection === 'y',
      'h_tab_item-tab-x': HTabsDirection === 'x',
    }"
    :style="itemStyles"
    @click="itemClick"
  >
    <slot>
      <image
        v-if="image"
        class="h_tab_item_image"
        :class="{
          'h_tab_item_image-y': direction === 'y',
          'h_tab_item_image-x': direction === 'x',
        }"
        :src="imageSrc"
        :style="imageStyles"
      />
      <text
        class="h_tab_item_label"
        :class="{
          'h_tab_item_label-y': direction === 'y',
          'h_tab_item_label-x': direction === 'x',
        }"
        :style="labelStyles"
      >
        {{ labelText }}
      </text>
    </slot>
  </view>
</template>

<script>
/**
 * @name HTabItem
 * @description HTab  item
 * @property {String||Number||Boolean}  value
 * @property {String}  label 显示文字
 * @property {String}  direction =['x'|'y'] 图片与文字方向  x=横向  y=纵向
 * @property {String}  label 文本内容
 * @property {String}  activeLabel 选中后的文本内容
 * @property {String||Object}  labelStyle 文本内容的样式
 * @property {String||Object}  activeLabelStyle 选中后文本内容的样式
 * @property {String}  image 图片链接
 * @property {String}  activeImage 选中后的图片链接
 * @property {String||Object}  imageStyle 图片的样式
 * @property {String||Object}  activeImageStyle 选中后的图片的样式
 * @property {String||Object}  styles 选项卡的样式
 * @property {String||Object}  activeStyle 选中后选项卡的样式
 * @slot default
*/
export default {
  inject: {
    HTab: ['HTab'],
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    direction: {
      default: 'y',
      validator(value) {
        return ['x', 'y'].includes(value);
      },
    },
    label: {
      type: [String, Number],
      default: '',
    },
    activeLabel: {
      type: String,
      default: '',
    },
    labelStyle: {
      type: [String, Object],
      default: '',
    },
    activeLabelStyle: {
      type: [String, Object],
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    activeImage: {
      type: String,
      default: '',
    },
    imageStyle: {
      type: [String, Object],
      default: '',
    },
    activeImageStyle: {
      type: [String, Object],
      default: '',
    },
    styles: {
      type: [String, Object],
      default: '',
    },
    activeStyle: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    return {
    };
  },
  computed: {
    HTabValue() {
      if (!this.HTab) return '';
      return this.HTab.value;
    },
    HTabsDirection() {
      if (!this.HTab) return 'x';
      return this.HTab.direction;
    },
    itemStyles() {
      return this.$h.cssConverter({
        ...this.$h.cssConverter(this.styles, 'object'),
        ...this.$h.cssConverter(this.HTabValue === this.value ? this.activeStyle : {}, 'object'),
      }, 'string');
    },
    imageSrc() {
      return this.HTabValue === this.value && this.activeImage ? this.activeImage : this.image;
    },
    imageStyles() {
      return this.$h.cssConverter({
        ...this.$h.cssConverter(this.imageStyle, 'object'),
        ...this.$h.cssConverter(this.HTabValue === this.value ? this.activeImageStyle : {}, 'object'),
      }, 'string');
    },
    labelText() {
      return this.HTabValue === this.value && this.activeLabel ? this.activeLabel : this.label;
    },
    labelStyles() {
      return this.$h.cssConverter({
        ...this.$h.cssConverter(this.labelStyle, 'object'),
        ...this.$h.cssConverter(this.HTabValue === this.value ? this.activeLabelStyle : {}, 'object'),
      }, 'string');
    },
  },
  created() {
    this.HTab.setItem(this.value, this.resize, this.select);
  },
  methods: {
    // 获取节点信息
    resize() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          uni.createSelectorQuery().in(this).select('.h_tab_item').boundingClientRect((data) => {
            resolve(data);
          })
            .exec();
        });
      });
    },

    // 点击事件
    itemClick() {
      this.HTab.itemClick(this.value);
    },

    select() {
      this.$emit('select', this);
    },

    toJSON() { },
  },
};
</script>

<style lang='scss' scoped>
.h_tab_item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.h_tab_item-y {
  flex-direction: column;
}

.h_tab_item-x {
  flex-direction: row;
}

.h_tab_item-tab-y {
  width: 100%;
  height: auto;
  padding: 20rpx 10rpx;
  justify-content: flex-start;
}

.h_tab_item-tab-x {
  width: auto;
  height: 100%;
  padding: 10rpx 20rpx;
  justify-content: center;
}

.h_tab_item_image {
  width: 100rpx;
  height: 100rpx;
}

.h_tab_item_image-y {
  width: 100rpx;
  height: 100rpx;
}

.h_tab_item_image-x {
  width: 40rpx;
  height: 40rpx;
}

.h_tab_item_label {
  font-size: 30rpx;
  line-height: 30rpx;
}

.h_tab_item_label-y {
  padding: 4rpx 0 0 0;
}

.h_tab_item_label-x {
  padding: 0 0 0 4rpx;
}
</style>
