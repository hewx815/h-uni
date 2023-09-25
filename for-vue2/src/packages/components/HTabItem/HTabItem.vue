<template>
  <!-- @vue-ignore -->
  <view
    class="h_tab_item"
    :class="[
      `h_tab_item-${direction}`,
      `h_tab_item-tab-${HTabDirection}`,
      `h_tab_item-${vueId}`,
    ]"
    :style="itemStyles"
    @click="itemClick(value)"
  >
    <slot>
      <image
        v-if="image"
        class="h_tab_item_image"
        :class="[`h_tab_item_image-${direction}`]"
        :src="imageSrc"
        :style="imageStyles"
      />
      <text
        class="h_tab_item_label"
        :class="[`h_tab_item_label-${direction}`]"
        :style="labelStyles"
      >
        {{ labelText }}
      </text>
    </slot>
  </view>
</template>

<script lang="ts">
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
import { defineComponent } from '@vue/runtime-dom';
import HTab from '../HTab/HTab.vue';

type HTabType = InstanceType<typeof HTab>;

export default defineComponent({
  inject: ['getHTabDirection', 'getHTabValue', 'setItem', 'itemClick'],
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    direction: {
      default: 'y',
      validator(value: string) {
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
      vueId: '',
      getHTabDirectionCopy: (): typeof this.value => '',
      getHTabValueCopy: (): typeof this.value => '',
    };
  },
  computed: {
    HTabValue() {
      return this.getHTabValueCopy();
    },
    HTabDirection() {
      return this.getHTabDirectionCopy();
    },
    itemStyles() {
      return this.$h.cssConverterString({
        ...this.$h.cssConverterObject(this.styles),
        ...this.$h.cssConverterObject(this.HTabValue === this.value ? this.activeStyle : {}),
      });
    },
    imageSrc() {
      return this.HTabValue === this.value && this.activeImage ? this.activeImage : this.image;
    },
    imageStyles() {
      return this.$h.cssConverterString({
        ...this.$h.cssConverterObject(this.imageStyle),
        ...this.$h.cssConverterObject(this.HTabValue === this.value ? this.activeImageStyle : {}),
      });
    },
    labelText() {
      return this.HTabValue === this.value && this.activeLabel ? this.activeLabel : this.label;
    },
    labelStyles() {
      return this.$h.cssConverterString({
        ...this.$h.cssConverterObject(this.labelStyle),
        ...this.$h.cssConverterObject(this.HTabValue === this.value ? this.activeLabelStyle : {}),
      });
    },
    itemClassName() {
      return `h_tab_item-tab-${this.HTabDirection} h_tab_item-${this.direction}`;
    },
  },
  created() {
    this.getHTabValueCopy = this.getHTabValue as () => HTabType['value'];
    this.getHTabDirectionCopy = this.getHTabDirection as () => HTabType['direction'];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.setItem(this.value, this.resize, this.select);
    // #ifdef MP-BAIDU
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    this.vueId = this.$scope._$vueId;
    // #endif
  },
  methods: {
    // 获取节点信息
    resize() {
      let className = '.h_tab_item';
      // #ifdef MP-BAIDU
      className = `.h_tab_item-${this.vueId}`;
      // #endif
      return new Promise((resolve) => {
        this.$nextTick()
          .then(() => {
            uni.createSelectorQuery().in(this).select(className).boundingClientRect((data) => {
              resolve(data);
            })
              .exec();
            return true;
          }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error('[HTabItem]', error);
          });
      });
    },

    select() {
      this.$emit('select');
    },

  },
});
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
  white-space: nowrap;
  padding: 0 0 0 4rpx;
}
</style>
