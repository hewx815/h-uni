/* eslint-disable @typescript-eslint/no-explicit-any */
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
  };
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
  };
  events: {
    /**
     * 当发生错误时触发 error 事件，detail = {errMsg: MediaError.code}
     * - 返回错误码
     *    - 1 获取资源被用户禁止
     *    - 2 网络错误
     *    - 3 解码错误
     *    - 4 不合适资源
     */
    error: (e: { detail: { errMsg: 1 | 2 | 3 | 4; }; }) => void;
    /**
     * 当开始/继续播放时触发play事件
     */
    play: () => void;
    /**
     * 当暂停播放时触发 pause 事件
     */
    pause: () => void;
    /**
     * 当播放进度改变时触发 timeupdate 事件，detail = {currentTime, duration}
     */
    timeupdate: (e: {
      detail: { currentTime: number; duration: number; };
    }) => void;
    /**
     * 当播放到末尾时触发 ended 事件
     */
    ended: () => void;
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
  };
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

/**
 * 图片组件。
*/
export interface Image {
  props: {
    /**
     * 图片资源地址
     */
    src: string;

    /**
     * 图片裁剪、缩放的模式
     * - 默认值： 'scaleToFill'
     * - 缩放模式：
     *   - `scaleToFill`： 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素。
     *   - `aspectFit`： 保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。
     *   - `aspectFill`： 保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。
     *   - `widthFix`： 宽度不变，高度自动变化，保持原图宽高比不变。
     *   - `heightFix`： 高度不变，宽度自动变化，保持原图宽高比不变（App 和 H5 平台 HBuilderX 2.9.3+ 支持，微信小程序需要基础库 2.10.3+ 支持）。
     * - 裁剪模式：
     *   - `top`： 不缩放图片，只显示图片的顶部区域。
     *   - `bottom`： 不缩放图片，只显示图片的底部区域。
     *   - `center`： 不缩放图片，只显示图片的中间区域。
     *   - `left`： 不缩放图片，只显示图片的左边区域。
     *   - `right`： 不缩放图片，只显示图片的右边区域。
     *   - `top left`： 不缩放图片，只显示图片的左上边区域。
     *   - `top right`： 不缩放图片，只显示图片的右上边区域。
     *   - `bottom left`： 不缩放图片，只显示图片的左下边区域。
     *   - `bottom right`： 不缩放图片，只显示图片的右下边区域。

     */
    mode:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'heightFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';

    /**
     * 图片懒加载。只针对 page 与 scroll-view 下的 image 有效
     * - 默认值： false
     * - 平台差异： 微信小程序、百度小程序、抖音小程序、飞书小程序
     */
    lazyLoad: boolean;

    /**
     * 图片显示动画效果
     * - 默认值： true
     * - 平台差异： 仅 App-nvue 2.3.4+ Android 有效
     */
    fadeShow: boolean;

    /**
     * 在系统不支持 webp 的情况下是否单独启用 webp
     * - 默认值： false
     * - 平台差异： 微信小程序 2.9.0
     */
    webp: boolean;

    /**
     * 开启长按图片显示识别小程序码菜单
     * - 默认值： false
     * - 平台差异： 微信小程序 2.7.0
     */
    showMenuByLongPress: boolean;

    /**
     * 是否能拖动图片
     * - 默认值： true
     * - 平台差异： H5 3.1.1+、App（iOS 15+）
     */
    draggable: boolean;

    /**
     * 当错误发生时，发布到 AppService 的事件名，事件对象 event.detail = { errMsg: 'something wrong' }
     */
    onError: HandleEvent;

    /**
     * 当图片载入完毕时，发布到 AppService 的事件名，事件对象 event.detail = { height: '图片高度px', width: '图片宽度px' }
     */
    onLoad: HandleEvent;
  };
  events: {
    /**
     * 当错误发生时，发布到 AppService 的事件名，事件对象 event.detail = { errMsg: 'something wrong' }
     */
    error: (e: { detail: { errMsg: 'something wrong'; }; }) => void;
    /**
     * 当图片载入完毕时，发布到 AppService 的事件名，事件对象 event.detail = { height: '图片高度px', width: '图片宽度px' }
     */
    load: (e: { detail: { height: string; width: string; }; }) => void;
  };
}

