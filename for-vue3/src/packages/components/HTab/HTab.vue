<script lang="ts" setup>
/**
 * @name HTab 标签栏
 * @description 支持横向和纵向布局的标签栏
 * @property {String||Number||Boolean} value 选中的值
 * @property {String} direction =['x'|'y'] 标签栏的方向  x=横向  y=纵向 默认：y
 * @property {Number||String} width tab宽度 默认: direction=x:100vw:   direction=y:150rpx
 * @property {Number||String} height tab高度 默认: direction=x:150rpx  direction=y:1246rpx
 * @property {String} activeAspect 滑块的朝向 =[none,left,right,top,bottom]
 * @property {Number} activeDuration 滑块过渡时间 默认:500
 * @property {String} activeBackgroundColor 滑块的背景颜色
 * @property {Boolean} activeStyle 滑块的样式
 * @property {Boolean} scrollAnimation 是否开启滚动动画
 * @property {Boolean} activeAnimation 是否开启滑块动画
 * @property {Boolean} scrollCenter 是否开启选中项自动滚动至中间功能
 * @property {Boolean} showActive 是否开启滑块
 * @event input .
 * @slot default <HTabItem/>
 * @slot active 自定义滑块
*/
import type { CSSProperties } from 'vue';
import {
  computed, ref, provide, onMounted, getCurrentInstance, nextTick, reactive,
} from 'vue';
import { cssConverterObject, cssConverterString } from '../../utils/index';
import type HTabItem from '../HTabItem/HTabItem.vue';
import * as InjectionKeys from './InjectionKeys';

type HTabItemType = InstanceType<typeof HTabItem>;

const props = withDefaults(defineProps<{
  modelValue: string | number | boolean;
  direction?: 'x' | 'y';
  width?: string | number;
  height?: string | number;
  activeAspect?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  activeDuration?: number;
  activeBackgroundColor?: string;
  activeStyle?: string | CSSProperties;// TODO: 缺少类型 object
  scrollAnimation?: boolean;
  activeAnimation?: boolean;
  scrollCenter?: boolean;
  showActive?: boolean;
}>(), {
  direction: 'y',
  width: '',
  height: '',
  activeAspect: 'none',
  activeDuration: 500,
  activeBackgroundColor: '#FFFFFF',
  activeStyle: '',
  scrollAnimation: true,
  activeAnimation: true,
  scrollCenter: true,
  showActive: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue): void;
}>();

const uid = getCurrentInstance()?.uid;

// scroll-view 滚动信息
const scrollViewScroll = ref<UniNamespace.NodeInfo>({});
// scroll-view 节点信息
const scrollViewRect = ref<UniNamespace.NodeInfo>({});
// Container 节点信息
const containerRect = ref<UniNamespace.NodeInfo>({});

type ItemsItem = UniNamespace.NodeInfo & {
  value: HTabItemType['$props']['value'];
  select: HTabItemType['select'];
  resize: () => Promise<UniNamespace.NodeInfo>;
};
// htabitem 信息
const items = reactive<Array<ItemsItem>>([]);

// scroll-view 宽
const scrollWidth = computed<string>(() => {
  if (props.width) {
    if (typeof props.width === 'number') return `${props.width}px`;
    return props.width;
  }
  return props.direction === 'x' ? '100vw' : '160rpx';
});

// scroll-view 高
const scrollHeight = computed<string>(() => {
  if (props.height) {
    if (typeof props.height === 'number') return `${props.height}px`;
    return props.height;
  }
  return props.direction === 'x' ? '160rpx' : '1000rpx';
});

// 滚动到中间为止的坐标值
const scrollXY = computed<{ x: number, y: number; }>(() => {
  if (!props.scrollCenter) {
    return {
      x: 0,
      y: 0,
    };
  }

  const item = items.find((itemsItem) => itemsItem.value === props.modelValue);
  if (!item) {
    return {
      x: 0,
      y: 0,
    };
  }
  if (item.dataset && item.select) {
    item.select();
  }
  const {
    top, height, left, width,
  } = item;

  if (
    scrollViewRect.value.height === undefined
    || scrollViewRect.value.width === undefined
    || items[0].left === undefined
    || items[0].top === undefined
    || top === undefined
    || left === undefined
    || width === undefined
    || height === undefined
  ) {
    return {
      x: 0,
      y: 0,
    };
  }

  const centerHeight = scrollViewRect.value.height / 2;
  const centerWidth = scrollViewRect.value.width / 2;

  return {
    x: (left - items[0].left + width / 2) - centerWidth,
    y: (top - items[0].top + height / 2) - centerHeight,
  };
});

// 滑块样式
const activeStyles = computed<string>(() => {
  if (!props.showActive) return '';
  const item = items.find((itemsItem) => itemsItem.value === props.modelValue);
  if (!item) return '';
  if (
    item.right === undefined
    || item.left === undefined
    || item.bottom === undefined
    || item.top === undefined
    || containerRect.value.top === undefined
    || containerRect.value.left === undefined

  ) return '';
  const width = item ? item.right - item.left : 0;
  const height = item ? item.bottom - item.top : 0;

  const top = item.top - containerRect.value.top;
  const left = item.left - containerRect.value.left;
  return cssConverterString({
    width: `${width}px`,
    height: `${height}px`,
    top: `${top}px`,
    left: `${left}px`,
    transition: `${props.activeAnimation ? (props.activeDuration / 1000) : 0}s`,
    '--h-tab-active-background': props.activeBackgroundColor,
    ...cssConverterObject(props.activeStyle),
  });
});

