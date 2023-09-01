export interface Navigator {
  props: {
    /**
     * 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 .vue 后缀
    */
    url: string;
    /**
     * 跳转方式
     * - 默认： navigate
     *   - `navigate`： 对应 `uni.navigateTo` 的功能
     *   - `redirect`： 对应 `uni.redirectTo` 的功能
     *   - `switchTab`： 对应 `uni.switchTab` 的功能
     *   - `reLaunch`： 对应 `uni.reLaunch ` 的功能。 平台差异： 抖音小程序与飞书小程序不支持
     *   - `navigateBack`： 对应 `uni.navigateBack` 的功能
     *   - `exit`： 退出小程序，target="miniProgram"时生效。 平台差异： 微信2.1.0+、百度2.5.2+、QQ1.4.7+
    */
    openType:
    'navigate'
    | 'redirect'
    | 'switchTab'
    | 'reLaunch'
    | 'navigateBack'
    | 'exit';
    /**
     * 当 open-type 为 'navigateBack' 时有效，表示回退的层数
    */
    delta: number;
    /**
     * 当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router#animation)
     * - 默认： pop-in/out
     * - 平台差异： App
    */
    animationType: string;
    /**
     * 当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间。
     * - 默认： 300
     * - 平台差异： App
    */
    animationDuration: number;
    /**
     * 指定点击时的样式类，当hover-class="none"时，没有点击态效果
     * - 默认： navigator-hover
    */
    hoverClass: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * - 默认： false
     * - 平台差异： 微信小程序
    */
    hoverStopPropagation: boolean;
    /**
     * 按住后多久出现点击态，单位毫秒
     * - 默认： 50
    */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     * - 默认： 600
    */
    hoverStayTime: number;
    /**
     * 在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram
     * - 默认： self
     * - 平台差异： 微信2.0.7+、百度2.5.2+、QQ
    */
    target: string;
  },
  events: object;
}
