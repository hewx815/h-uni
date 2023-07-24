<template>
  <div
    class="preview"
    :style="{ top: `${top}px`, left: `${left}px` }"
  >
    <div
      ref="previewIcon"
      class="preview_icon"
      @mousedown="mousedown"
      @mouseup="mouseup"
      :style="{
        backgroundImage: `url(${open ? closeSvg : phoneSvg})`,
        transform: `rotateZ(${open ? '360deg' : '0deg'})`,
      }"
    />
    <div
      :style="iframeStyle"
      class="iframe_box"
    >
      <iframe
        @load="open = true"
        class="preview_iframe"
        :src="url"
        frameborder="0"
      />
    </div>
  </div>
</template>

<script setup>
/**
 * @name 组件预览悬浮组件
 * @description 在组件md文件中挂载此组件
 * @property {String} path 预览的路径
*/
import closeSvg from '../static/close.svg';
import phoneSvg from '../static/phone.svg';
import { defineProps, computed, getCurrentInstance, ref, onMounted } from 'vue';

const props = defineProps({
  path: {
    type: String,
    required: true
  },
});




// previewBtn path
const previewBtnPath = ref('');
// iframe 打开状态
const open = ref(false);

const top = ref(0);
const left = ref(0);

const previewIcon = ref(null);

const { proxy } = getCurrentInstance();

// PhonePreview 组件调用此方法 更改 previewBtnPath
proxy.$root.preview = (url) => {
  previewBtnPath.value = '';
  setTimeout(() => {
    previewBtnPath.value = url;
  }, 0);
  open.value = true;
};


onMounted(() => {
  const data = getXY();
  if (data) {
    left.value = data.x;
    top.value = data.y;
    return;
  }

  left.value = 0;
  top.value = window.innerHeight - 667 - 50;
});

// iframe src
const url = computed(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://preview-vue2.h-uni.hewxing.cn/#/' : "http://localhost:8080/#/";
  return baseUrl + (previewBtnPath.value ? previewBtnPath.value : props.path);
});

// iframe样式
const iframeStyle = computed(() => {
  if (open.value) {
    return {
      width: '375px',
      height: '667px',
      borderRadius: '10px',
      opacity: 1,
    };
  } else {
    return {
      width: '0px',
      height: '0px',
      borderRadius: '0 0 100% 0%',
      opacity: 0.5,
    };
  }
});


// 获取滚动条宽度
const getScrollBarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return widthNoScroll - widthWithScroll;;
};


// 移动
const move = (e) => {

  // 鼠标距离屏幕
  const mouseX = e.screenX;
  const mouseY = e.screenY;

  // 浏览器距离屏幕
  const browserX = window.screenX;
  const browserY = window.screenY;

  // 工具栏 宽高
  const toolBarWidth = window.outerWidth - window.innerWidth;
  const toolBarHeight = window.outerHeight - window.innerHeight;

  // 元素宽高
  const width = 50;
  const height = 50;

  // 鼠标位于页面的距离
  let x = mouseX - browserX - toolBarWidth - width / 2;
  let y = mouseY - browserY - toolBarHeight - height / 2;

  // 滚动条宽度
  const ScrollBarWidthX = document.body.scrollHeight > window.innerHeight ? getScrollBarWidth() : 0;
  const ScrollBarWidthY = document.body.scrollWidth > window.innerWidth ? getScrollBarWidth() : 0;

  // 最大值
  const maxX = window.innerWidth - ScrollBarWidthX - width;
  const maxY = window.innerHeight - ScrollBarWidthY - height;

  // 最小值
  const minX = 0;
  const minY = 0;

  if (x >= maxX) x = maxX;
  if (y >= maxY) y = maxY;
  if (x <= minX) x = minX;
  if (y <= minY) y = minY;

  left.value = x;
  top.value = y;

  saveXY(x, y);

  open.value = open.value ? 1 : 0;
};


const mousedown = () => {
  document.body.style.userSelect = 'none';

  const timer = setTimeout(() => {
    previewIcon.value.style.cursor = "move";
    document.addEventListener('mousemove', move);

    document.addEventListener('mouseup', () => {
      if (!previewIcon.value) return;
      previewIcon.value.style.cursor = "pointer";
      document.body.style.userSelect = 'auto';
      document.removeEventListener('mousemove', move);
      // 来自移动的抬起事件需要关闭
      if (open.value === 0 || open.value === 1) {
        open.value = !!open.value;
      }
    });
  }, 100);

  document.addEventListener('mouseup', () => {
    clearTimeout(timer);
    document.body.style.userSelect = 'auto';
  });
};


const mouseup = () => {
  // 来自移动的抬起事件忽略
  if (open.value === 0 || open.value === 1) return;
  open.value = !open.value;
};

// 储存坐标信息
const KEY = 'HUNI_HEWXING_CN_PREVIEW_XY';
const saveXY = (x, y) => {
  localStorage.setItem(KEY, JSON.stringify({ x, y }));
};
const getXY = () => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none
}

.preview {
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 20;
}

.preview_icon {
  width: 50px;
  height: 50px;

  background-color: var(--color);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  border-radius: 50%;

  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);

  transition: 0.2s;

  &:hover {
    background-color: var(--color-light);
    box-shadow:
      0 2px 6px -1px rgba(0, 0, 0, .2),
      0 4px 7px 0 rgba(0, 0, 0, .14),
      0 1px 12px 0 rgba(0, 0, 0, .12);
  }

  cursor: pointer;
}

.iframe_box {
  transition: .2s ease-out;
  overflow: hidden;

  box-shadow:
    0 2px 2px -1px rgba(0, 0, 0, .2),
    0 1px 2px 0 rgba(0, 0, 0, .14),
    0 1px 4px 0 rgba(0, 0, 0, .12);


  &:hover {
    box-shadow:
      0 2px 6px -1px rgba(0, 0, 0, .2),
      0 1px 6px 0 rgba(0, 0, 0, .14),
      0 1px 8px 0 rgba(0, 0, 0, .12);
  }
}

.preview_iframe {
  border-radius: 10px;
  width: 375px;
  height: 667px;
  background-color: #fff;
}
</style>
