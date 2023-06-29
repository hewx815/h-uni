/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

export const cssToObj = (css) => {
  const obj = {};
  css.split(';').forEach((prop) => {
    const parts = prop.trim().split(':');
    if (parts.length === 2) {
      const cssProp = parts[0].trim().replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      obj[cssProp] = parts[1].trim();
    }
  });
  return obj;
};

export const objToCss = (obj) => {
  let css = '';
  for (const prop in obj) {
    const cssProp = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
    css += `${cssProp}:${obj[prop]};`;
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
export default function cssConverter(value, target = 'string') {
  if (typeof target === 'string') {
    if (typeof value === 'string') return value;
    if (typeof value === 'object') return objToCss(value);
  }

  if (typeof target === 'object') {
    if (typeof value === 'string') return cssToObj(value);
    if (typeof value === 'object') return value;
  }

  return undefined;
}
