import {
  DefineComponent,
  ExtractDefaultPropTypes,
  PropType,
} from '@vue/runtime-dom';

export type DefinePropsOptions<Props> = {
  [K in keyof Props]: {
    type: PropType<Props[K]>;
    default: Props;
  }
};

export type EmitsToEvents<Emits> = {
  [K in keyof Emits as `on${Capitalize<K & string>}`]?: Emits[K];
};

export type DefineComponentsHelper<Components = { props: object; events: object; }, CommonProps = object, CommonEmits = object> = {
  [K in keyof Components]: DefineComponent<
    DefinePropsOptions<Components[K]['props'] & CommonProps>,
    object,
    object,
    object,
    object,
    object,
    object,
    Components[K]['events'] & CommonEmits,
    string,
    object,
    EmitsToEvents<Components[K]['events'] & CommonEmits>,
    ExtractDefaultPropTypes<DefinePropsOptions<Components[K]['props'] & CommonProps>>,
    object
  >
};
