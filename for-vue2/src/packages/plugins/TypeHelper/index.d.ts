/* eslint-disable @typescript-eslint/no-explicit-any */
import { StyleValue } from '@vue/runtime-dom';
import { DefineComponentsHelper } from './utils';
import UniComponents, {
  View,
  Button,
  Form,
  Input,
  Label,
  Textarea,
  Audio,
  Video,
  Canvas,
} from './uniComponents/index';

export * from './uniComponents/index';
export * from './utils';

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

// 重名组件
type SameNameCompoinents={
   view: View,
   button: Button,
   form: Form,
   input: Input,
   label: Label,
   textarea: Textarea,
   audio: Audio,
   video: Video,
   canvas: Canvas,
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends DefineComponentsHelper<SameNameCompoinents, UniCommonProps, UniCommonEvents>{ }
  }
}
