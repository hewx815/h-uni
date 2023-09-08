/* eslint-disable semi */

/**
 * 视图容器。
 * - 它类似于传统html中的div，用于包裹各种元素内容。
 * - 如果使用nvue，则需注意，包裹文字应该使用<text>组件。
 */
export interface View {
  props: {
    /**
     * 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果
     * - 默认：false
     */
    hoverClass: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态，App、H5、支付宝小程序、百度小程序不支持（支付宝小程序、百度小程序文档中都有此属性，实测未支持）
     * - 默认： false
     */
    hoverStopPropagation: boolean;
    /**
     * - 按住后多久出现点击态，单位毫秒
     * - 默认： 50
     */
    hoverStartTime: number;
    /**
     * - 手指松开后点击态保留时间，单位毫秒
     * - 默认： 400
     */
    hoverStayTime: number;
  };

  events: object
}

/**
 * 可滚动视图区域。用于区域滚动。
 * - 需注意在webview渲染的页面中，区域滚动的性能不及页面滚动。
 */
export interface ScrollView {
  props: {
    /**
     * 允许横向滚动
     * - 默认： false
     */
    scrollX: boolean;
    /**
     * 允许纵向滚动
     * - 默认： false
     */
    scrollY: boolean;
    /**
     * 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
     * - 默认： 50
     */
    upperThreshold: number | string;
    /**
     * 距底部/右边多远时（单位px），触发 scrolltolower 事件
     * - 默认： 50
     */
    lowerThreshold: number | string;
    /**
     * 设置竖向滚动条位置
     */
    scrollTop: number | string;
    /**
     * 设置横向滚动条位置
     */
    scrollLeft: number | string;
    /**
     * 值应为某子元素id（id不能以数字开头）。设置哪个方向可滚动，则在哪个方向滚动到该元素
     */
    scrollIntoView: string;
    /**
     * 在设置滚动条位置时使用动画过渡
     * - 默认： false
     */
    scrollWithAnimation: boolean;
    /**
     * iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
     * - 默认： false
     * - 平台差异： app-nvue，微信小程序
     */
    enableBackToTop: boolean;
    /**
     * 控制是否出现滚动条
     * - 默认： false
     * - 平台差异： App-nvue 2.1.5+
     */
    showScrollbar: boolean;
    /**
     * 开启自定义下拉刷新
     * - 默认： false
     * - 平台差异： H5、app-vue 2.5.12+,微信小程序基础库2.10.1+
     */
    refresherEnabled: boolean;
    /**
     * 设置自定义下拉刷新阈值
     * - 默认： 45
     * - 平台差异： H5、app-vue 2.5.12+,微信小程序基础库2.10.1+
     */
    refresherThreshold: number;
    /**
     * 设置自定义下拉刷新默认样式，支持设置 black，white，none，none 表示不使用默认样式
     * - 默认： 'black
     * - 平台差异： H5、app-vue 2.5.12+,微信小程序基础库2.10.1+
     */
    refresherDefaultStyle: 'black' | 'white' | 'none';
    /**
     * 设置自定义下拉刷新区域背景颜色
     * - 默认： '#FFF'
     * - 平台差异：H5、app-vue 2.5.12+,微信小程序基础库2.10.1+
     */
    refresherBackground: string;
    /**
     * 设置当前下拉刷新状态，true 表示下拉刷新已经被触发，false 表示下拉刷新未被触发
     * - 默认： false
     * - 平台差异：H5、app-vue 2.5.12+,微信小程序基础库2.10.1+
     */
    refresherTriggered: boolean;
    /**
     * 启用 flexbox 布局。开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其孩子节点。
     * - 默认： false
     * - 平台差异：微信小程序 2.7.3
     */
    enableFlex: boolean;
    /**
     * 开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效，安卓下可参考 CSS overflow-anchor 属性。
     * - 默认： false
     * - 平台差异：微信小程序 2.8.2
     */
    scrollAnchoring: boolean;
  };

