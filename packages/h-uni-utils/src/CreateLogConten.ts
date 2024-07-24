/**
 * 日志类型
 */
export enum Levels {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
* 日志模块名称
*/
export enum Names {
  H_UNI_UTILS = "H_UNI_UTILS",
}

/**
 * 创建日志内容
 * @param level 日志类型
 * @param name 日志模块名称
 * @param content 日志内容
*/
export function create(
  level: Levels,
  name: Names,
  content: string,
): string {
  return `[${level}][${name}]${content}`;
}
