/**
 * 日志类型
 */
export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
* 日志模块名称
*/
export enum LogName {
  H_UNI_UTILS = "H_UNI_UTILS",
}

/**
 * 创建日志内容
 * @param name 日志模块名称
 * @param content 日志内容
 * @param level 日志类型
*/
export function createContent(
  name: LogName,
  content: string,
  level: LogLevel = LogLevel.INFO,
): string {
  return `[${level}][${name}]${content}`;
}
