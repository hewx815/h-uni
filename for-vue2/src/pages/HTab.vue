<template>
  <view>
    <uni-list>
      <uni-list-item
        v-for="(item, index) in useList"
        :key="index"
        :title="item.title"
        :note="item.note"
        show-arrow
        clickable
        @click="useing = item.title"
      />
    </uni-list>
    <!-- 基础用法 -->
    <view
      v-if="useing === '基础用法'"
      class=""
    >
      <HTab
        v-model="active"
        direction="y"
      >
        <HTabItem
          v-for="(item, index) in list"
          :key="index"
          :value="item.value"
          :label="item.label"
          :icon="item.src"
          :active-icon="item.activeSrc"
        />
      </HTab>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      useing: '1',
      useList: [
        {
          title: '基础用法',
          note: '一个简单的示例',
        },
      ],

      active: 1,
      list: [
        {
          value: 1,
          label: '人气热卖',
          src: '/static/logo-shadow.png',
          activeSrc: '',
        },
        {
          value: 2,
          label: '限时优惠',
          src: '/static/logo-shadow.png',

        },
        {
          value: 3,
          label: '单人餐',
          src: '/static/logo-shadow.png',
        },
        {
          value: 4,
          label: '主食',
          src: '/static/logo-shadow.png',
        },
        {
          value: 5,
          label: '甜点',
          src: '/static/logo-shadow.png',
        },
        {
          value: 6,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 7,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 8,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 9,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 10,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
        {
          value: 11,
          label: '饮品',
          src: '/static/logo-shadow.png',
        },
      ],
    };
  },
  onLoad({ anchor }) {
    this.anchor = anchor;
  },
  methods: {

  },
};
</script>

<style lang='scss' scoped></style>
