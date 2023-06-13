<template>
  <view
    class="h_column_tab"
    :style="{height:height,width:width}"
  >
    <scroll-view
      scroll-y
      :scroll-with-animation="true"
      :scroll-top="scrollTop"
      class="h_column_tab_box"
      :enhanced="true"
      :bounces="true"
      @scroll="scroll"
    >
      <view
        v-for="(item,index) in list"
        :key="index"
        class="h_column_tab_item h_column_tab_item_default"
        :class="{'h_column_tab_item_active':item.value===value}"
        :style="itemStyle"
        @click="clickItem(item,index)"
      >
        <image
          v-if="item.image&&image"
          :style="imageStyle"
          :src="item.value===value?item.src:item.activeSrc"
          class="h_column_tab_item_image"
          mode="aspectFill"
        />
        <text
          class="h_column_tab_item_text"
          :style="textStyle"
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
 * @property {Number || String} value 当前列表选中的值
 * @property {Boolean} image 是否显示图片
 * @property {Array<Object>} list 标签数组
 *     @property {Number || String} value  标签的值
 *     @property {String} label  标签显示的文本内容
 *     @property {String} src  图片的链接地址
 *     @property {String} ActiveSrc  图片选中后的链接地址
 *     @property {Boolean} image  当前item是否显示图片(组件image为true时生效)
 * @event input
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
    image: {
      type: Boolean,
      default: false,
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
    width: {
      type: String,
      default: '130rpx',
    },
    height: {
      type: String,
      default: '100vh',
    },
  },
  data() {
    return {
      scrollTop: 0,
      scrollTopCopy: 0,
    };
  },
  onLoad() {

  },
  methods: {
    async clickItem(item, index) {
      const scrollRect = await this.getScrollRect();
      const itemsRects = await this.getItemRect();
      const itemY = itemsRects[index].top + itemsRects[index].height / 2 - scrollRect.top;
      const centerY = scrollRect.height / 2 + scrollRect.top;
      this.scrollTop = this.scrollTopCopy + (itemY - centerY);
      this.$emit('input', item.value);
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
    scroll(e) {
      this.scrollTopCopy = e.detail.scrollTop;
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