  events: {
    /**
     * 滚动到顶部/左边，会触发 scrolltoupper 事件
     */
    scrolltoupper: () => void;
    /**
     * 滚动到底部/右边，会触发 scrolltolower 事件
     */
    scrolltolower: () => void;
    /**
     * 滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
     */
    scroll: ({ dd: number }) => string;
    /**
     * 自定义下拉刷新控件被下拉
     */
    refresherpulling: () => void;
    /**
     * 自定义下拉刷新被触发
     */
    refresherrefresh: () => void;
    /**
     * 自定义下拉刷新被复位
     */
    refresherrestore: () => void;
    /**
     * 自定义下拉刷新被中止
     */
    refresherabort: () => void;
  };
}

/**
 * 滑块视图容器。
 * - 一般用于左右滑动或上下滑动，比如banner轮播图。
 * - 注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换。swiper下的每个swiper-item是一个滑动切换区域，不能停留在2个滑动区域之间。
 */
export interface Swiper {
  props: {
    /**
     * 是否显示面板指示点
     * - 默认： false
     */
    indicatorDots: boolean;
    /**
     * 指示点颜色
     * - 默认： rgba(0, 0, 0, .3)
     */
    indicatorColor: string;
    /**
     * 当前选中的指示点颜色
     * - 默认： #000000
     */
    indicatorActiveColor: string;
    /**
     * swiper-item 可见时的 class
     * - 平台差异： 支付宝小程序
     */
    activeClass: string;
    /**
     * acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的class
     * - 平台差异： 支付宝小程序
     */
    changingClass: string;
    /**
     * 是否自动切换
     * - 默认： false
     */
    autoplay: boolean;
    /**
     * 当前所在滑块的 index
     * - 默认： 0
     */
    current: number;
    /**
     * 当前所在滑块的 item-id ，不能与 current 被同时指定
     * - 平台差异： 支付宝小程序不支持
     */
    currentItemId: string;
    /**
     * 自动切换时间间隔
     * - 默认： 5000
     */
    interval: number;
    /**
     * 滑动动画时长
     * - 默认： 500
     * - 平台差异： app-nvue不支持
     */
    duration: boolean;
    /**
     * 是否采用衔接滑动，即播放到末尾后重新回到开头
     * - 默认： false
     */
    circular: boolean;
    /**
     * 滑动方向是否为纵向
     * - 默认： false
     */
    vertical: boolean;
    /**
     * 前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值
     * - 默认： 0px
     * - 平台差异： app-nvue、抖音小程序、飞书小程序不支持
     */
    previousMargin: string;
    /**
     * 后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值
     * - 默认： 0px
     * - 平台差异： app-nvue、抖音小程序、飞书小程序不支持
     */
    nextMargin: boolean;
    /**
     * 当开启时，会根据滑动速度，连续滑动多屏
     * - 默认： false
     * - 平台差异： 支付宝小程序
     */
    acceleration: boolean;
    /**
     * 是否禁用代码变动触发 swiper 切换时使用动画。
     * - 默认： false
     * - 平台差异： 支付宝小程序
     */
    disableProgrammaticAnimation: boolean;
    /**
     * 同时显示的滑块数量
     * - 默认： 1
     * - 平台差异： app-nvue、支付宝小程序不支持
     */
    displayMultipleItems: number;
    /**
     * 是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
     * - 默认： false
     * - 平台差异： App、微信小程序、京东小程序
     */
    skipHiddenItemLayout: boolean;
    /**
     * 是否禁止用户 touch 操作
     * - 默认： false
     * - 平台差异：App 2.5.5+、H5 2.5.5+、支付宝小程序、抖音小程序与飞书小程序（只在初始化时有效，不能动态变更）
     */
    disableTouch: boolean;
    /**
     * 是否监听用户的触摸事件，只在初始化时有效，不能动态变更
     * - 默认： true
     * - 平台差异：抖音小程序与飞书小程序（uni-app 2.5.5+ 推荐统一使用 disable-touch）
     */
    touchable: boolean;
    /**
     * 指定 swiper 切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
     * - 默认： default
     * - 平台差异：微信小程序、快手小程序、京东小程序
     */
    easingFunction: string;
  };

