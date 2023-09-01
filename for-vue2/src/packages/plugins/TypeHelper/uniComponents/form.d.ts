/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 按钮
 */
export interface Button {
  props: {
    /**
     * 按钮的大小
     * - 默认： default
     * - `default`：默认大小
     * - `mini`：小尺寸
     */
    size: 'default' | 'mini';
    /**
     * 按钮的样式类型
     * - 默认： default
     * - `primary`： 微信小程序、360小程序为绿色，App、H5、百度小程序、支付宝小程序、飞书小程序、快应用为蓝色，抖音小程序为红色，QQ小程序为浅蓝色。如想在多端统一颜色，请改用default，然后自行写样式
     * - `default`：白色
     * - `warn`：红色
     */
    type: 'primary' | 'default' | 'warn';
    /**
     * 按钮是否镂空，背景色透明
     * - 默认： false
     */
    plain: boolean;
    /**
     * 是否禁用
     * - 默认： false
     */
    disabled: boolean;
    /**
     * 按钮的大小
     * - 默认： default
     */
    size: string;
    /**
     * 名称前是否带 loading 图标
     * - 默认： false
     * - 平台差异： H5、App(App-nvue 平台，在 ios 上为雪花，Android上为圆圈)
     */
    loading: boolean;
    /**
     * 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
     * - `submit`：提交表单
     * - `reset`：重置表单
     */
    formType: 'submit' | 'reset';
    /**
     * 开放能力
     * - `feedback`： 打开“意见反馈”页面，用户可提交反馈内容并上传日志。平台差异： App、微信小程序、QQ小程序
     * - `share`： 触发用户转发。支持的平台：微信小程序、百度小程序、支付宝小程序、抖音小程序、飞书小程序、QQ小程序、快手小程序、京东小程序、360小程序
     * - `getUserInfo`： 获取用户信息，可以从 `@getuserinfo` 回调中获取到用户信息。支持的平台：微信小程序、百度小程序、QQ小程序、快手小程序、京东小程序、360小程序
     * - `contact`： 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 `@contact` 回调中获得具体信息。支持的平台：微信小程序、百度小程序、快手小程序、抖音小程序
     * - `getPhoneNumber`： 获取用户手机号，可以从 `@getphonenumber` 回调中获取到用户信息。支持的平台：微信小程序、百度小程序、抖音小程序、支付宝小程序、快手小程序、京东小程序。App平台另见[一键登陆](https://uniapp.dcloud.net.cn/univerify)
     * - `launchApp`： 小程序中打开APP，可以通过 app-parameter 属性设定向APP传的参数。支持的平台：微信小程序、QQ小程序、快手小程序、京东小程序
     * - `openSetting`： 打开授权设置页。支持的平台：微信小程序、QQ小程序、百度小程序、快手小程序、京东小程序、360小程序
     * - `chooseAvatar`： 获取用户头像，可以从 `@chooseavatar`回调中获取到头像信息。支持的平台：微信小程序2.21.2版本+
     * - `uploadDouyinVideo`： 发布抖音视频。支持的平台：抖音小程序2.65.0版本+
     * - `im`： 跳转到抖音IM客服。支持的平台：抖音小程序2.80.0版本+
     * - `getAuthorize`： 支持小程序授权。支持的平台：支付宝小程序
     * - `lifestyle`： 关注生活号。支持的平台：支付宝小程序
     * - `contactShare`： 分享到通讯录好友。支持的平台：支付宝小程序基础库1.11.0版本+
     * - `openGroupProfile`： 呼起QQ群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时 manifest.json 中必须配置 groupIdList。支持的平台：QQ小程序基础库1.4.7版本+
     * - `openGuildProfile`： 呼起频道页面，可以通过 guild-id 属性设定需要打开的频道ID。支持的平台：QQ小程序基础库1.46.8版本+
     * - `openPublicProfile`： 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时 manifest.json 中必须配置 publicIdList。支持的平台：QQ小程序基础库1.12.0版本+
     * - `shareMessageToFriend`： 在自定义开放数据域组件中，向指定好友发起分享。支持的平台：QQ小程序基础库1.17.0版本+
     * - `addFriend`： 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权。支持的平台：QQ小程序
     * - `addColorSign`： 添加彩签，点击后添加状态有用户提示，无回调。支持的平台：QQ小程序基础库1.10.0版本+
     * - `addGroupApp`： 添加群应用（只有管理员或群主有权操作），添加后给 button 绑定 `@addgroupapp` 事件接收回调数据。支持的平台：QQ小程序基础库1.16.0版本+
     * - `addToFavorites`： 收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法。支持的平台：QQ小程序基础库1.19.0版本+
     * - `chooseAddress`： 选择用户收货地址，可以从 `@chooseaddress` 回调中获取到用户选择的地址信息。支持的平台：百度小程序3.160.3版本+
     * - `chooseInvoiceTitle`： 选择用户发票抬头，可以从 `@chooseinvoicetitle` 回调中获取到用户选择发票抬头信息。支持的平台：百度小程序3.160.3版本+
     * - `login`： 登录，可以从 `@login` 回调中确认是否登录成功。支持的平台：百度小程序3.230.1版本+
     * - `subscribe`： 订阅类模板消息，需要用户授权才可发送。支持的平台：百度小程序
     * - `favorite`： 触发用户收藏。支持的平台：快手小程序
     * - `watchLater`： 触发用户稍后再看。支持的平台：快手小程序
     * - `openProfile`： 触发打开用户主页。支持的平台：快手小程序
     */
    openType:
    | 'feedback'
    | 'share'
    | 'getUserInfo'
    | 'contact'
    | 'getPhoneNumber'
    | 'launchApp'
    | 'openSetting'
    | 'chooseAvatar'
    | 'uploadDouyinVideo'
    | 'im'
    | 'getAuthorize'
    | 'lifestyle'
    | 'contactShare'
    | 'openGroupProfile'
    | 'openGuildProfile'
    | 'openPublicProfile'
    | 'shareMessageToFriend'
    | 'addFriend'
    | 'addColorSign'
    | 'addGroupApp'
    | 'addToFavorites'
    | 'chooseAddress'
    | 'chooseInvoiceTitle'
    | 'login'
    | 'subscribe'
    | 'favorite'
    | 'watchLater'
    | 'openProfile';
    /**
     * 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果
     * - 默认： button-hover
     * - 平台差异： App-nvue 平台暂不支持
     */
    hoverClass: string;
    /**
     * 按住后多久出现点击态，单位毫秒
     * - 默认： 20
     */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     * - 默认： 70
     */
    hoverStayTime: number;
    /**
     * 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
     * - 平台差异： 微信小程序、QQ小程序
     */
    appParameter: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     * - 默认： false
     * - 平台差异： 微信小程序
     */
    hoverStopPropagation: boolean;
    /**
     * 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。
     * - 默认： 'en'
     * - 平台差异： 微信小程序
     */
    lang: string;
    /**
     * 会话来源，open-type="contact"时有效
     * - 平台差异： 微信小程序
     */
    sessionFrom: string;
    /**
     * 会话内消息卡片标题，open-type="contact"时有效
     * - 默认： 当前标题
     * - 平台差异： 微信小程序
     */
    sendMessageTitle: string;
    /**
     * 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
     * - 默认： 当前分享路径
     * - 平台差异： 微信小程序
     */
    sendMessagePath: string;
    /**
     * 会话内消息卡片图片，open-type="contact"时有效
     * - 默认： 截图
     * - 平台差异： 微信小程序
     */
    sendMessageImg: string;
    /**
     * 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效
     * - 默认： false
     * - 平台差异： 微信小程序
     */
    showMessageCard: boolean;
    /**
     * 打开群资料卡时，传递的群号
     * - open-type="openGroupProfile"
     * - 平台差异： QQ小程序
     */
    groupId: string;
    /**
     * 打开频道页面时，传递的频道号
     * - open-type="openGuildProfile"
     * - 平台差异： QQ小程序
     */
    guildId: string;
    /**
     * 打开公众号资料卡时，传递的号码
     * - open-type="openPublicProfile"
     * - 平台差异： QQ小程序
     */
    publicId: string;
    /**
     * 客服的抖音号
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    dataImId: string;
    /**
     * IM卡片类型
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    dataImType: string;
    /**
     * 商品的id，仅支持泛知识课程库和生活服务商品库中的商品
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    dataGoodsId: string;
    /**
     * 订单的id，仅支持交易2.0订单
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    dataOrderId: string;
    /**
     * 商品类型，“1”代表生活服务，“2”代表泛知识。
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    dataBizLine: string;
  };
  events: {
    /**
     * 获取用户手机号回调
     * - open-type="getPhoneNumber"
     * - 平台差异： 微信、支付宝、百度、抖音、快手、京东小程序
     */
    getphonenumber: (any) => void;
    /**
     * 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同uni.getUserInfo
     * - open-type="getUserInfo"
     * - 平台差异： 微信、QQ、百度、快手、京东小程序
     */
    getuserinfo: (any) => void;
    /**
     * 当使用开放能力时，发生错误的回调
     * - open-type="launchApp"
     * - 平台差异： 微信、QQ、快手、京东小程序
     */
    error: (any) => void;
    /**
     * 在打开授权设置页并关闭后回调
     * - open-type="openSetting"
     * - 平台差异： 微信、QQ、百度、快手、京东小程序
     */
    opensetting: (any) => void;
    /**
     * 从小程序打开 App 成功的回调
     * - open-type="launchApp"
     * - 平台差异： 微信、QQ、快手、京东小程序
     */
    launchapp: (any) => void;
    /**
     * 客服消息回调
     * - open-type="contact"
     * - 平台差异： 微信、QQ、百度、快手小程序
     */
    contact: (any) => void;
    /**
     * 获取用户头像回调
     * - open-type="chooseAvatar"
     * - 平台差异： 微信小程序
     */
    chooseavatar: (any) => void;
    /**
     * 添加群应用的回调
     * - open-type="addGroupApp"
     * - 平台差异： QQ小程序
     */
    addgroupapp: (any) => void;
    /**
     * 调起用户编辑并选择收货地址的回调
     * - open-type="chooseAddress"
     * - 平台差异： 百度小程序
     */
    chooseaddress: (any) => void;
    /**
     * 用户选择发票抬头的回调
     * - open-type="chooseInvoiceTitle"
     * - 平台差异：百度小程序
     */
    chooseinvoicetitle: (any) => void;
    /**
     * 订阅消息授权回调
     * - open-type="subscribe"
     * - 平台差异： 百度小程序
     */
    subscribe: (any) => void;
    /**
     * 登录回调
     * - open-type="login"
     * - 平台差异： 百度小程序
     */
    login: (any) => void;
    /**
     * 监听跳转IM的成功回调evevts
     * - open-type="im"
     * - 平台差异： 抖音小程序2.68.0版本+
     */
    im: (any) => void;
  };
}

