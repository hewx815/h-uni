/**
 * Lottie动画组件，动画资源参考[Lottie官方链接](https://airbnb.design/lottie/)
 * - animation-view组件是uts组件，需下载插件：[animation-view](https://ext.dcloud.net.cn/plugin?name=uni-animation-view)，仅App端nvue页面支持
 * - uts组件需 HBuilderX 3.7.0+
 * - App端真机运行需要打[自定义基座](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html#customplayground)
 * - 平台差异说明：App、百度小程序
 * - 详见： https://uniapp.dcloud.net.cn/component/animation-view.html
*/
export interface AnimationView {
  props: {
    /**
     * 动画资源地址，支持本地路径和网络路径
     * - 默认： 111
    */
    path: string;
    /**
     * 动画是否循环播放
     * - 默认： false
    */
    loop: boolean;
    /**
     * 动画是否自动播放
     * - 默认： true
    */
    autoplay: boolean;
    /**
     * 动画操作，可取值 play、pause、stop
     * - 默认： play
    */
    action: string;
    /**
     * 是否隐藏动画
     * - 默认： true
    */
    hidden: boolean;
  },
  events: object;
}

/**
 * 音频。
 * - 平台差异说明：App、H5、微信小程序、百度小程序
 * - 微信小程序平台自基础库 1.6.0 版本开始，不再维护  组件，推荐使用API方式而不是组件方式来播放音频。API见 uni.createInnerAudioContext 替代。
*/
export interface Audio {
  props: {
    /**
     *  audio 组件的唯一标识符
    */
    id: string;
    /**
     *  要播放音频的资源地址
    */
    src: string;
    /**
     *  是否循环播放
     * - 默认： false
    */
    loop: boolean;
    /**
     *  是否显示默认控件
     * - 默认： false
    */
    controls: false;
    /**
     *  默认控件上的音频封面的图片资源地址，如果 controls 属性值为 false 则设置 poster 无效 controls 属性值为 false 则设置 poster 无效唯一标识符
    */
    poster: string;
    /**
     *  默认控件上的音频名字，如果 controls 属性值为 false 则设置 name 无效
     * - 默认： 未知音频
    */
    name: string;
    /**
     *  默认控件上的作者名字，如果 controls 属性值为 false 则设置 author 无效
     * - 默认： 未知作者
    */
    author: string;
  },
  events: {
    /**
     * 当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}
     * - 返回错误码
     *    - 1 获取资源被用户禁止
     *    - 2 网络错误
     *    - 3 解码错误
     *    - 4 不合适资源
    */
    error: (e: { detail: { errMsg: 1 | 2 | 3 | 4; }; }) => void,
    /**
     * 当开始/继续播放时触发play事件
    */
    play: () => void,
    /**
     * 当暂停播放时触发 pause 事件
    */
    pause: () => void,
    /**
     * 当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}
    */
    timeupdate: (e: { detail: { currentTime: number, duration: number; }; }) => void,
    /**
     * 当播放到末尾时触发 ended 事件
    */
    ended: () => void,
  };
}

/**
 * 页面内嵌的区域相机组件。注意这不是点击后全屏打开的相机。
 * - 平台差异说明：App、H5、360小程序 不支持
*/
export interface Camera {
  props: {
    /**
     * 应用模式，有效值为 normal(相机模式), scanCode(扫码模式)，不支持动态修改
     * - 默认： normal
    */
    mode: 'normal' | 'scanCode';
    /**
     * 分辨率，有效值为low, medium, high，不支持动态修改
     * - 默认： medium
     * - 平台差异： 微信小程序2.10.0、抖音小程序、飞书小程序
    */
    resolution: 'low' | 'medium' | 'high';
    /**
     * 前置或后置摄像头，值为front, back
     * - 默认： back
    */
    devicePosition: 'front' | 'back';
    /**
     * 闪光灯，值为auto, on, off, torch
     * - 默认： auto
    */
    flash: 'auto' | 'on' | 'off' | 'torch';
    /**
     * 指定期望的相机帧数据尺寸，值为small, medium, large
     * - 默认： medium
     * - 平台差异： 微信小程序2.7.0、快应用、支付宝小程序、抖音小程序
    */
    frameSize: 'small' | 'medium' | 'large';
    /**
     * 相机拍照，录制的分辨率。有效值为 360P、540P、720P、1080P、max。
     * - 默认： 720P
     * - 平台差异： 支付宝小程序1.23.0
    */
    outputDimension: '360P' | '540P' | '720P' | '1080P' | 'max';
  },
  events: {
    /**
     * 摄像头在非正常终止时触发，如退出后台等情况
    */
    stop: () => void;
    /**
     * 用户不允许使用摄像头时触发
    */
    error: () => void;
    /**
     * 相机初始化完成时触发，e.detail = {maxZoom}
     * - 平台差异： 微信小程序2.7.0、抖音小程序1.78.0、飞书小程序、快手小程序
    */
    initdone: () => void;
    /**
     * 相机初始化成功时触发。event.detail = {maxZoom}
     * - 平台差异： 支付宝小程序1.24.3
    */
    ready: () => void;
    /**
     * 在扫码识别成功时触发，仅在 mode="scanCode" 时生效
     * - 平台差异：微信小程序、支付宝小程序、抖音小程序、飞书小程序、快手小程序
    */
    scancode: () => void;
  };
}

export interface Image {
  props: {

  },
  events: {

  };
}

export interface Video {
  props: {

  },
  events: {

  };
}

export interface LivePlayer {
  props: {

  },
  events: {

  };
}

export interface LivePusher {
  props: {

  },
  events: {

  };
}
