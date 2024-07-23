/**
   * 日志类型
  */
export enum LogType {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
   * 日志模块
  */
export enum LogModule {
  H_UNI_UTILS = "H_UNI_UTILS",
}
export function createLogContent(logType: LogType, logModule: LogModule, content: string): string {
  return `[${logType}][${logModule}]${content}`;
}
