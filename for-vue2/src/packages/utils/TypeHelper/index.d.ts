/* eslint-disable @typescript-eslint/no-explicit-any */

import { StyleValue } from '@vue/runtime-dom';
import { DefineComponentsHelper } from './utils';
import UniComponents from './uniComponents/index';

export * from './uniComponents/index';

type UniCommonProps = {
  id: string;
  ref: string,
  class: any;
  style: StyleValue;
};

type UniCommonEvents = {
  touchstart: () => void;
  touchmove: () => void;
  touchend: () => void;
  tap: () => void;
  click: () => void;
  longpress: () => void;
};

// 扩展uni全局内置组件
declare module '@vue/runtime-dom' {
  interface GlobalComponents extends DefineComponentsHelper<UniComponents, UniCommonProps, UniCommonEvents> { }
}