/**
 * 视频播放组件。
 * - `<video>` 默认宽度 300px、高度 225px，可通过 css 设置宽高。
*/
export interface Video {
  props: {
    /**
     * - 要播放视频的资源地址
     */
    src: string;

    /**
     * - 是否自动播放
     * - 默认值： false
     */
    autoplay: boolean;

    /**
     * 是否循环播放
     * - 默认值： false
     */
    loop: boolean;

    /**
     * 是否静音播放
     * - 默认值： false
     * - 平台差异： 飞书小程序不支持
     */
    muted: boolean;

    /**
     * 指定视频初始播放位置，单位为秒（s）。
     * - 平台差异： 飞书小程序不支持
     */
    initialTime: number;

    /**
     * 指定视频时长，单位为秒（s）。
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序、京东小程序不支持
     */
    duration: number;

    /**
     * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
     * - 默认值： true
     * - 平台差异： 快手小程序不支持
     */
    controls: boolean;

    /**
     * 弹幕列表
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序、京东小程序不支持
     */
    danmuList: Array<object>;

    /**
     * 是否显示弹幕按钮，只在初始化时有效，不能动态变更
     * - 默认值： false
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序、京东小程序不支持
     */
    danmuBtn: boolean;

    /**
     * 是否展示弹幕，只在初始化时有效，不能动态变更
     * - 默认值： false
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序、京东小程序不支持
     */
    enableDanmu: boolean;

    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势
     * - 默认值： false
     * - 平台差异： 微信小程序、H5
     */
    pageGesture: boolean;

    /**
     * 设置全屏时视频的方向，不指定则根据宽高比自动判断。
     * - 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
     * - 平台差异： H5、飞书小程序、快手小程序、京东小程序不支持
     * - direction 的合法值
     *   - `0`： 正常竖向
     *   - `90`： 屏幕逆时针90度
     *   - `-90`： 屏幕顺时针90度
     */
    direction: 0 | 90 | -90;

    /**
     * 若不设置，宽度大于240时才会显示
     * - 默认值： true
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序、京东小程序不支持
     */
    showProgress: boolean;

    /**
     * 是否显示全屏按钮
     * - 默认值： true
     * - 平台差异： 京东小程序不支持
     */
    showFullscreenBtn: boolean;

    /**
     * 是否显示视频底部控制栏的播放按钮
     * - 默认值： true
     * - 平台差异： 京东小程序不支持
     */
    showPlayBtn: boolean;

    /**
     * 是否显示视频中间的播放按钮
     * - 默认值： true
     * - 平台差异： 抖音小程序、京东小程序不支持
     */
    showCenterPlayBtn: boolean;

    /**
     * 是否显示loading控件
     * - 默认值： true
     * - 平台差异： 仅app 2.8.12+
     */
    showLoading: boolean;

    /**
     * 是否开启控制进度的手势
     * - 默认值： true
     * - 平台差异： 抖音小程序、京东小程序不支持
     */
    enableProgressGesture: boolean;

    /**
     * 当视频大小与 video 容器大小不一致时，视频的表现形式。
     * - 有效值为 'contain'：包含，'fill'：填充，'cover'：覆盖
     * - 平台差异： App、微信小程序、抖音小程序、飞书小程序、H5、京东小程序
     * - object-fit 的合法值
     *    - `contain`： 包含
     *    - `fill`： 填充
     *    - `cover`： 覆盖
     */
    objectFit: 'contain' | 'fill' | 'cover';

    /**
     * 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效
     */
    poster: string;

    /**
     * 是否显示静音按钮
     * - 默认值： false
     * - 平台差异： 微信小程序、抖音小程序、App-nvue
     */
    showMuteBtn: boolean;

    /**
     * 视频的标题，全屏时在顶部展示
     * - 平台差异： 微信小程序、App（3.6.7+）
     */
    title: string;

    /**
     * 播放按钮的位置
     * - 默认值： 'bottom'
     * - 平台差异： 微信小程序、抖音小程序、飞书小程序
     * - play-btn-position 的合法值
     *    - `bottom`： controls bar上
     *    - `center`： 视频中间
     */
    playBtnPosition: 'bottom' | 'center';

    /**
     * 移动网络提醒样式：0是不提醒，1是提醒，默认值为1
     * - 平台差异： 京东小程序
     */
    mobilenetHintType: number;

    /**
     * 是否开启播放手势，即双击切换播放/暂停
     * - 默认值： false
     * - 平台差异： 微信小程序、快手小程序
     */
    enablePlayGesture: boolean;

    /**
     * 当跳转到其它小程序页面时，是否自动暂停本页面的视频
     * - 默认值： true
     * - 平台差异： 微信小程序
     */
    autoPauseIfNavigate: boolean;

    /**
     * 当跳转到其它微信原生页面时，是否自动暂停本页面的视频
     * - 默认值： true
     * - 平台差异： 微信小程序
     */
    autoPauseIfOpenNative: boolean;

    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
     * - 默认值： false
     * - 平台差异： 微信小程序、App（3.4.0+）、快手小程序
     */
    vslideGesture: boolean;

    /**
     * 在全屏模式下，是否开启亮度与音量调节手势
     * - 默认值： true
     * - 平台差异： 微信小程序、App（3.4.0+）、快手小程序
     */
    vslideGestureInFullscreen: boolean;

    /**
     * 视频前贴广告单元ID，更多详情可参考开放能力[视频前贴广告](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/ad/video-patch-ad.html)
     * - 平台差异： 微信小程序
     */
    adUnitId: string;

    /**
     * 用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址
     * - 平台差异： 微信小程序
     */
    posterForCrawler: string;

    /**
     * 解码器选择，hardware：硬解码（硬解码可以增加解码算力，提高视频清晰度。少部分老旧硬件可能存在兼容性问题）；software：ffmpeg 软解码；
     * - 默认值： 'hardware'
     * - 平台差异： App-Android 3.1.0+
     */
    codec: string;

    /**
     * 是否对 http、https 视频源开启本地缓存。缓存策略:开启了此开关的视频源，在视频播放时会在本地保存缓存文件，如果本地缓存池已超过100M，在进行缓存前会清空之前的缓存（不适用于m3u8等流媒体协议）
     * - 默认值： true
     * - 平台差异： App-Android 3.1.0+
     */
    httpCache: boolean;

    /**
     * 播放策略，0：普通模式，适合绝大部分视频播放场景；1：平滑播放模式（降级），增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；2： M3U8优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景
     * - 默认值： 0
     * - 平台差异： App-Android 3.1.0+
     */
    playStrategy: number;

    /**
     * - HTTP 请求 Header
     * - 平台差异： App 3.1.19+
     */
    header: string;

    /**
     * - 是否为直播源
     * - 默认值： false
     * - 平台差异： App 3.7.2+、微信小程序（2.28.1+）
     */
    isLive: boolean;
  };
  events: {
    /**
     * - 当开始/继续播放时触发 play 事件
     * - 平台差异： 飞书小程序不支持
     */
    play: () => void;

    /**
     * - 当暂停播放时触发 pause 事件
     * - 平台差异： 飞书小程序不支持
     */
    opause: () => void;

    /**
     * - 当播放到末尾时触发 ended 事件
     * - 平台差异： 飞书小程序不支持
     */
    ended: () => void;

    /**
     * - 播放进度变化时触发，event.detail = { currentTime, duration }
     * - 触发频率 250ms 一次
     * - 平台差异： 飞书小程序不支持
     */
    timeUpdate: (e: { detail: { currentTime: any, duration: any; }; }) => void;

    /**
     * - 当视频进入和退出全屏时触发，event.detail = { fullScreen, direction }，direction 取为 'vertical' 或 'horizontal'
     * - 平台差异： 飞书小程序不支持
     */
    fullscreenChange: (e: { detail: { fullScreen: any, duration: 'vertical' | 'horizontal'; }; }) => void;

    /**
     * - 视频出现缓冲时触发
     * - 平台差异： 飞书小程序、快手小程序不支持
     */
    waiting: () => void;
    /**
     * - 视频播放出错时触发
     * - 平台差异： 飞书小程序不支持
     */
    error: () => void;

    /**
     * - 加载进度变化时触发，只支持一段加载。event.detail = { buffered }，百分比
     * - 平台差异： 微信小程序、抖音小程序、H5
     */
    progress: () => void;

    /**
     * - 视频资源开始加载时触发
     * - 平台差异： 京东小程序
     */
    loadedData: () => void;

    /**
     * - 开始加载数据
     * - 平台差异： 京东小程序
     */
    loadStart: () => void;

    /**
     * - 拖动进度条结束
     * - 平台差异： 京东小程序
     */
    seeked: () => void;

    /**
     * - 正在拖动进度条
     * - 平台差异： 京东小程序
     */
    seeking: () => void;

    /**
     * - 视频元数据加载完成时触发。event.detail = { width, height, duration }
     * - 平台差异： 微信小程序、H5、抖音小程序、京东小程序
     */
    loadedMetadata: (e: { detail: { width: any, height: any, duration: any; }; }) => void;

    /**
     * - 视频播放全屏播放时点击事件。event.detail = { screenX: number, screenY: number, screenWidth: number, screenHeight: number }
     * - 平台差异： App 2.6.3+
     */
    onFullscreenClick: (e: { detail: { screenX: number, screenY: number, screenWidth: number, screenHeight: number; }; }) => void;

    /**
     * - 切换 controls 显示隐藏时触发。event.detail = { show }
     * - 平台差异： 微信小程序2.9.5
     */
    onControlsToggle: (e: { detail: { show: any; }; }) => void;
  };
}

