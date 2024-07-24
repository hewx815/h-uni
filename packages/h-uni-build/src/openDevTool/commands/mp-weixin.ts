import { PlatformCommandAction, PlatformCommandWithCustomPath, UNIPlatform } from "../index";

export default class MpWeixin extends PlatformCommandWithCustomPath implements PlatformCommandAction {
  platform: UNIPlatform;
  open: () => void;
  close: () => void;

  constructor() {
    super();
    this.platform = UNIPlatform.MP_WEIXIN;
    this.open = () => {
      console.log("open mp-weixin");
    };
    this.close = () => {
      console.log("close mp-weixin");
    };
  }
}
