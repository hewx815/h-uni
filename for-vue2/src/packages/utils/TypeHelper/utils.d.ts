import {
  DefineComponent,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  SlotsType,
  ExtractDefaultPropTypes,
  PropType,
} from '@vue/runtime-dom';

export type DefinePropsOptions<T> = {
  [K in keyof T]: {
    type: PropType<T[K]>;
    default: T;
  }
};

export type DefineComponentsHelper<T = { props: object; events: object; }, CommonProps = object, CommonEvents = object> = {
  [K in keyof T]: DefineComponent<
    DefinePropsOptions<T[K]['props'] & CommonProps>,
    unknown,
    unknown,
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    T[K]['events'] & CommonEvents,
    string,
    unknown,
    unknown,
    ExtractDefaultPropTypes<DefinePropsOptions<T[K]['props'] & CommonProps>>,
    SlotsType
  >
};