/**
 * 多项选择器，内部由多个 checkbox 组成。
 */
export interface CheckboxGroup {
  props: object;
  events: {
    /**
     * <checkbox-group>中选中项发生改变是触发 change 事件，detail = {value:[选中的checkbox的value的数组]}
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    change: (e: { detail: { value: Array<any>; }; }) => void;
  };
}

/**
 * 多选项目。
 */
export interface Checkbox {
  props: {
    /**
     * `<checkbox>` 标识，选中时触发 `<checkbox-group>` 的 `change` 事件，并携带 `<checkbox>` 的 `value`
     */
    value: string;
    /**
     * 是否禁用
     * - 默认： false
     */
    disabled: boolean;
    /**
     * 当前是否选中，可用来设置默认选中
     * - 默认： false
     */
    checked: boolean;
    /**
     * checkbox 的颜色，同 CSS 的 color
     */
    color: string;
  };
  events: object;
}

/**
 * 富文本编辑器，可以对图片、文字格式进行编辑和混排。
 * - 在web开发时，可以使用contenteditable来实现内容编辑。但这是一个dom API，在非H5平台无法使用。于是微信小程序和uni-app的App-vue提供了editor组件来实现这个功能，并且在uni-app的H5平台也提供了兼容。从技术本质来讲，这个组件仍然运行在视图层webview中，利用的也是浏览器的contenteditable功能。
 * - 编辑器导出内容支持带标签的 html和纯文本的 text，编辑器内部采用 delta 格式进行存储。
 * - 通过`setContents`接口设置内容时，解析插入的 `html` 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta 进行插入。
 * - 富文本组件内部引入了一些基本的样式使得内容可以正确的展示，开发时可以进行覆盖。需要注意的是，在其它组件或环境中使用富文本组件导出的html时，需要额外引入[这段样式](https://github.com/dcloudio/uni-app/blob/master/src/core/view/components/editor/editor.css)，并维护`<ql-container><ql-editor></ql-editor></ql-container>`的结构，参考：[使用 editor 组件导出的 html](https://ask.dcloud.net.cn/article/36205)。
 * - 相关 api：[editorContext](/api/media/editor-context)
 */
export interface Editor {
  props: {
    /**
     * 设置编辑器为只读
     * - 默认： false
     */
    readOnly: boolean;
    /**
     * 提示信息
     */
    placeholder: string;
    /**
     * 点击图片时显示图片大小控件
     * - 默认： false
     */
    showImgSize: boolean;
    /**
     * 点击图片时显示工具栏控件
     * - 默认： false
     */
    showImgToolbar: boolean;
    /**
     * 点击图片时显示修改尺寸控件
     * - 默认： false
     */
    showImgResize: boolean;
  };
  events: {
    /**
     * 编辑器初始化完成时触发
     * - https://uniapp.dcloud.net.cn/component/editor.html
     * - 平台差异说明
     *   - `App`： 2.0+，app-vue
     *   - `H5`： 2.4.5+
     *   - `微信小程序`： 基础库 2.7.0+
     *   - `支付宝小程序`： 需引入动态库[引入方式](https://smartprogram.baidu.com/docs/develop/framework/dynamiclib_use/)
     *   - `百度小程序`： 不支持
     *   - `抖音小程序、飞书小程序`： 不支持
     *   - `QQ小程序`： 不支持
     *   - `快应用`： 不支持
     *   - `360小程序`： 不支持
     *   - `快手小程序`： 不支持
     */
    ready: () => void;
    /**
     * 编辑器聚焦时触发，event.detail = {html, text, delta}
     */
    focus: (e: { detail: { html: any; text: any; delta: any; }; }) => void;
    /**
     * 编辑器失去焦点时触发，detail = {html, text, delta}
     */
    blur: (e: { detail: { html: any; text: any; delta: any; }; }) => void;
    /**
     * 编辑器内容改变时触发，detail = {html, text, delta}
     */
    input: (e: { detail: { html: any; text: any; delta: any; }; }) => void;
    /**
     * 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
     */
    statuschange: () => void;
  };
}

/**
 * 表单，将组件内的用户输入的``<switch>`` ``<input>`` ``<checkbox>`` ``<slider>`` ``<radio>`` ``<picker>`` 提交。
 * - 当点击 ``<form>`` 表单中 formType 为 submit 的 ``<button>`` 组件时，会将表单组件中的 value 值进行提交，需要在表单组件中加上 name 来作为 key。
 */
export interface Form {
  props: {
    /**
     * 是否返回 formId 用于发送[模板消息](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/template-message.html)
     * - 平台差异说明：微信小程序、支付宝小程序
     */
    reportSubmit: boolean;
    /**
     * 等待一段时间（毫秒数）以确认 formId 是否生效。如果未指定这个参数，formId 有很小的概率是无效的（如遇到网络失败的情况）。指定这个参数将可以检测 formId 是否有效，以这个参数的时间作为这项检测的超时时间。如果失败，将返回 requestFormId:fail 开头的 formId
     * - 平台差异说明：微信小程序2.6.2
     */
    reportSubmitTimeout: number;
  };
  events: {
    /**
     * 携带 form 中的数据触发 submit 事件，event.detail = {value : {'name': 'value'} , formId: ''}，report-submit 为 true 时才会返回 formId
     */
    submit: (e: { detail: { value: object; formId: any; }; }) => void;
    /**
     * 表单重置时会触发 reset 事件
     */
    reset: () => void;
  };
}

/**
 * 单行输入框。
 * - html规范中input不仅是输入框，还有radio、checkbox、时间、日期、文件选择功能。在uni-app规范中，input仅仅是输入框。其他功能uni-app有单独的组件或API：[radio组件](https://uniapp.dcloud.io/component/radio)、[checkbox组件](https://uniapp.dcloud.io/component/checkbox)、[时间选择](https://uniapp.dcloud.io/component/picker?id=%e6%97%b6%e9%97%b4%e9%80%89%e6%8b%a9%e5%99%a8)、[日期选择](https://uniapp.dcloud.io/component/picker?id=%e6%97%a5%e6%9c%9f%e9%80%89%e6%8b%a9%e5%99%a8)、[图片选择](https://uniapp.dcloud.io/api/media/image?id=chooseimage)、[视频选择](https://uniapp.dcloud.io/api/media/video?id=choosevideo)、[多媒体文件选择(含图片视频)](https://uniapp.dcloud.io/api/media/video?id=choosemedia)、[通用文件选择](https://uniapp.dcloud.io/api/media/file?id=choosefile)。
 */
export interface Input {
  props: {
    /**
     * 输入框的初始内容
     */
    value: string;
    /**
     * input 的类型 有效值
     * - 默认：text
     * - 平台差异：H5 暂未支持动态切换，详见下方 Tips，请使用 v-if 进行整体切换
     * - `text`： 文本输入键盘
     * - `number`： 数字输入键 。平差差异： 均支持，App平台、H5平台 3.1.22 以下版本 vue 页面在 iOS 平台显示的键盘包含负数和小数。
     * - `idcard`： 身份证输入键盘 。平差差异： 微信、支付宝、百度、QQ小程序、快手小程序、京东小程序
     * - `digit`： 带小数点的数字键盘 。平差差异： 均支持，App平台、H5平台 vue 页面在 iOS 平台显示的键盘包含负数（原生键盘不支持负号）。
     * - `tel`： 电话输入键盘 。
     * - `safe-password`： 密码安全输入键盘 。平差差异： 微信小程序
     * - `nickname`： 昵称输入键盘 。平差差异： 微信小程序
     */
    type:
    | 'text'
    | 'number'
    | 'idcard'
    | 'digit'
    | 'tel'
    | 'safe-password'
    | 'nickname';
    /**
     * 文本区域的语义，根据类型自动填充 有效值
     * - 仅 App-nvue-iOS 支持
     * - `oneTimeCode`： 一次性验证码，常用于短信验证码输入
     */
    textContentType: 'oneTimeCode';
    /**
     * 是否是密码类型
     * - 默认：false
     * - 平台差异： H5 和 App 写此属性时，type 失效
     */
    password: boolean;
    /**
     * 输入框为空时占位符
     */
    placeholder: string;
    /**
     * 指定 placeholder 的样式
     */
    placeholderStyle: string;
    /**
     * 指定 placeholder 的样式类，注意页面或组件的 style 中写了 scoped 时，需要在类名前写 /deep/
     * - 默认：input-placeholder
     * - 平台差异：抖音小程序、飞书小程序、快手小程序不支持
     */
    placeholderClass: string;
    /**
     * 是否禁用
     * - 默认：false
     */
    disabled: boolean;
    /**
     * 最大输入长度，设置为 -1 的时候不限制最大长度
     * - 默认：140
     */
    maxlength: number;
    /**
     * 指定光标与键盘的距离，单位 px。取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     * - 平台差异： App、微信小程序、百度小程序、QQ小程序、京东小程序
     */
    cursorSpacing: number;
    /**
     * 获取焦点
     * - 默认：false
     * - 平台差异： 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
     */
    focus: boolean;
    /**
     * 设置键盘右下角按钮的文字，仅在 type="text" 时生效
     * - 默认： done
     * - 平台差异： 微信小程序、App、H5、快手小程序、京东小程序
     * - `send`：右下角按钮为“发送” 。平台差异： 微信、支付宝、百度小程序、快手小程序、京东小程序、app-nvue、app-vue和h5(2.9.9+，且要求设备webview内核Chrome81+、Safari13.7+)
     * - `search`：右下角按钮为“搜索”
     * - `send`：右下角按钮为“下一个” 。平台差异： 微信、支付宝、百度小程序、快手小程序、京东小程序、app-nvue、app-vue和h5(2.9.9+，且要求设备webview内核Chrome81+、Safari13.7+)
     * - `send`：右下角按钮为“前往” 。
     * - `send`：右下角按钮为“完成” 。平台差异： 微信、支付宝、百度小程序、快手小程序、京东小程序、app-nvue、app-vue和h5(2.9.9+，且要求设备webview内核Chrome81+、Safari13.7+)
     */
    confirmType: 'send' | 'search' | 'next' | 'go' | 'done';
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     * - 默认：false
     * - 平台差异： App(3.3.7+)、H5 (3.3.7+)、微信小程序、支付宝小程序、百度小程序、QQ小程序、京东小程序
     */
    confirmHold: boolean;
    /**
     * 指定 focus 时的光标位置
     */
    cursor: number;
    /**
     * 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用
     * - 默认： -1
     */
    selectionStart: number;
    /**
     * 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用
     * - 默认： -1
     */
    selectionEnd: number;
    /**
     * 键盘弹起时，是否自动上推页面
     * - 默认： true
     * - 平台差异： App-Android（vue 页面 softinputMode 为 adjustResize 时无效，使用 x5 内核时无效）微信小程序、百度小程序、QQ小程序、京东小程序
     */
    adjustPosition: boolean;
    /**
     * 键盘收起时，是否自动失去焦点
     * - 默认： false
     * - 平台差异： App-Vue 3.0.0+
     */
    autoBlur: boolean;
    /**
     * 是否忽略组件内对文本合成系统事件的处理。为 `false` 时将触发 `compositionstart、compositionend、compositionupdate` 事件，且在文本合成期间会触发 `input` 事件
     * - 默认： true
     * - 平台差异： App-vue (3.4.4+)、H5 (3.4.4+)、App-nvue 不支持
     */
    ignoreCompositionEvent: boolean;
    /**
     * 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
     * - 默认： false
     * - 平台差异： 微信小程序 2.10.4+
     */
    alwaysEmbed: boolean;
    /**
     * focus 时，点击页面的时候不收起键盘
     * - 默认： false
     * - 平台差异： 微信小程序 2.8.2+
     */
    holdKeyboard: boolean;
    /**
     * 安全键盘加密公钥的路径，只支持包内路径
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordCertPath: string;
    /**
     * 安全键盘输入密码长度
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordLength: number;
    /**
     * 安全键盘加密时间戳
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordTimeStamp: number;
    /**
     * 安全键盘加密盐值
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordNonce: string;
    /**
     * 安全键盘计算 hash 盐值，若指定 custom-hash 则无效
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordSalt: string;
    /**
     * 安全键盘计算 hash 的算法表达式，如 md5(sha1('foo' + sha256(sm3(password + 'bar'))))
     * - 平台差异： 微信小程序 2.18.0+
     */
    safePasswordCustomHash: string;
    /**
     * 当 type 为 number, digit, idcard 时，数字键盘是否随机排列
     * - 默认： false
     * - 平台差异： 支付宝小程序 1.9.0+
     */
    randomNumber: boolean;
    /**
     * 是否为受控组件。为 true 时，value 内容会完全受 setData 控制
     * - 默认： false
     * - 平台差异： 支付宝小程序 1.9.0+
     */
    controlled: boolean;
    /**
     * 是否强制使用系统键盘和 Web-view 创建的 input 元素。为 true 时，confirm-type、confirm-hold 可能失效
     * - 默认： false
     * - 平台差异： 支付宝小程序 2.7.3+
     */
    alwaysSystem: boolean;
    /**
     * 是一个枚举属性，提供了用户在编辑元素或其内容时可能输入的数据类型的提示
     * - 默认： text
     * - 平台差异： H5（3.6.16+）、App-vue（3.6.16+）
     * - 新增于 uni-app 3.6.16+ inputmode是html规范后期更新的内容。各家小程序还未支持此属性。
     * - `none`： 无虚拟键盘。在应用程序或者站点需要实现自己的键盘输入控件时很有用。
     * - `text`： 使用用户本地区域设置的标准文本输入键盘。
     * - `decimal`： 小数输入键盘，包含数字和分隔符（通常是“ . ”或者“ , ”），设备可能也可能不显示减号键。
     * - `numeric`： 数字输入键盘，所需要的就是 0 到 9 的数字，设备可能也可能不显示减号键。
     * - `tel`： 电话输入键盘，包含 0 到 9 的数字、星号（*）和井号（#）键。表单输入里面的电话输入通常应该使用 <input type="tel"> 。
     * - `search`： 为搜索输入优化的虚拟键盘，比如，返回键可能被重新标记为“搜索”，也可能还有其他的优化。
     * - `email`： 为邮件地址输入优化的虚拟键盘，通常包含"@"符号和其他优化。表单里面的邮件地址输入应该使用 <input type="email"> 。
     * - `url`： 为网址输入优化的虚拟键盘，比如，“/”键会更加明显、历史记录访问等。表单里面的网址输入通常应该使用 <input type="url"> 。
     */
    inputMode:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';
  };
  events: {
    /**
     * 当键盘输入时，触发input事件，event.detail = {value}
     * - input 事件处理函数可以直接 return 一个字符串，将替换输入框的内容。仅微信小程序支持。
     * - 如果遇到 value 属性设置不生效的问题参考：[组件属性设置不生效解决办法](https://uniapp.dcloud.net.cn/tutorial/vue-api.html#componentsolutions)
     * - input 组件上有默认的 min-height 样式，如果 min-height 的值大于 height 的值那么 height 样式无效。
     * - H5 暂未支持动态切换，请使用 v-if进行整体切换。
     */
    input: (e: { detail: { value: string; }; }) => void;
    /**
     * 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
     */
    focus: (e: { detail: { value: string; height: number; }; }) => void;
    /**
     * 输入框失去焦点时触发，event.detail = {value: value}
     */
    blur: (e: { detail: { value: string; }; }) => void;
    /**
     * 点击完成按钮时触发，event.detail = {value: value}
     */
    confirm: (e: { detail: { value: string; }; }) => void;
    /**
     * 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
     */
    keyboardheightchange: (e: {
      detail: { duration: any; height: number; };
    }) => void;
  };
}

/**
 * 用来改进表单组件的可用性，使用for属性找到对应的id，或者将控件放在该标签下，当点击时，就会触发对应的控件。
 * - for优先级高于内部控件，内部有多个控件的时候默认触发第一个控件。
 * - 目前可以绑定的控件有：`<button>, <checkbox>, <radio>, <switch>`。
 */
export interface Label {
  props: {
    /**
     * 绑定控件的 id
     */
    for: string;
  };
  events: object;
}

/**
 * 从底部弹起的滚动选择器。支持五种选择器，通过mode来区分，分别是普通选择器，多列选择器，时间选择器，日期选择器，省市区选择器，默认是普通选择器。
 */
export interface Picker {
  props: {
    /**
     * 五种选择器
     * - `selector`： 普通选择器
     * - `multiSelector`： 多列选择器
     * - `time`： 时间选择器
     * - `date`： 日期选择器
     * - `region`： 省市区选择器
     */
    mode: 'selector' | 'multiSelector' | 'time' | 'date' | 'region';
    /**
     * - mode = selector
     *   - 类型： `Array / Array<Object>`
     *   - mode为 selector 或 multiSelector 时，range 有效
     *   - 默认值： []
     * - mode = multiSelector
     *   - 类型： `二维 Array / 二维 Array＜Object＞`
     *   - mode为 selector 或 multiSelector 时，range 有效。二维数组，长度表示多少列，数组的每项表示每列的数据，如[["a","b"], ["c","d"]]
     *   - 默认值： []
     *
     * - mode = time(不支持)
     *
     * - mode = date(不支持)
     *
     * - mode = region(不支持)
     */
    range: Array<string> | Array<object> | Array<Array<string>> | Array<Array<object>>;
    /**
     * - mode = selector
     *   - 当 range 是一个 `Array＜Object＞` 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
     *
     * - mode = multiSelector
     *   - 当 range 是一个二维 `Array＜Object＞` 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
     *
     * - mode = time(不支持)
     *
     * - mode = date(不支持)
     *
     * - mode = region(不支持)
     */
    rangeKey: string;
    /**
     * - mode = selector
     *   - 类型： Number
     *   - value 的值表示选择了 range 中的第几个（下标从 0 开始）
     *   - 默认值： 0
     *
     * - mode = multiSelector
     *   - 类型： Array
     *   - value 每一项的值表示选择了 range 对应项中的第几个（下标从 0 开始）
     *   - 默认值： []
     *
     * - mode = time
     *   - 类型： String
     *   - 表示选中的时间，格式为"hh:mm"
     *
     * - mode = date
     *   - 类型： String
     *   - 表示选中的日期，格式为"YYYY-MM-DD"
     *   - 默认值： 0
     *
     * - mode = region
     *   - 类型： Array
     *   - 表示选中的省市区，默认选中每一列的第一个值
     */
    value: number | Array<any> | string;
    /**
     * - mode = selector
     *   - 大屏时UI类型，支持 picker、select、auto，默认在 iPad 以 picker 样式展示而在 PC 以 select 样式展示
     *   - 默认值： auto
     *   - 平台差异： H5 2.9.9+
     *
     * - mode = multiSelector(不支持)
     *
     * - mode = time(不支持)
     *
     * - mode = date(不支持)
     *
     * - mode = region(不支持)
     */
    selectorType: string;
    /**
     * - mode = selector
     *   - 是否禁用
     *   - 默认值： false
     *   - 平台差异： 快手小程序不支持
     *
     * - mode = multiSelector
     *   - 是否禁用
     *   - 默认值： false
     *   - 平台差异： 快手小程序不支持
     *
     * - mode = time
     *   - 是否禁用
     *   - 默认值： false
     *
     * - mode = date(不支持)
     *
     * - mode = region
     *   - 是否禁用
     *   - 默认值： false
     *   - 平台差异： 快手小程序不支持
     */
    disabled: boolean;
    /**
     * - mode = selector(不支持)
     *
     * - mode = multiSelector(不支持)
     *     *   -
     * - mode = time
     *   - 表示有效时间范围的开始，字符串格式为"hh:mm"
     *   - 平台差异： App 不支持
     *
     * - mode = date
     *   - 表示有效日期范围的开始，字符串格式为"YYYY-MM-DD"
     *
     * - mode = region(不支持)
    */
    start: string;
    /**
     * - mode = selector(不支持)
     *
     * - mode = multiSelector(不支持)
     *
     * - mode = time
     *   - 表示有效时间范围的结束，字符串格式为"hh:mm"
     *   - 平台差异： App 不支持
     *
     * - mode = date
     *   - 表示有效日期范围的结束，字符串格式为"YYYY-MM-DD"
     *
     * - mode = region(不支持)
    */
    end: string;
    /**
     * - mode = selector(不支持)
     *
     * - mode = multiSelector(不支持)
     *
     * - mode = time(不支持)
     *
     * - mode = date
     *   - 有效值 year、month、day，表示选择器的粒度，默认为 day，App 端未配置此项时使用系统 UI
     *   - 默认：day
     *   - 平台兼容：H5、App 2.6.3+、微信小程序、百度小程序、抖音小程序、飞书小程序
     *     - `year`： 选择器粒度为年
     *     - `month`： 选择器粒度为月份
     *     - `day`： 选择器粒度为天
     *
     * - mode = region(不支持)
    */
    fields: 'year' | 'month' | 'day';
    /**
     * - mode = selector(不支持)
     *
     * - mode = multiSelector(不支持)
     *
     * - mode = time(不支持)
     *
     * - mode = date(不支持)
     *
     * - mode = region
     *   - 可为每一列的顶部添加一个自定义的项
    */
    customItem: string;
  };
  events: {
    /**
     * - mode = selector
     *   - value 改变时触发 change 事件，event.detail = {value: value}
     *
     * - mode = multiSelector
     *   - value 改变时触发 change 事件，event.detail = {value: value}
     *
     * - mode = time
     *   - value 改变时触发 change 事件，event.detail = {value: value}
     *
     * - mode = date
     *   - value 改变时触发 change 事件，event.detail = {value: value}
     *
     * - mode = region
     *    - value 改变时触发 change 事件，event.detail = {value: value}
     */
    change: (e: { detail: { value: any; }; }) => void;
    /**
     * - mode = selector
     *   - 取消选择或点遮罩层收起 picker 时触发
     *   - 平台差异： 快手小程序不支持
     *
     * - mode = multiSelector
     *   - 取消选择时触发
     *   - 平台差异： 快手小程序不支持
     *
     * - mode = time
     *   - 取消选择时触发
     *
     * - mode = date
     *   - 取消选择时触发
     *
     * - mode = region(不支持)
     */
    cancel: () => void;
    /**
     * - mode = selector(不支持)
     *
     * - mode = multiSelector(不支持)
     *
     * - mode = multiSelector
     *   - 某一列的值改变时触发 columnchange 事件，event.detail = {column: column, value: value}，column 的值表示改变了第几列（下标从0开始），value 的值表示变更值的下标
     *
     * - mode = time(不支持)
     *
     * - mode = region
     *   - 取消选择时触发
     *   - 平台差异： 快手小程序不支持
    */
    columnchange: (e: { detail: { column: any, value: any; }; }) => void;
  };
}

/**
 * 嵌入页面的滚动选择器。
 * - 相对于picker组件，picker-view拥有更强的灵活性。当需要对自定义选择的弹出方式和UI表现时，往往需要使用picker-view。
 * - 其中只可放置 `<picker-view-column/>` 组件，其他节点不会显示
*/
export interface PickerView {
  props: {
    /**
     * 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
    */
    value: Array<number>;
    /**
     * 设置选择器中间选中框的样式
    */
    indicatorStyle: string;
    /**
     * 设置选择器中间选中框的类名，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
     * - 平台差异： app-nvue与抖音小程序与飞书小程序不支持
    */
    indicatorClass: string;
    /**
     * 设置蒙层的样式
    */
    maskStyle: string;
    /**
     * 设置蒙层上半部分的样式
     * - 平台差异： 仅 app-nvue（3.6.7+） 支持
    */
    maskTopStyle: string;
    /**
     * 设置蒙层下半部分的样式
     * - 平台差异： 仅 app-nvue（3.6.7+） 支持
    */
    maskBottomStyle: string;
    /**
     * 设置蒙层的类名
     * - 平台差异： app-nvue与抖音小程序与飞书小程序不支持
    */
    maskClass: string;
    /**
     * 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。
     * - 平台差异： 微信小程序 2.21.1
    */
    immediateChange: string;
  };
  events: {
    /**
     * 当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）
    */
    change: (e: { detail: { value: number; }; }) => void;
    /**
     * 当滚动选择开始时候触发事件
     * - 平台差异： 微信小程序2.3.1、快手小程序
    */
    pickstart: () => void;
    /**
     * 当滚动选择结束时候触发事件
     * - 平台差异： 微信小程序2.3.1、快手小程序
    */
    change: () => void;
  };
}

/**
 * `<picker-view />`的子组件，仅可放置于 `<picker-view />` 中，其子节点的高度会自动设置成与 picker-view 的选中框的高度一致。
 * - nvue页面子节点未继承 picker-view 的选中框的高度，需要自己设置高度并居中
*/
export interface PickerViewColumn {
  props: object;
  events: object;
}

/**
 * 单项选择器，内部由多个 `<radio>` 组成。通过把多个radio包裹在一个radio-group下，实现这些radio的单选。
*/
export interface RadioGroup {
  props: object;
  events: {
    /**
     * `<radio-group>` 中的选中项发生变化时触发 change 事件，event.detail = {value: 选中项radio的value}
    */
    change: (e: { detail: { value: string; }; }) => void;
  };
}

/**
 * 单选项目。
*/
export interface Radio {
  props: {
    /**
     * <radio> 标识。当该 <radio> 选中时，<radio-group> 的 change 事件会携带 <radio> 的 value
    */
    value: string;
    /**
     * 当前是否选中
     * - 默认： false
    */
    checked: boolean;
    /**
     * 是否禁用
     * - 默认： false
    */
    disabled: boolean;
    /**
     * radio的颜色，同css的color
    */
    checked: string;
  };
  events: object;
}

/**
 * 滑动选择器。
*/
export interface Slider {
  props: {
    /**
     * 最小值
     * - 默认： 0
    */
    min: number;
    /**
     * 最大值
     * - 默认： 100
    */
    max: number;
    /**
     * 步长，取值必须大于 0，并且可被(max - min)整除
     * - 默认： 1
    */
    step: number;
    /**
     * 是否禁用
     * - 默认： false
    */
    disabled: boolean;
    /**
     * 当前取值
     * - 默认： 0
    */
    value: number;
    /**
     * 滑块左侧已选择部分的线条颜色
     * - 默认：
     *   - 微信平台：绿色(#1aad19)
     *   - 头条：红色
     *   - 其他平台： #007aff（蓝色）
    */
    activeColor: string;
    /**
     * 滑块右侧背景条的颜色
     * - 默认： #e9e9e9
    */
    backgroundColor: string;
    /**
     * 滑块的大小，取值范围为 12 - 28
     * - 默认： 28
    */
    blockSize: number;
    /**
     * 滑块的颜色
     * - 默认： #ffffff
    */
    blockColor: number;
    /**
     * 是否显示当前 value
     * - 默认： false
    */
    showValue: boolean;
  };
  events: {
    /**
     * 完成一次拖动后触发的事件，event.detail = {value: value}
    */
    change: (e: { detail: { value: number; }; }) => void;
    /**
     * 拖动过程中触发的事件，event.detail = {value: value}
    */
    changing: (e: { detail: { value: number; }; }) => void;
  };
}

export interface Switch {
  props: {
    /**
     * 是否选中
     * - 默认： false
    */
    checked: boolean;
    /**
     * 是否禁用
     * - 默认： false
     * - 平台支持： 抖音小程序与飞书小程序不支持
    */
    disabled: boolean;
    /**
     * 样式，有效值：switch, checkbox
     * - 默认： switch
    */
    type: 'switch' | 'checkbox';
    /**
     * switch 的颜色，同 css 的 color
     * - 默认： false
    */
    color: string;
  };
  events: {
    /**
     * checked 改变时触发 change 事件，event.detail={ value:checked}
    */
    change: (e: { detail: { value: any; }; }) => void;
  };
}

/**
 * 多行输入框。
*/
export interface Textarea {
  props: {
    /**
     * 输入框的内容
    */
    value: string;
    /**
     * 输入框为空时占位符
    */
    placeholder: string;
    /**
     * 指定 placeholder 的样式
    */
    placeholderStyle: string;
    /**
     * 指定 placeholder 的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
     * - textarea-placeholder
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序不支持
    */
    placeholderClass: string;
    /**
     * 是否禁用
     * - 默认： false
    */
    disabled: boolean;
    /**
     * 最大输入长度，设置为 -1 的时候不限制最大长度
     * - 默认： 140
    */
    maxlength: number;
    /**
     * 获取焦点
     * - 默认： false
     * - 平台差异： 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
    */
    focus: boolean;
    /**
     * 自动聚焦，拉起键盘
     * - 默认： false
     * - 平台差异： 京东小程序
    */
    autoFocus: boolean;
    /**
     * 是否自动增高，设置auto-height时，style.height不生效
     * - 默认： false
    */
    autoHeight: boolean;
    /**
     * 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
     * - 默认： false
     * - 平台差异： 微信小程序、百度小程序、抖音小程序、飞书小程序、QQ小程序、快手小程序、京东小程序
    */
    fixed: boolean;
    /**
     * 指定光标与键盘的距离，单位 px 。取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     * - 默认： 0
     * - 平台差异： App、微信小程序、百度小程序、抖音小程序、飞书小程序、QQ小程序、京东小程序
    */
    cursorSpacing: number;
    /**
     * 指定focus时的光标位置
     * - 平台差异： 微信小程序、App、H5、百度小程序、抖音小程序、飞书小程序、QQ小程序、京东小程序
    */
    cursor: string;
    /**
     * 设置键盘右下角按钮的文字
     * - 默认： done
     * - 平台差异： 微信小程序基础库2.13.0+、App-vue和H5(2.9.9+，且要求设备webview内核Chrome81+、Safari13.7+)
     *   - `send`： 右下角按钮为“发送”
     *   - `search`： 右下角按钮为“搜索”
     *   - `next`： 右下角按钮为“下一个”
     *   - `go`： 右下角按钮为“前往”
     *   - `done`： 右下角按钮为“完成”
    */
    confirmType:
    'send'
    | 'search'
    | 'next'
    | 'go'
    | 'done';
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     * - 默认： false
     * - 平台差异： App(3.3.7+)、H5 (3.3.7+)、微信小程序 (基础库 2.16.0+)、百度小程序 (基础库 3.130.1+)、快手小程序
    */
    confirmHold: boolean;
    /**
     * 是否显示键盘上方带有”完成“按钮那一栏
     * - 默认： true
     * - 平台差异： 微信小程序、百度小程序、QQ小程序、京东小程序
    */
    showConfirmBar: boolean;
    /**
     * 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
     * - 默认： -1
     * - 平台差异： 微信小程序、App、H5、百度小程序、抖音小程序、飞书小程序、QQ小程序、京东小程序
    */
    selectionStart: number;
    /**
     * 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
     * - 默认： -1
     * - 平台差异： 微信小程序、App、H5、百度小程序、抖音小程序、飞书小程序、QQ小程序、京东小程序
    */
    selectionEnd: number;
    /**
     * 键盘弹起时，是否自动上推页面
     * - 默认： true
     * - 平台差异： App-Android（softinputMode 为 adjustResize 时无效）、微信小程序、百度小程序、QQ小程序、京东小程序
    */
    adjustPosition: boolean;
    /**
     * 是否去掉 iOS 下的默认内边距
     * - 默认： false
     * - 平台差异： 微信小程序2.10.0、飞书小程序 3.46
    */
    disableDefaultPadding: boolean;
    /**
     * focus时，点击页面的时候不收起键盘
     * - 默认： false
     * - 平台差异： 微信小程序2.8.2
    */
    holdKeyboard: boolean;
    /**
     * 键盘收起时，是否自动失去焦点
     * - 默认： false
     * - 平台差异： App-vue 3.0.0+ ，App-nvue不支持
    */
    autoBlur: boolean;
    /**
     * 是否忽略组件内对文本合成系统事件的处理。为 false 时将触发 compositionstart、compositionend、compositionupdate 事件，且在文本合成期间会触发 input 事件
     * - 默认： true
     * - 平台差异： App-vue (3.4.4+)、H5 (3.4.4+)、App-nvue不支持
    */
    ignoreCompositionEvent: boolean;
    /**
     * 是一个枚举属性，它提供了用户在编辑元素或其内容时可能输入的数据类型的提示。有效值
     * - 默认： text
     * - 平台差异： H5（3.7.0+）、App-vue（3.7.0+）
     * - 新增于 uni-app 3.7.0+ inputmode是html规范后期更新的内容。各家小程序还未支持此属性。
     * - 在符合条件的高版本webview里，uni-app的web和app-vue平台中可使用本属性。
     *   - `none`： 无虚拟键盘。在应用程序或者站点需要实现自己的键盘输入控件时很有用。
     *   - `text`： 使用用户本地区域设置的标准文本输入键盘。
     *   - `decimal`： 小数输入键盘，包含数字和分隔符（通常是“ . ”或者“ , ”），设备可能也可能不显示减号键。
     *   - `numeric`： 数字输入键盘，所需要的就是 0 到 9 的数字，设备可能也可能不显示减号键。
     *   - `tel`： 电话输入键盘，包含 0 到 9 的数字、星号（*）和井号（#）键。表单输入里面的电话输入通常应该使用 `<input type="tel">` 。
     *   - `search`： 为搜索输入优化的虚拟键盘，比如，返回键可能被重新标记为“搜索”，也可能还有其他的优化。
     *   - `email`： 为邮件地址输入优化的虚拟键盘，通常包含"@"符号和其他优化。表单里面的邮件地址输入应该使用 `<input type="email">` 。
     *   - `url`： 为网址输入优化的虚拟键盘，比如，“/”键会更加明显、历史记录访问等。表单里面的网址输入通常应该使用 `<input type="url">` 。
    */
    inputmode:
    'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url';

  };
  events: {
    /**
     * 输入框聚焦时触发，event.detail = { value, height }，height 为键盘高度
     * - 平台差异： 仅微信小程序、京东小程序、App（HBuilderX 2.0+ nvue uni-app模式） 、QQ小程序支持 height
    */
    focus: (e: { detail: { value: string, height: number; }; }) => void;
    /**
     * 输入框失去焦点时触发，event.detail = {value, cursor}
     * - 平台差异： 快手小程序不支持
    */
    blur: (e: { detail: { value: string, cursor: any; }; }) => void;
    /**
     * 输入框行数变化时调用，event.detail = {height: 0, heightRpx: 0, lineCount: 0}
     * - 平台差异： 抖音小程序、飞书小程序、快手小程序不支持
    */
    linechange: (e: { detail: { value: string, heightRpx: number; lineCount: number; }; }) => void;
    /**
     * 当键盘输入时，触发 input 事件，event.detail = {value, cursor}，`@input`处理函数的返回值并不会反映到 textarea 上
     * - 平台差异： 快手小程序不支持
    */
    input: (e: { detail: { value: string, cursor: any; }; }) => void;
    /**
     * 点击完成时， 触发 confirm 事件，event.detail = {value: value}
     * - 平台差异： 微信小程序、百度小程序、QQ小程序、京东小程序
    */
    confirm: (e: { detail: { value: string; }; }) => void;
    /**
     * 键盘高度发生变化的时候触发此事件，event.detail = {height: height, duration: duration}
     * - 平台差异： 微信小程序基础库2.7.0+、App 3.1.0+
    */
    keyboardheightchange: (e: { detail: { height: number, duration: number; }; }) => void;
  };
}
