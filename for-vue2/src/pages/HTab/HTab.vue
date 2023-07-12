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
          note: '一个简单的示例',
          url: 'HTab/HTabBase',
        },
        {
          title: '布局方向[direction]',
          note: '更改容器以及子项布局',
          url: 'HTab/HabDirection',
        },
      ],
    };
  },
};
</script>