onMounted(() => {
  resize().catch((error) => {
    // eslint-disable-next-line no-console
    console.error('[HTab]', error);
  });
});

// 设置item组件信息
const setItem = (
  value: typeof props.modelValue,
  resizeFn: () => Promise<UniNamespace.NodeInfo>,
  select: HTabItemType['select'],
) => {
  items.push({ value, resize: resizeFn, select });
};

// item组件点击事件
const itemClick = (value: typeof props.modelValue) => {
  emit('update:modelValue', value);
};

// 获取 scroll-view rect信息
const getRect = () => new Promise((resolve) => {
  uni.createSelectorQuery().select(`.h_tab-${uid}`).boundingClientRect((data) => {
    resolve(data);
  })
    .exec();
});

// 获取 scroll-view scroll信息
const getScroll = () => new Promise((resolve) => {
  uni.createSelectorQuery().select(`.h_tab-${uid}`).scrollOffset((data) => {
    resolve(data);
  })
    .exec();
});

// 获取 scroll-h_tab_container rect信息
const getContainerRect = () => new Promise((resolve) => {
  uni.createSelectorQuery().select(`.h_tab_container-${uid}`).boundingClientRect((data) => {
    resolve(data);
  })
    .exec();
});
const resize = async (value?: typeof props.modelValue) => {
  await nextTick();
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  setTimeout(async () => {
    await nextTick();
    const arr = value
      ? [items.find((item) => item.value === value)?.resize()]
      : [...items.map((item) => item.resize())];
    Promise.all([
      getRect(),
      getScroll(),
      getContainerRect(),
      ...arr,
    ])
      .then(([rect, scroll, containerRectData, ...itemsRect]) => {
        scrollViewRect.value = rect || {};
        scrollViewScroll.value = scroll || {};
        containerRect.value = containerRectData || {};
        if (value) {
          const index = items.findIndex((item) => item.value === value);
          if (!itemsRect[0]) return;
          items[index] = { ...items[index], ...itemsRect[0] };
        } else {
          itemsRect.forEach((itemRect, index) => {
            items[index] = { ...items[index], ...itemRect };
          });
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }, 0);
};

defineExpose({
  setItem,
  itemClick,
  resize,
});

// 提供给子组件的处数据
provide(InjectionKeys.getHTabDirectionKey, () => props.direction);
provide(InjectionKeys.getHTabValueKey, () => props.modelValue);
provide(InjectionKeys.setItemKey, setItem);
provide(InjectionKeys.itemClickKey, itemClick);

</script>

<template>
  <scroll-view
    :class="[`h_tab`, `h_tab-${uid}`]"
    :style="{ height: scrollHeight, width: scrollWidth }"
    :scroll-x="direction === 'x'"
    :scroll-y="direction === 'y'"
    :scroll-top="scrollXY.y"
    :scroll-left="scrollXY.x"
    :show-scrollbar="false"
    :scroll-with-animation="scrollAnimation"
  >
    <!-- 滑块 -->
    <view
      v-if="showActive"
      class="h_tab_active"
      :class="[
        `h_tab_active-${activeAspect}`,
        `h_tab_active-${uid}`
      ]"
      :style="activeStyles"
    >
      <slot name="active" />
    </view>
    <!-- 选项卡容器 -->
    <view
      class="h_tab_container"
      :class="[
        `h_tab_container-${direction}`,
        `h_tab_container-${uid}`
      ]"
    >
      <slot />
    </view>
  </scroll-view>
</template>

<style lang='scss' scoped>
.h_tab {
  background-color: #ececec;
  position: relative;

  ::-webkit-scrollbar {
    display: none;
  }

  .h_tab_container {
    display: flex;
    position: relative;
  }

  .h_tab_container-y {
    width: 100%;
    height: auto;
    flex-direction: column;
  }

  .h_tab_container-x {
    width: auto;
    height: 100%;
    white-space: nowrap;
    flex-direction: row;
  }

  .h_tab_active {
    width: 100%;
    position: absolute;
    background-color: var(--h-tab-active-background);

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 20rpx;
      height: 20rpx;
    }

    &::after {
      content: '';
      position: absolute;
      display: block;
      width: 20rpx;
      height: 20rpx;
    }
  }

  .h_tab_active-left {
    border-radius: 20rpx 0rpx 0rpx 20rpx;

    &::before {
      content: '';
      right: 0;
      top: -20rpx;
      background-image:
        radial-gradient(circle at top left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      right: 0;
      bottom: -20rpx;
      background-image:
        radial-gradient(circle at bottom left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-right {
    border-radius: 0rpx 20rpx 20rpx 0rpx;

    &::before {
      content: '';
      left: 0;
      top: -20rpx;
      background-image:
        radial-gradient(circle at top right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      left: 0;
      bottom: -20rpx;
      background-image:
        radial-gradient(circle at bottom right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-top {
    border-radius: 20rpx 20rpx 0rpx 0rpx;

    &::before {
      content: '';
      bottom: 0;
      left: -20rpx;
      background-image:
        radial-gradient(circle at top left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      bottom: 0;
      right: -20rpx;
      background-image:
        radial-gradient(circle at top right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }

  .h_tab_active-bottom {
    border-radius: 0rpx 0rpx 20rpx 20rpx;

    &::before {
      content: '';
      top: 0;
      left: -20rpx;
      background-image:
        radial-gradient(circle at bottom left,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }

    &::after {
      content: '';
      top: 0;
      right: -20rpx;
      background-image:
        radial-gradient(circle at bottom right,
          transparent 20rpx,
          var(--h-tab-active-background) 0,
        );
    }
  }
}
</style>
