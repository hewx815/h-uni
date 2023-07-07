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
          title: '横向布局',
          note: '更改tab栏方向',
          url: 'HTab/HabDirection',
        },
      ],
    };
  },
};
</script>
