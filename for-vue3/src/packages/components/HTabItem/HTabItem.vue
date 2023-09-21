<script lang="ts" setup>
/**
 * @name HTabItem
 * @description HTab  item
 * @property {String||Number||Boolean}  value
 * @property {String}  label 显示文字
 * @property {String}  direction =['x'|'y'] 图片与文字方向  x=横向  y=纵向
 * @property {String}  label 文本内容
 * @property {String}  activeLabel 选中后的文本内容
 * @property {String||Object}  labelStyle 文本内容的样式
 * @property {String||Object}  activeLabelStyle 选中后文本内容的样式
 * @property {String}  image 图片链接
 * @property {String}  activeImage 选中后的图片链接
 * @property {String||Object}  imageStyle 图片的样式
 * @property {String||Object}  activeImageStyle 选中后的图片的样式
 * @property {String||Object}  styles 选项卡的样式
 * @property {String||Object}  activeStyle 选中后选项卡的样式
 * @slot default
*/
import type { CSSProperties } from 'vue';
import {
  computed, onMounted, nextTick, inject, ref, getCurrentInstance,
} from 'vue';
import type HTab from '../HTab/HTab.vue';
import { cssConverterObject, cssConverterString } from '../../utils/index';
import * as InjectionKeys from '../HTab/InjectionKeys';

type HTabType = InstanceType<typeof HTab>;

const getHTabDirection = inject(InjectionKeys.getHTabDirectionKey, () => 'y');
const getHTabValue = inject(InjectionKeys.getHTabValueKey, () => '');
const setItem = inject(InjectionKeys.setItemKey, () => { });
const itemClick = inject(InjectionKeys.itemClickKey, () => { });

const props = withDefaults(defineProps<{
  value: string | number | boolean;
  direction?: 'x' | 'y';
  label?: string | number;
  activeLabel?: string;
  labelStyle?: string | CSSProperties;
  activeLabelStyle?: string | CSSProperties;
  image?: string;
  activeImage?: string;
  imageStyle?: string | CSSProperties;
  activeImageStyle?: string | CSSProperties;
  styles?: string | CSSProperties;
  activeStyle?: string | CSSProperties;
}>(), {
  direction: 'y',
  label: '',
  activeLabel: '',
  labelStyle: '',
  activeLabelStyle: '',
  image: '',
  activeImage: '',
  imageStyle: '',
  activeImageStyle: '',
  styles: '',
  activeStyle: '',
});

const uid = getCurrentInstance()?.uid;

const getHTabDirectionCopy = ref<typeof getHTabDirection>(() => 'y');

const getHTabValueCopy = ref<typeof getHTabValue>(() => '');

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const HTabValue = computed(() => getHTabValueCopy.value());

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const HTabDirection = computed(() => getHTabDirectionCopy.value());

const itemStyles = computed(() => cssConverterString({
  ...cssConverterObject(props.styles),
  ...cssConverterObject(HTabValue.value === props.value ? props.activeStyle : {}),
}));

const imageSrc = computed(() => (HTabValue.value === props.value && props.activeImage ? props.activeImage : props.image));

const imageStyles = computed(() => cssConverterString({
  ...cssConverterObject(props.imageStyle),
  ...cssConverterObject(HTabValue.value === props.value ? props.activeImageStyle : {}),
}));

const labelText = computed(() => (HTabValue.value === props.value && props.activeLabel ? props.activeLabel : props.label));

const labelStyles = computed(() => cssConverterString({
  ...cssConverterObject(props.labelStyle),
  ...cssConverterObject(HTabValue.value === props.value ? props.activeLabelStyle : {}),
}));

onMounted(() => {
  getHTabValueCopy.value = getHTabValue as () => HTabType['modelValue'];
  getHTabDirectionCopy.value = getHTabDirection;
  setItem(props.value, resize, select);
});

const resize = (): Promise<UniApp.NodeInfo> => new Promise((resolve) => {
  nextTick(() => {
    uni.createSelectorQuery().select(`.h_tab_item-${uid}`).boundingClientRect((data) => {
      resolve(data as UniApp.NodeInfo);
    })
      .exec();
  })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
});

const emit = defineEmits<{
  (e: 'select'): void;
}>();

const select = () => {
  emit('select');
};

defineExpose({ select });

</script>

<template>
  <view
    class="h_tab_item"
    :class="[
      `h_tab_item-${direction}`,
      `h_tab_item-tab-${HTabDirection}`,
      `h_tab_item-${uid}`,
    ]"
    :style="itemStyles"
    @click="itemClick(value)"
  >
    <slot>
      <image
        v-if="image"
        class="h_tab_item_image"
        :class="[`h_tab_item_image-${direction}`]"
        :src="imageSrc"
        :style="imageStyles"
      />
      <text
        class="h_tab_item_label"
        :class="[`h_tab_item_label-${direction}`]"
        :style="labelStyles"
      >
        {{ labelText }}
      </text>
    </slot>
  </view>
</template>

<style lang='scss' scoped>
.h_tab_item {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.h_tab_item-y {
  flex-direction: column;
}

.h_tab_item-x {
  flex-direction: row;
}

.h_tab_item-tab-y {
  width: 100%;
  height: auto;
  padding: 20rpx 10rpx;
  justify-content: flex-start;
}

.h_tab_item-tab-x {
  width: auto;
  height: 100%;
  padding: 10rpx 20rpx;
  justify-content: center;
}

.h_tab_item_image {
  width: 100rpx;
  height: 100rpx;
}

.h_tab_item_image-y {
  width: 100rpx;
  height: 100rpx;
}

.h_tab_item_image-x {
  width: 40rpx;
  height: 40rpx;
}

.h_tab_item_label {
  font-size: 30rpx;
  line-height: 30rpx;
}

.h_tab_item_label-y {
  padding: 4rpx 0 0 0;
}

.h_tab_item_label-x {
  white-space: nowrap;
  padding: 0 0 0 4rpx;
}
</style>
