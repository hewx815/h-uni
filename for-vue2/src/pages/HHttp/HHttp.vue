<template>
  <view>
    <button @click="mode1">
      请求方式1
    </button>
    <button @click="mode2">
      请求方式2
    </button>
    <button @click="mode3">
      请求方式3
    </button>
    <view style="display: flex;justify-content: space-between;padding: 30px;">
      <textarea
        disabled
        :value="`GET
${JSON.stringify(getInfo, null, 3)}`"
      />
      <textarea
        disabled
        :value="`POST
${JSON.stringify(postInfo, null, 3)}`"
      />
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-dom';

export default defineComponent({
  components: {},
  props: {},
  data() {
    return {
      getInfo: '' as unknown,
      postInfo: '' as unknown,
    };
  },
  methods: {

    async mode1() {
      const { Hhttp } = this.$h;

      const request = new Hhttp();

      this.getInfo = await request.request({
        url: 'https://hewxing.cn/api/test',
      });

      this.postInfo = await request.request({
        url: 'https://hewxing.cn/api/test',
        method: 'POST',
      });
    },

    async mode2() {
      const { Hhttp } = this.$h;

      const baseOptions = {
        baseUrl: 'https://hewxing.cn/api',
      };

      const request = new Hhttp(baseOptions);
      request.baseTimeout = 10000;

      // 发起get请求
      this.getInfo = await request.get('test', { wd: '哈哈哈' });

      // 发起post请求
      this.postInfo = await request.post('test', { wd: '哈哈哈' });
    },

    mode3() {
      const { Hhttp } = this.$h;

      const request = new Hhttp();

      // 异步调用
      request.request({
        url: 'https://hewxing.cn/api/test',
      })
        .then((data) => {
          this.getInfo = data;
          return '';
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });

      // 异步调用快捷方法
      request.post('https://hewxing.cn/api/test', { wd: '哈哈哈' })
        .then((data) => {
          this.postInfo = data;
          return '';
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
    },
  },
});
</script>

<style lang='scss' scoped>
textarea {
  width: 100%;
  height: 500px;
}
</style>
