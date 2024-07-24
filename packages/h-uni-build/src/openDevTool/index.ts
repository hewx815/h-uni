import { CreateLogContent } from "@h-uni/h-uni-utils";

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

export interface PlatformTask {
  platform: UNIPlatform;
  open: () => void;
  close: () => void;
}

export function run(options?: Options) {
  console.log(CreateLogContent.create(CreateLogContent.Levels.ERROR, CreateLogContent.Names.H_UNI_UTILS, "openDevTool"));
}