type Codes =
  2001
  | 2002
  | 2003
  | 2004
  | 2005
  | 2006
  | 2007
  | 2008
  | 2009
  | -2301
  | -2302
  | 2101
  | 2102
  | 2103
  | 2104
  | 2105
  | 2106
  | 2107
  | 2108
  | 3001
  | 3002
  | 3003
  | 3004
  | 3005;

/**
 * 实时音视频播放，也称直播拉流。
 * - 使用live-player 组件需注意：如果发布到小程序，需要先通过各家小程序的审核。指定类目的小程序才能使用（微信小程序类目、百度小程序类目），审核通过后在各家小程序管理后台自助开通该组件权限。
 * - 平台差异： 微信小程序、百度小程序、抖音小程序（基础库版本>=1.52.0）、QQ小程序
*/
export interface LivePlayer {
  props: {
    /**
 * live-player 属性的唯一标志符
 */
    id: string;

    /**
     * 音视频地址。百度小程序支持 m3u8 格式；微信小程序支持 flv, rtmp 格式
     * - 平台差异： 微信小程序
     */
    src: string;

    /**
     * 直播（live），实时通话（RTC，该模式时延更低）
     * - 默认值： 'live'
     * - 平台差异： 微信小程序
     *    - `live`： 直播
     *    - `RTC`： 实时通话，该模式时延更低
     */
    mode: 'live' | 'RTC';

    /**
     * 自动播放
     * - 默认值： false
     */
    autoplay: boolean;

    /**
     * 是否静音
     * - 默认值： false
     */
    muted: boolean;

    /**
     * 画面方向，可选值有 vertical，horizontal
     * - 默认值： 'vertical'
     *    - `vertical`： 竖直
     *    - `horizontal`： 水平
     */
    orientation: 'vertical' | 'horizontal';

    /**
     * 填充模式，可选值: contain、fillCrop
     * - 默认值： 'contain'
     *    - `contain`： 图像长边填满屏幕，短边区域会被填充⿊⾊
     *    - `fillCrop`： 图像铺满屏幕，超出显示区域的部分将被截掉
     */
    objectFit: 'contain' | 'fillCrop';

    /**
     * 进入后台时是否静音
     * - 默认值： false
     */
    backgroundMute: boolean;

    /**
     * 声音输出方式;可选值speaker、ear
     * - 默认值： 'speaker'
     * - 平台差异： 微信小程序、QQ小程序1.5.0（仅支持speaker）
     *    - `speaker`： 扬声器
     *    - `ear`： 听筒
     */
    soundMode: 'speaker' | 'ear';

    /**
     * 最小缓冲区，单位s
     * - 默认值： 1
     */
    minCache: number;

    /**
     * 最大缓冲区，单位s
     * - 默认值： 3
     */
    maxCache: number;

    /**
     * 设置小窗模式： push, pop，空字符串或通过数组形式设置多种模式（如： ["push", "pop"]）
     * - 默认值： 3
     * - 平台差异： 微信小程序（2.10.3）
     */
    pictureInPictureMode: string | string[];

  };
  events: {
    /**
 * 播放状态变化事件，detail = {code}
 */
    onStateChange: (e: {
      detail: {
        code: Codes;
      };
    }) => void;

    /**
     * 网络状态通知，detail = {info}
     */
    onNetStatus: (e: { detail: { info; }; }) => void;

    /**
     * 全屏变化事件，detail = {direction, fullScreen}
     */
    onFullscreenChange: (e: { detail: { direction, fullScreen; }; }) => void;

    /**
     * 播放音量大小通知，detail = {}
     * - 平台差异： 微信小程序（2.10.0）
     */
    onAudioVolumeNotify: (e: { detail: object; }) => void;

    /**
     * 播放器进入小窗
     * - 平台差异： 微信小程序（2.11.0）
     */
    onEnterPictureInPicture: () => void;

    /**
     * 播放器退出小窗
     * - 平台差异： 2.11.0
     */
    onLeavePictureInPicture: () => void;
  };
}

