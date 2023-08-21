/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { CSSProperties } from '@vue/runtime-dom';

export const cssToObj = (css: string) => {
  const obj: Record<string, string> = {};
  css.split(';').forEach((prop) => {
    const parts = prop.trim().split(':');
    if (parts.length === 2) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      const cssProp = parts[0].trim().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      obj[cssProp] = parts[1].trim();
    }
  });
  return obj as CSSProperties;
};

export const objToCss = (obj: CSSProperties) => {
  let css = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const cssProp = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      css += `${cssProp}:${obj[key as keyof CSSProperties]};`;
    }
  }
  return css;
};

/**
 * @name 样式转换器
 * @description  短横线命名的css字符串<=>驼峰命名的css对象之间进行相关转换
 * @param {String||Object} value 短横线命名的css字符串|| 驼峰命名的css对象
 * @param {String} target =['string'|'object'] 指定输出类型 默认: string
 * @return {Object||String}  依据target
*/
export default function cssConverter(value: CSSProperties | string, target: 'string' | 'object' = 'string') {
  if (target === 'string') {
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return objToCss(value);
  }

  if (target === 'object') {
    if (typeof value === 'string') return cssToObj(value);
    if (typeof value === 'object') return value;
  }

  return {};
}

// TODO:ts专用函数 cssConverterString cssConverterObject 解决在ts中使用时类型准确性
/**
 * @name 样式转换器(指定为短横线命名的css字符串)
 * @param {String||Object} value 短横线命名的css字符串|| 驼峰命名的css对象
 * @return {Object} 驼峰命名的css对象
*/
// export const cssConverterString = (value:CSSProperties|string): CSSProperties => ({});

/**
 * @name 样式转换器(指定为驼峰命名的css对象)
 * @param {String||Object} value 短横线命名的css字符串|| 驼峰命名的css对象
 * @return {Object} 短横线命名的css字符串
*/
// export const cssConverterObject = (value:CSSProperties|string): string => '';
