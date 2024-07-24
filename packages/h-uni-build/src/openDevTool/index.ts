import { logUtils, nodeUtils } from "@h-uni/h-uni-utils";
import { existsSync } from "fs";

/** uniapp 编译平台 */
export enum UNIPlatform {
  /** 微信小程序 */
  MP_WEIXIN = "mp-weixin",
}

export interface Options {
  platform: UNIPlatform;
  /** 自定义开发者工具目录 */
  customPaths?: {
    [key in UNIPlatform]: string
  }[];
}

export interface PlatformCommandAction {
  /** 平台名称 */
  platform: UNIPlatform;
  /** 打开开发者工具 */
  open: () => void;
  /** 关闭开发者工具 */
  close: () => void;
}

export class PlatformCommandWithCustomPath {
  customPath = "";
  constructor(customPath?: string) {
    customPath && (this.customPath = customPath);
  }
}

type PlatformCommand = PlatformCommandWithCustomPath & PlatformCommandAction;

export async function run(options: Options) {
  const customPath = options?.customPaths?.find(item => item[options.platform]);
  const commandPath = nodeUtils.defineAbsolutePathByCurrent(import.meta.url, `./commands/${options.platform}.ts`);

  // 该平台不支持
  if (existsSync(commandPath)) {
    const content = logUtils.createContent(logUtils.LogName.H_UNI_UTILS, "该平台不支持", logUtils.LogLevel.ERROR);
    throw new Error(content);
  }

  const Command = await import(commandPath) as PlatformCommand;

  console.log(Command);

  console.log(logUtils.createContent(logUtils.LogName.H_UNI_UTILS, "openDevTool"));
}
