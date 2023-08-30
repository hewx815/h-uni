/**
 * 图标。
 * - 由于 icon 组件各端表现存在差异，可以通过使用 字体图标 的方式来弥补各端差异。
 */
export interface Icon {
  props: {
    /**
     * icon的类型
     * - 各平台 type 有效值说明:
     * - App、H5、微信小程序、QQ小程序(success, success_no_circle, info, warn, waiting, cancel, download, search, clear)
     * - 支付宝小程序(info, warn, waiting, cancel, download, search, clear, success, success_no_circle,loading)
     * - 百度小程序(success, info, warn, waiting, success_no_circle, clear, search, personal, setting, top, close, cancel, download, checkboxSelected, radioSelected, radioUnselect)
     */
    type: string;
    /**
     * icon的大小，单位px
     * - 默认： 23
    */
    size: number;
    /**
 *icon的颜色，同css的color
*/
    color: string;
  };
  events: object;
}

/**
 * 文本组件。用于包裹文本内容。
 * - 在app-uvue和app-nvue中，文本只能写在text中，而不能写在view的text区域。
 * - 虽然app-uvue中写在view的text区域的文字，也会被编译器自动包裹一层text组件，看起来也可以使用。但这样会造成无法修改该text文字的样式，详见uvue的[样式不继承](https://uniapp.dcloud.net.cn/uni-app-x/css/readme#stylenoextends)章节
*/
export interface Text {
  props: {
    /**
     * 文本是否可选
     * - 默认： false
    */
    selectable: boolean;
    /**
 * 文本是否可选
 * - 默认： false
 * - 平台差异： 微信小程序
*/
    userSelect: boolean;
    /**
* 显示连续空格
 * - 平台差异： 钉钉小程序不支持
 * - ensp 中文字符空格一半大小
 * - emsp 中文字符空格大小
 * - nbsp 根据字体设置的空格大小
*/
    space: 'ensp' | 'emsp' | 'nbsp';
    /**
 * 是否解码
 * - 默认： false
 * - 平台差异： 百度、钉钉小程序不支持
*/
    decode: boolean;
  };
  events: object;
}

/**
 * 富文本。
 * - 支持默认事件，包括：click、touchstart、touchmove、touchcancel、touchend、longpress。
*/
export interface RichText {
  props: {
    /**
     * 节点列表 / HTML String
     * - 默认： []
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodes: Array<any> | string;
    /**
     * 显示连续空格
     * - 平台差异： App、H5、微信基础库2.4.1+[详见](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)、QQ小程序、抖音小程序、快手小程序[详见](https://mp.kuaishou.com/docs/develop/components/basicComponents/richText.html)
    */
    space: string;
    /**
     * 富文本是否可以长按选中，可用于复制，粘贴等场景
     * - 默认： true
     * - 平台差异： 百度小程序（仅真机支持，基础库 3.150.1 以下版本默认为 false）
    */
    selectable: boolean;
    /**
     * 阻止长按图片时弹起默认菜单（将该属性设置为image-menu-prevent或image-menu-prevent="true"），只在初始化时有效，不能动态变更；若不想阻止弹起默认菜单，则不需要设置此属性
     * - 默认： false
     * - 平台差异： 百度小程序
    */
    imageMenuPrevent: boolean;
    /**
     * 富文本中的图片是否可点击预览。在不设置的情况下，若 rich-text 未监听点击事件，则默认开启。未显示设置 preview 时会进行点击默认预览判断，建议显示设置 preview
     * - 平台差异： 百度小程序
    */
    preview: boolean;
  };
  events: {
    /**
     * 拦截点击事件（只支持 a、img标签），返回当前node信息 event.detail={node}
     * - 平台差异： H5 (3.2.13+)、App-Vue (3.2.13+)
    */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemclick: (e: { detail: string | Array<any>; }) => void;
  };
}

/**
 * 进度条。
*/
export interface Progress {
  props: {
    /**
     * 百分比0~100
    */
    percent: number;
    /**
     * 在进度条右侧显示百分比
     * 默认： false
    */
    showInfo: boolean;
    /**
     * 圆角大小
     * - 默认： 0
     * - 平台差异： app-nvue、微信基础库2.3.1+、QQ小程序、快手小程序、京东小程序
    */
    borderRadius: string | number;
    /**
     * 右侧百分比字体大小
     * - 默认： 16
     * - 平台差异： app-nvue、微信基础库2.3.1+、QQ小程序、京东小程序
    */
    fontSize: string | number;
    /**
     * 进度条线的宽度，单位px
     * - 默认： 6
    */
    strokeWidth: number;
    /**
     * 已选择的进度条的颜色
     * - 默认： #09BB07（百度为#E6E6E6）
    */
    activeColor: string;
    /**
     * 未选择的进度条的颜色
     * - 默认： #EBEBEB
    */
    backgroundColor: string;
    /**
     * 进度条从左往右的动画
     * - 默认：false
    */
    active: boolean;
    /**
     * backwards: 动画从头播；forwards：动画从上次结束点接着播
     * - 默认： backwards
     * - 平台差异： App、H5、微信小程序、QQ小程序、快手小程序、京东小程序
    */
    activeMode: string;
    /**
     * 进度增加1%所需毫秒数
     * - 默认： 30
     * - 平台差异： App-nvue2.6.1+、微信基础库2.8.2+、H5 3.1.11+、App-Vue 3.1.11+、快手小程序、京东小程序
    */
    duration: number;
  };
  events: {
    /**
     * 动画完成事件
     * - 平台差异： 微信小程序、京东小程序
    */
    activeend: () => void;
  };
}
