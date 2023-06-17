<template>
  <view
    class="h_column_tab"
    :style="{height:height,width:width}"
  >
    <scroll-view
      id="h_column_tab_box"
      scroll-y
      scroll-with-animation
      :scroll-top="scrollTop"
      class="h_column_tab_box"
      :enhanced="true"
      scroll-anchoring
      :bounces="false"
    >
      <view
        v-for="(item,index) in list"
        :key="index"
        class="h_column_tab_item h_column_tab_item_default"
        :class="{'h_column_tab_item_active':item.value===value}"
        :style="item.value===value?itemStyle+itemActiveStyle:itemStyle"
        @click="clickItem(item,index)"
      >
        <image
          v-if="item.src&&image"
          :style="item.value===value?imageStyle+imageActiveStyle:imageStyle"
          :src="item.value===value?item.src:item.activeSrc"
          class="h_column_tab_item_image"
          mode="aspectFill"
        />
        <text
          :style="item.value===value?textStyle+textActiveStyle:textStyle"
          class="h_column_tab_item_text"
        >
          {{ item.label }}
        </text>
      </view>
    </scroll-view>
  </view>
</template>

<script>
/**
 * @name HColumnTab
 * @description
 * @property {Number||String} value 当前列表选中的值
 * @property {Array<Object>} list 标签数组
 *     @property {Number||String} value  标签的值
 *     @property {String} label  标签显示的文本内容
 *     @property {String} src  图片的链接地址
 *     @property {String} activeSrc  图片选中后的链接地址
 * @property {String} width 栏目的宽度
 * @property {String} height 栏目的高度
 * @property {String} itemStyle item样式
 * @property {String} imageStyle 图片样式
 * @property {String} textStyle 文本样式
 * @property {String} itemActiveStyle 选中时item样式
 * @property {String} imageActiveStyle 选中时是否显示图片
 * @property {String} textActiveStyle 选中时文本样式
 * @property {Boolean} image 是否显示图片
 *
 * @event input
 * @event change tab切换时间,参数(index)
 * @slot
*/
export default {
  props: {
    value: {
      type: [Number, String],
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '130rpx',
    },
    height: {
      type: String,
      default: '100vh',
    },
    itemStyle: {
      type: String,
      default: () => '',
    },
    imageStyle: {
      type: String,
      default: () => '',
    },
    textStyle: {
      type: String,
      default: () => '',
    },
    itemActiveStyle: {
      type: String,
      default: () => '',
    },
    imageActiveStyle: {
      type: String,
      default: () => '',
    },
    textActiveStyle: {
      type: String,
      default: () => '',
    },
    image: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scrollTop: 0,

      flag: false,
    };
  },
  watch: {
    value(newValue) {
      const index = this.list.findIndex((item) => item.value === newValue);
      if (index !== -1) {
        this.setScroll(index);
      }
    },
  },
  methods: {
    clickItem(item, index) {
      this.$emit('change', index);
      this.$emit('input', item.value);
    },
    async setScroll(index) {
      const scrollRect = await this.getScrollRect();
      const itemsRects = await this.getItemRect();
      const { scrollTop } = await this.getScrollTop();
      const itemY = itemsRects[index].top - scrollRect.top + itemsRects[index].height / 2;
      const centerY = scrollRect.height / 2;
      this.scrollTop = scrollTop + (itemY - centerY);
    },
    // 获取items节点信息
    getItemRect() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).selectAll('.h_column_tab_item').boundingClientRect((data) => {
          resolve(data);
        })
          .exec();
      });
    },
    // 获取scroll节点信息
    getScrollRect() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select('.h_column_tab_box').boundingClientRect((data) => {
          resolve(data);
        })
          .exec();
      });
    },
    async getScrollTop() {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this).select('#h_column_tab_box').scrollOffset((data) => {
          resolve(data);
        })
          .exec();
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.h_column_tab{
    ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  .h_column_tab_box{
    width: 100%;
    height: 100%;
    .h_column_tab_item{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .h_column_tab_item_default{
      padding: 20rpx 0;
      font-size: 28rpx;
      border: 1px solid #000;
    }
    .h_column_tab_item_active{
      background-color: red;
    }
    .h_column_tab_item_image{
      display:block;
      width: 100rpx;
      height: 100rpx;
    }
  }
}
</style>
