<template>
  <div
    class="preview"
    ref="previewDom"
    draggable="true"
    :style="{ top: `${top}px`, left: `${left}px` }"
    :ondragstart="ondragstart"
    :ondrag="drag"
    :ondragend="drag"
  >
    <div
      class="preview_icon"
      :style="{
        backgroundImage: `url(${open ? closeSvg : phoneSvg})`,
      }"
      @click="open = !open;"
    />
    <iframe
      class="preview_iframe"
      :style="iframeStyle"
      :src="url"
      scrolling="no"
      frameborder="0"
    />
  </div>
  <div ref="dragEmptyDom"></div>
</template>

<script setup>
import closeSvg from '../static/close.svg';
import phoneSvg from '../static/phone.svg';
import { defineProps, computed, getCurrentInstance, ref } from 'vue';

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
// 是否处于拖拽中
const top = ref(0);
const left = ref(0);
const previewDom = ref(null);
const dragEmptyDom = ref(null);

// iframe src
const url = computed(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : "http://localhost:8080/#/";
  return baseUrl + (previewBtnPath.value ? previewBtnPath.value : props.path);
});

// iframe样式
const iframeStyle = computed(() => {
  if (open.value) {
    return {
      width: '375px',
      height: '667px',
    };
  } else {
    return {
      width: '0px',
      height: '0px',
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

// 移动 preview
const drag = (e) => {
  // 工具栏 宽高
  const toolBarWidth = window.outerWidth - window.innerWidth;
  const toolBarHeight = window.outerHeight - window.innerHeight;
  // 浏览器距离屏幕 距离
  const browserLeft = window.screenX;
  const browserTop = window.screenY;

  // 鼠标距离屏幕 距离
  const mouseLeft = e.screenX;
  const mouseTop = e.screenY;

  const ScrollBarWidth = getScrollBarWidth();
  left.value = mouseLeft - browserLeft - toolBarWidth - 25;
  top.value = mouseTop - browserTop - toolBarHeight - 25;
};

// 开始拖动
const ondragstart = (e) => {
  e.dataTransfer.setDragImage(dragEmptyDom.value, 0, 0);
};

const { proxy } = getCurrentInstance();
// PhonePreview 组件调用此方法 更改 previewPath
proxy.$root.preview = (url) => {
  previewPath.value = url;
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

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color);
  background-image: url('../static/phone.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60%;
  border-radius: 50%;

  box-shadow:
    0 2px 4px -1px rgba(0, 0, 0, .2),
    0 4px 5px 0 rgba(0, 0, 0, .14),
    0 1px 10px 0 rgba(0, 0, 0, .12);

  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-light);
    box-shadow:
      0 2px 6px -1px rgba(0, 0, 0, .2),
      0 4px 7px 0 rgba(0, 0, 0, .14),
      0 1px 12px 0 rgba(0, 0, 0, .12);
  }
}


.preview_iframe {
  width: 375px;
  height: 667px;

  border-radius: 4px;

  background-color: #fff;

  box-shadow:
    0 2px 2px -1px rgba(0, 0, 0, .2),
    0 1px 2px 0 rgba(0, 0, 0, .14),
    0 1px 4px 0 rgba(0, 0, 0, .12);

  transition: width, height, 0.2s;

  &:hover {
    box-shadow:
      0 2px 6px -1px rgba(0, 0, 0, .2),
      0 1px 6px 0 rgba(0, 0, 0, .14),
      0 1px 8px 0 rgba(0, 0, 0, .12);
  }
}
</style>