/**
 * 实时音视频录制，也称直播推流。
 * - 平台差异： App((nvue)、vue 3.4.1+)、微信小程序
*/
export interface LivePusher {
  props: {
    /**
 * 推流地址，支持RTMP协议。
 * - 必填
 */
    url: string;

    /**
     * 推流视频模式，可取值：SD（标清）, HD（高清）, FHD（超清）。
     * - 默认值： 'SD'
     */
    mode: string;

    /**
     * 视频宽高比例
     * - 默认值： '3:2'
     */
    aspect: string;

    /**
     * 是否静音。
     * - 默认值： false
     */
    muted: boolean;

    /**
     * 开启摄像头。
     * - 默认值： true
     */
    enableCamera: boolean;

    /**
     * 自动聚焦。
     * - 默认值： true
     */
    autoFocus: boolean;

    /**
     * 美颜，取值范围 0-9（iOS取值范围为1），0 表示关闭。
     * - 默认值： 0
     */
    beauty: number;

    /**
     * 美白，取值范围 0-9（iOS取值范围为1），0 表示关闭。
     * - 默认值： 0
     */
    whiteness: number;

    /**
     * 画面方向
     * - 默认值： 'vertical'
     *   - `vertical`： 竖直
     *   - `horizontal`： 水平
     */
    orientation: 'vertical' | 'horizontal';

    /**
     * 最小码率。
     * - 默认值： 200
     */
    minBitrate: number;

    /**
     * 最大码率。
     * - 默认值： 1000
     */
    maxBitrate: number;

    /**
     * 高音质(48KHz)或低音质(16KHz)，值为 'high' 或 'low'。
     * - 默认值： 'high'
     * - 平台差异： 微信小程序1.7.0
     */
    audioQuality: string;

    /**
     * 进入后台时推流的等待画面
     * - 默认值： ''
     * - 平台差异： 微信小程序1.7.0
     */
    waitingImage: string;

    /**
     * 等待画面资源的MD5值
     * - 默认值： ''
     * - 平台差异： 微信小程序1.7.0
     */
    waitingImageHash: string;

    /**
     * 调整焦距
     * - 默认值： false
     * - 平台差异： 微信小程序2.1.0
     */
    zoom: boolean;

    /**
     * 前置或后置，值为 'front' 或 'back'
     * - 默认值： 'front'
     * - 平台差异： 微信小程序2.3.0
     */
    devicePosition: string;

    /**
     * 进入后台时是否静音
     * - 默认值： false
     * - 平台差异： 微信小程序1.7.0
     */
    backgroundMute: boolean;

    /**
     * 设置推流画面是否镜像，产生的效果在 live-player 反应到
     * - 默认值： false
     * - 平台差异： 微信小程序2.10.0
     */
    remoteMirror: boolean;

    /**
     * 控制本地预览画面是否镜像
     * - 默认值： 'auto'
     * - 平台差异： 微信小程序2.10.0
     *   - `auto`： 前置摄像头镜像，后置摄像头不镜像
     *   - `enable`： 前后置摄像头均镜像
     *   - `disable`： 前后置摄像头均不镜像
     */
    localMirror: 'auto' | 'enable' | 'disable';

    /**
     * 音频混响类型
     * - 默认值： 0
     * - 平台差异： 微信小程序2.10.0
     *   - `0`： 关闭
     *   - `1`： KTV
     *   - `2`： 小房间
     *   - `3`： 大会堂
     *   - `4`： 低沉
     *   - `5`： 洪亮
     *   - `6`： 金属声
     *   - `7`： 磁性
     */
    audioReverbType:
    0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7;

    /**
     * 开启或关闭麦克风
     * - 默认值： true
     * - 平台差异： 微信小程序2.10.0
     */
    enableMic: boolean;

    /**
     * 是否开启音频自动增益
     * - 默认值： false
     * - 平台差异： 微信小程序2.10.0
     */
    enableAgc: boolean;

    /**
     * 是否开启音频噪声抑制
     * - 默认值： false
     * - 平台差异： 微信小程序2.10.0
     */
    enableAns: boolean;

    /**
     * 音量类型
     * - 默认值： 'voicecall'
     * - 平台差异： 微信小程序2.10.0
     *   - `media`： 媒体音量
     *   - `voicecall`： 通话音量
     */
    audioVolumeType: 'media' | 'voicecall';
  };
  events: {
    /**
 * 状态变化事件，detail = {code}
 */
    onStateChange: (e: { detail: { code: Codes; }; }) => void;

    /**
     * 网络状态通知，detail = {info}
     */
    onNetStatus: (e: { detail: { info; }; }) => void;

    /**
     * 渲染错误事件，detail = {errMsg, errCode}
     */
    onError: (e: { detail: { errMsg, errCode; }; }) => void;

    /**
     * 背景音开始播放时触发
     * - 平台差异： 微信小程序2.4.0
     */
    onBgmStart: () => void;

    /**
     * 背景音进度变化时触发，detail = {progress, duration}
     * - 平台差异： 微信小程序2.4.0
     */
    onBgmProgress: (e: { detail: { progress, duration; }; }) => void;

    /**
     * 背景音播放完成时触发
     * - 平台差异： 微信小程序2.4.0
     */
    onBgmComplete: () => void;
  };
}