  events: {
    /**
     * current 改变时会触发 change 事件，event.detail = {current: current, source: source}
     * - 参数： EventHandle
     */
    change: (e: { detail: { current: number; source: unknown; }; }) => void;
    /**
     * swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}，支付宝小程序暂不支持dx, dy
     * - 参数： EventHandle
     * - 平台差异：App、H5、微信小程序、支付宝小程序、抖音小程序、飞书小程序、QQ小程序、快手小程序
     */
    transition: (e: { detail: { dx: number; dy: number; }; }) => void;
    /**
     * 动画结束时会触发 animationfinish 事件，event.detail = {current: current, source: source}
     * - 参数： EventHandle
     * - 平台差异：抖音小程序与飞书小程序不支持
     */
    animationfinish: (e: { detail: { current: number; source: unknown; }; }) => void;
  };
}

/**
 * media query 匹配检测节点。
 * - 类似于网页开发中使用媒体查询来适配大屏小屏，match-media是一个可适配不同屏幕的基本视图组件。可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示。
 * - 例如在match-media组件中放置一个侧边栏，媒体查询规则设置为宽屏才显示，就可以实现在PC宽屏显示该侧边栏，而在手机窄屏中不显示侧边栏的效果。
 * - 注意：支付宝小程序、qq小程序、百度小程序、抖音小程序，暂不支持监听屏幕动态改变，即只执行一次媒体查询。
 */
export interface matchMedia {
  props: {
    /**
     * 页面最小宽度（ px 为单位）
     */
    minWidth: number;
    /**
     * 页面最大宽度（ px 为单位）
     */
    maxWidth: number;
    /**
     * 页面宽度（ px 为单位）
     */
    width: number;
    /**
     * 页面最小高度（ px 为单位）
     */
    minHeight: number;
    /**
     * 页面最大高度（ px 为单位）
     */
    maxHeight: number;
    /**
     * 页面高度（ px 为单位）
     */
    height: number;
    /**
     * 屏幕方向（ landscape 或 portrait ）
     */
    orientation: 'landscape' | 'portrait';
  };
  events: object;
}

/**
 * 可拖动区域
 * - 由于app和小程序的架构是逻辑层与视图层分离，使用js监听拖动时会引发逻辑层和视图层的频繁通讯，影响性能。为了方便高性能的实现拖动，平台特封装了movable-area组件。
 * - movable-area指代可拖动的范围，在其中内嵌movable-view组件用于指示可拖动的区域。
 * - 即手指/鼠标按住movable-view拖动或双指缩放，但拖不出movable-area规定的范围。
 * -当然也可以不拖动，而使用代码来触发movable-view在movable-area里的移动缩放。
 * - movable-view的规范另见[movable-view](https://uniapp.dcloud.net.cn/component/movable-view.html)。
 */
export interface movableArea {
  props: {
    /**
     * 当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area
     * - 默认： false
     */
    scaleArea: boolean;
  };
  events: object;
}

/**
 * 可移动的视图容器，在页面中可以拖拽滑动或双指缩放。
 * - movable-view必须在movable-area组件中，并且必须是直接子节点，否则不能移动。
 */
