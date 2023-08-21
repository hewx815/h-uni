<template>
  <div class="preview_btn">
    <div
      class="btn"
      @click="clickBtn"
    >
      <div class="btn_text">
        预览
      </div>
      <img
        class="btn_img"
        src="../static/eye.svg"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * @name 预览按钮
 * @description 依赖组件<Preview> 在
 * 代码块的上分插入该组件 点击按钮时会更改<Preview>正在预览的路径
 * @property {String} path 预览的路径
*/
import { getCurrentInstance } from 'vue';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
const { proxy } = getCurrentInstance();

const clickBtn = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
  (proxy.$root as any).preview(props.path);
};
</script>

<style lang='scss' scoped>
.preview_btn {
  position: relative;
  margin-top: 1px;
  margin: 16px 0;

  .btn {
    width: 100px;
    height: 30px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    right: 30px;
    z-index: 19;
    top: 10px;

    background-color: var(--color);
    color: #fff;
    border-radius: 15px;
    box-shadow:
      0 2px 4px -1px rgba(0, 0, 0, .2),
      0 4px 5px 0 rgba(0, 0, 0, .14),
      0 1px 10px 0 rgba(0, 0, 0, .12);

    &:hover {
      background-color: var(--color-light);
      box-shadow:
        0 2px 6px -1px rgba(0, 0, 0, .2),
        0 4px 7px 0 rgba(0, 0, 0, .14),
        0 1px 12px 0 rgba(0, 0, 0, .12);
    }

    transition: 0.2s;

    cursor:pointer;

    .btn_text {
      font-size: 14px;
    }

    .btn_img {
      width: 20px;
      height: 20px;
      margin-left: 10px;
    }
  }
}
</style>
