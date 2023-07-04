<template>
  <div
    class="preview"
    :style="{ top: `${top}px`, left: `${left}px` }"
  >
    <div
      class="preview_icon"
      :style="{
        backgroundImage: `url(${open ? closeSvg : phoneSvg})`,
        backgroundPosition: open ? '53%' : '70%',
        backgroundSize: open ? '50%' : '60%',
      }"
      @mousedown="iconMouseDown"
      @mouseup="iconMouseUp"
    />
    <iframe
      class="preview_iframe"
      :style="iframeStyle"
      :src="url"
      scrolling="no"
      frameborder="0"
    />
  </div>
</template>

<script setup>
import closeSvg from '../static/close.svg'
import phoneSvg from '../static/phone.svg'
import { defineProps, computed, getCurrentInstance, ref } from 'vue';

const props = defineProps({
  path: {
    type: String,
    required: true
  },
})



// previewBtn path
const previewBtnPath = ref('')
// iframe 打开状态
const open = ref(false)
// 是否处于拖拽中
const inDrag = ref(false)
const top = ref(0)
const left = ref(0)

// iframe src
const url = computed(() => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '' : "http://localhost:8080/#/"
  return baseUrl + (previewBtnPath.value ? previewBtnPath.value : props.path)
})

// iframe样式
const iframeStyle = computed(() => {
  if (open.value) {
    return {
      width: '375px',
      height: '667px',
    }
  } else {
    return {
      width: '0px',
      height: '0px',
    }
  }
})

// preview跟随鼠标移动
const move = (e) => {
  console.log(e);
  left.value = e.pageX >= 0 ? e.pageX : 0
  top.value = e.pageY >= 0 ? e.pageY : 0
}


// 图标 鼠标按下事件
const iconMouseDown = () => {
  inDrag.value = true
  document.addEventListener("mousemove", move)
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', move)
  })
}

// 图标 鼠标弹起事件
const iconMouseUp = () => {
  open.value = !open.value
}


const { proxy } = getCurrentInstance()
// PhonePreview 组件调用此方法 更改 previewPath
proxy.$root.preview = (url) => {
  previewPath.value = url
}


</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  display: none
}

.preview {
  position: fixed;
  left: 500px;
  top: 50px;
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
  background-position: 70%;
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
      0 2px 4px -1px rgba(0, 0, 0, .2),
      0 1px 4px 0 rgba(0, 0, 0, .14),
      0 1px 6px 0 rgba(0, 0, 0, .12);
  }
}
</style>