export interface movableView {
  props: {
    /**
     * movable-view的移动方向，属性值有all、vertical、horizontal、none
     * - 默认： none
     */
    direction: 'all' | 'vertical' | 'horizontal' | 'none';
    /**
     * movable-view是否带有惯性
     * - 默认： false
     */
    inertia: boolean;
    /**
     * 超过可移动区域后，movable-view是否还可以移动
     * - 默认： false
     */
    outOfBounds: boolean;
    /**
     * 定义x轴方向的偏移，如果x的值不在可移动范围内，会自动移动到可移动范围；改变x的值会触发动画
     */
    x: number | string;
    /**
     * 定义y轴方向的偏移，如果y的值不在可移动范围内，会自动移动到可移动范围；改变y的值会触发动画
     */
    y: number | string;
    /**
     * 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快
     * - 默认： 20
     * - 平台差异： 360小程序不支持
     */
    damping: number;
    /**
     * 摩擦系数，用于控制惯性滑动的动画，值越大摩擦力越大，滑动越快停止；必须大于0，否则会被设置成默认值
     * - 默认： 2
     * - 平台差异： 360小程序不支持
     */
    friction: number;
    /**
     * 超过可移动区域后，movable-view是否还可以移动
     * - 默认： false
     */
    disabled: boolean;
    /**
     * 是否支持双指缩放，默认缩放手势生效区域是在movable-view内
     * - 默认： false
     * - 平台差异： 360小程序不支持
     */
    scale: boolean;
    /**
     * 定义缩放倍数最小值
     * - 默认： 0.5
     */
    scaleMin: number;
    /**
     * 定义缩放倍数最大值
     * - 默认： 10
     */
    scaleMax: number;
    /**
     * 定义缩放倍数，取值范围为 0.5 - 10
     * - 默认： 1
     */
    scaleValue: number;
    /**
     * 是否使用动画
     * - 默认： true
     */
    animation: boolean;
  };

  events: {
    /**
     * 拖动过程中触发的事件，event.detail = {x: x, y: y, source: source}，其中source表示产生移动的原因，值可为:
     * - touch（拖动）
     * - ouch-out-of-bounds（超出移动范围）
     * - out-of-bounds（超出移动范围后的回弹）
     * - friction（惯性）
     * - 空字符串（setData）
    */
    change: (e: { x: number, y: number, source: 'touch' | 'touch-out-of-bounds' | 'out-of-bounds' | 'friction' | ''; }) => void;
    /**
     * 缩放过程中触发的事件，event.detail = {x: x, y: y, scale: scale}，
    */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    scale: (e: { x: number, y: number, scale: any; }) => void;
    /**
     * 初次手指触摸后移动为横向的移动，如果catch此事件，则意味着touchmove事件也被catch
     * - 平台差异： 微信小程序、百度小程序、QQ小程序、快手小程序、快应用
    */
    htouchmove: () => void;
    /**
     * 初次手指触摸后移动为纵向的移动，如果catch此事件，则意味着touchmove事件也被catch
     * - 平台差异： 微信小程序、百度小程序、QQ小程序、快手小程序、快应用
    */
    vtouchmove: () => void;
  };
}

/**
 * 覆盖在原生组件上的文本视图。
 * - app-vue和小程序框架，渲染引擎是webview的。但为了优化体验，部分组件如map、video、textarea、canvas通过原生控件实现，原生组件层级高于前端组件（类似flash层级高于div）。为了能正常覆盖原生组件，设计了cover-view。
 */
export interface coverView {
  props: {
    /**
     * 设置顶部滚动偏移量，仅在设置了 overflow-y: scroll 成为滚动元素后生效
     * - 平台差异： 支付宝小程序不支持
    */
    scrollTop: number | string;
  };
  events: object;
}

/**
 * 覆盖在原生组件上的图片视图。可覆盖的原生组件同cover-view，支持嵌套在cover-view里。
 */
export interface coverImage {
  props: {
    /**
     * 图标路径。支持本地路径、网络路径。不支持 base64 格式。
    */
    src: string;
  };
  events: {
    /**
     * 图片加载成功时触发
     * - 平台差异： 微信小程序 2.1.0、百度小程序、QQ小程序、快手小程序、京东小程序
    */
    load: () => void;
    /**
     * 图片加载失败时触发
     * - 平台差异： 微信小程序 2.1.0、百度小程序、QQ小程序、快手小程序、京东小程序
    */
    error: () => void;
  };
}
