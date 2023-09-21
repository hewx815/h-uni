import type { InjectionKey } from 'vue';
import type HTab from './HTab.vue';

type HTabType = InstanceType<typeof HTab>;

export const getHTabDirectionKey = Symbol('获取 HTab direction 属性值') as InjectionKey<() => HTabType['direction']>;
export const getHTabValueKey = Symbol('获取 HTab modelValue 属性值') as InjectionKey<() => HTabType['modelValue']>;
export const setItemKey = Symbol('存储 HTabItem 组件信息') as InjectionKey<HTabType['setItem']>;
export const itemClickKey = Symbol('HTabItem 组件点击事件') as InjectionKey<HTabType['itemClick']>;
