/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import type { CSSProperties } from '@vue/runtime-dom';

function cssToObj(css: string) {
  const obj: Record<string, string> = {};
  css.split(';').forEach((prop) => {
    const parts = prop.trim().split(':');
    if (parts.length === 2) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      const cssProp = parts[0]
        .trim()
        .replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      obj[cssProp] = parts[1].trim();
    }
  });
  return obj as CSSProperties;
}

function objToCss(obj: CSSProperties) {
  let css = '';
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const cssProp = key.replace(
        /[A-Z]/g,
        (match) => `-${match.toLowerCase()}`,
      );
      css += `${cssProp}:${obj[key as keyof CSSProperties]};`;
    }
  }
  return css;
}

/**
 * 转换样式指定为短横线命名的css字符串
 */
function cssConverterString(value?: string | CSSProperties): string {
  if (typeof value === 'object') return objToCss(value);
  if (typeof value === 'string') return value;
  return '';
}

/**
 *  转换样式指定为驼峰命名的css对象
 */
function cssConverterObject(value?: string | CSSProperties): CSSProperties {
  if (typeof value === 'string') return cssToObj(value);
  if (typeof value === 'object') return value;
  return {};
}

/**
 *  转换样式指定为短横线命名的css字符串/指定为驼峰命名的css对象
 */
function cssConverter(
  value?: CSSProperties | string,
  target: 'string' | 'object' = 'string',
):CSSProperties | string {
  if (value) {
    if (target === 'string') {
      if (typeof value === 'string') return value;
      if (typeof value === 'object') return objToCss(value);
    }

    if (target === 'object') {
      if (typeof value === 'string') return cssToObj(value);
      if (typeof value === 'object') return value;
    }

    Error('target must be "string" or "object"');
    return '';
  }

  if (target === 'string') return '';
  if (target === 'object') return {};
  Error('target must be "string" or "object"');
  return '';
}

export { cssConverterString, cssConverterObject, cssConverter };

export default cssConverter;
