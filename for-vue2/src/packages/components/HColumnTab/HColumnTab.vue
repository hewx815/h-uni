<template>
  <view class="h_column_tab">
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
        :class="{'h_column_tab_item_active':item.value===value,}"
        @click="clickItem(item,index)"
      >
        {{ item.label }}
      </view>
    </scroll-view>
  </view>
</template>

<script>
/**
 * @name HColumnTab
 * @description
 * @property {Number || String} value 当前列表选中的值
 * @property {Array<Object>} list 标签数组
 *     @property {Number || String} value  标签的值
 *     @property {String} label  标签显示的文本内容
 * @event
 * @slot
*/
export default {
  props: {
    value: {
      type: Number || String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
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
  width: 100%;
  height: 100%;
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
      text-align: center;
    }
    .h_column_tab_item_default{
      padding: 60rpx 0;
      font-size: 28rpx;
      border: 1px solid #000;
    }
    .h_column_tab_item_active{
      background-color: red;
    }
  }
}
</style>
