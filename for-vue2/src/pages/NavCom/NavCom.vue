<template>
  <view>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
        :note="item.note"
        show-arrow
        link="navigateTo"
        clickable
        :to="`/pages/${item.title}/${item.title}`"
      />
    </uni-list>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'HButton',
          note: '按钮',
        },
        {
          title: 'HTab',
          note: '标签栏',
        },
      ],
    };
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
