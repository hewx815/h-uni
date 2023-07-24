<template>
  <!-- 导航列表 -->
  <uni-list>
    <uni-list-item
      v-for="( item, index ) in list "
      :key="index"
      :title="item.title"
      :note="item.note"
      show-arrow
      clickable
      :to="`/pages/${item.url}`"
    />
  </uni-list>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: '基础用法',
          url: 'HTab/HTabBase',
        },
        {
          title: '布局方向',
          url: 'HTab/HTabDirection',
        },
        {
          title: '滑块样式',
          url: 'HTab/HTabActiveStyle',
        },
        {
          title: '选项卡样式',
          url: 'HTab/HTabItemStyle',
        },
        {
          title: '使用插槽',
          url: 'HTab/HTabSlot',
        },
        {
          title: '关闭滚动或滑块',
          url: 'HTab/HTabStop',
        },
      ],
    };
  },
};
</script>
