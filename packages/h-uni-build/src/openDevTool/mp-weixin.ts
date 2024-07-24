import { PlatformTask, UNIPlatform } from "./index";

export default class MpWeixin implements PlatformTask {
  platform: UNIPlatform;
  open: () => void;
  close: () => void;

  constructor() {
    this.platform = UNIPlatform.MP_WEIXIN;
    this.open = () => {
      console.log("open mp-weixin");
    };
    this.close = () => {
      console.log("close mp-weixin");
    };
  }
}
