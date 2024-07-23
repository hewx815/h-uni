import { createLogContent, LogModule, LogType } from "@h-uni/h-uni-utils";

/** uniapp 编译平台 */
export enum UNIPlatform {
  /** 微信小程序 */
  MP_WEIXIN = "mp-weixin",
}

export interface Options {
  platform: UNIPlatform;
  paths: {
    [key in UNIPlatform]: string
  }[];
}

export default function (options: Options) {
  console.log(createLogContent(LogType.ERROR, LogModule.H_UNI_UTILS, "openDevTool"));
}
