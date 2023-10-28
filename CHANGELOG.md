# h-uni 更新日志
h-uni 所有版本的变更记录都记录在此页面 
## [1.10.0-alpha.2](https://github.com/hewx815/h-uni/compare/v1.10.0-alpha.1...v1.10.0-alpha.2) (2023-10-28)


### 🐛 Bug Fixes | Bug 修复

* `yarn h-uni APPDevTool` 进程未退出 ([f32b1d8](https://github.com/hewx815/h-uni/commit/f32b1d88679e60df63076f4fe2ec00f16e970623))
* 缺少 APPDevTool.config 配置文件 程序无法执行，优化 APP 资源目录 错误处理 ([078cd51](https://github.com/hewx815/h-uni/commit/078cd51c132ac53f848968d422cf97f39fb269cd))
* 效验 java 版本 ([872659a](https://github.com/hewx815/h-uni/commit/872659ad72d0ac9b95628a686e12a3d1b6150345))
* 重构 APPDevTool initTemplate模块 ([b4d4fd6](https://github.com/hewx815/h-uni/commit/b4d4fd6e36c1a813dae91426780b67c9fb6eb808))
* aPPDevTool 获取 resourceDir 适配vue-cli、vite ([0fb40ae](https://github.com/hewx815/h-uni/commit/0fb40ae532f0a8b80853c93afdb5514f76d4107c))


### ⚡ Performance Improvements | 性能优化

* 移除内置uniSdk，默认读取 .uniSdk 文件夹 ([677ddbc](https://github.com/hewx815/h-uni/commit/677ddbc89d901be528684fd34cd9657c8d74bf87))

## [1.10.0-alpha.1](https://github.com/hewx815/h-uni/compare/v1.10.0-alpha.0...v1.10.0-alpha.1) (2023-10-24)


### ✏️ Documentation | 文档

* 修复错误链接，图片 ([f8a43ce](https://github.com/hewx815/h-uni/commit/f8a43ceff03257a42656b9127263b3c409c4b3f3))

## [1.10.0-alpha.0](https://github.com/hewx815/h-uni/compare/v1.9.4...v1.10.0-alpha.0) (2023-10-24)


### ✨ Features | 新功能

* v2 APPDevTool 安卓部分 功能 ([0543309](https://github.com/hewx815/h-uni/commit/0543309f0a245b8b771d9904454ed89d8e73ec76))


### 🐛 Bug Fixes | Bug 修复

* aPPDevTool 修改文件丢失 ([5f88475](https://github.com/hewx815/h-uni/commit/5f88475c432c9fb7d96bb17b69bc6f1e30a3dc21))


### ✏️ Documentation | 文档

* 新增Android Studio windows 安装教程 ([1c1ddbc](https://github.com/hewx815/h-uni/commit/1c1ddbcf5487ac62d3b7d6b6020e9defa40c45b4))
* 支持性表格重构代码 ([8ae6034](https://github.com/hewx815/h-uni/commit/8ae60348cc3726a97acf17045ea9ab57b64533f2))
* aPPDevTool 基础文档 ([271787b](https://github.com/hewx815/h-uni/commit/271787b08419a0be5d388a6ece49aba4fe8b5b12))
* vitepress 重构 ([0aed9ab](https://github.com/hewx815/h-uni/commit/0aed9abe390c74be2b8bc9472a64f99aee1ffe2c))

### [1.9.4](https://github.com/hewx815/h-uni/compare/v1.9.3...v1.9.4) (2023-10-08)


### ✏️ Documentation | 文档

* 添加百度站点验证 ([3787e7e](https://github.com/hewx815/h-uni/commit/3787e7e08f56a1ef96453568c2adf1883bc97bc4))

### [1.9.3](https://github.com/hewx815/h-uni/compare/v1.9.2...v1.9.3) (2023-09-25)


### 👷 Continuous Integration | CI 配置

* 修复转换vue文件 setup 属性bug，发布流程打包性能优化 ([81e001a](https://github.com/hewx815/h-uni/commit/81e001a50ca4f6943e28e14977ea264932ab5543))

### [1.9.2](https://github.com/hewx815/h-uni/compare/v1.9.1...v1.9.2) (2023-09-24)


### ✏️ Documentation | 文档

* 主题变更 ([ebab7b3](https://github.com/hewx815/h-uni/commit/ebab7b3c61d29f82d51ad330d9dc31eab997e54b))


### 👷 Continuous Integration | CI 配置

* 修复服务端运行build命令错误 ([87b781c](https://github.com/hewx815/h-uni/commit/87b781cb79def35ec4ef8d00c28f1f4e7c08bdd7))

### [1.9.1](https://github.com/hewx815/h-uni/compare/v1.9.0...v1.9.1) (2023-09-22)


### ✏️ Documentation | 文档

* vitepress 升级 1.0.0-rc.15，更改文档代码块主题 ([966dd65](https://github.com/hewx815/h-uni/commit/966dd65bdb8b077f8231a72ead3b03791f139ab6))

## [1.9.0](https://github.com/hewx815/h-uni/compare/v1.9.0-alpha.1...v1.9.0) (2023-09-21)


### 🐛 Bug Fixes | Bug 修复

* 更换 vue2 中cssConverter用法 ([927f5dd](https://github.com/hewx815/h-uni/commit/927f5dd213774ec0b3b0110e5e4676f409a6752e))
* vite-plugin-h-uni-build 无法启动，eslint 忽略 js 文件 ([c99893a](https://github.com/hewx815/h-uni/commit/c99893a182338e3348db8bbf8fe84937798ff652))


### ✏️ Documentation | 文档

* 修改更新日志header ([e28fd5f](https://github.com/hewx815/h-uni/commit/e28fd5f41d034749179a8919954fe41618585184))


### ✨ Features | 新功能

* cssConverter 补充函数：cssConverterString、cssConverterObject ([dc949df](https://github.com/hewx815/h-uni/commit/dc949dfbf72b7799efea9de86f9c528300da41b4))
* vue3 新增HTab组件，文档更新 ([7a999cf](https://github.com/hewx815/h-uni/commit/7a999cfda25ba3156ec60316634acd11af63a169))


### 👷 Continuous Integration | CI 配置

* 更改分支名称 ([d09a2be](https://github.com/hewx815/h-uni/commit/d09a2beabf280aa3b210a9c83059cfbb0750fa89))

## [1.9.0-alpha.1](https://github.com/hewx815/h-uni/compare/v1.9.0-alpha.0...v1.9.0-alpha.1) (2023-09-13)


### 👷 Continuous Integration | CI 配置

* 发布命令错误修复 ([edf1461](https://github.com/hewx815/h-uni/commit/edf14615380db3773038f23d4d6dd085640de983))

## [1.9.0-alpha.0](https://github.com/hewx815/h-uni/compare/v1.8.0...v1.9.0-alpha.0) (2023-09-13)


### 🚀 Chore | 构建/工程依赖/工具

* 移除多余tag，yarn.lock 更新 ([72704a2](https://github.com/hewx815/h-uni/commit/72704a2d36bd37c458d7f457741ba6de652ed78c))


### 👷 Continuous Integration | CI 配置

* 增加 build:npm 只打包npm包的脚本，release 脚本不再执行站点打包 ([f0a7a18](https://github.com/hewx815/h-uni/commit/f0a7a18d307d925ca0f2a3896bf26fa7d01de58a))


### ✨ Features | 新功能

* for-vue3 Hhttp、cssConverter 功能 ([a88f32d](https://github.com/hewx815/h-uni/commit/a88f32d691a8e9ed48ad14f3acd620acdb296d70))


### 🐛 Bug Fixes | Bug 修复

* 短横线命名组件缺少组件内容 ([cc7975e](https://github.com/hewx815/h-uni/commit/cc7975e12acd5608cf86d4f457c1a7f818a85db9))
* vue2 TypeHelper 修复重名组件类型丢失 ([abbce38](https://github.com/hewx815/h-uni/commit/abbce38ee022df02b174e9c856d2baef203664a9))
* vue2 TypeHelper 组件 事件方法类型提示 ([cab8c89](https://github.com/hewx815/h-uni/commit/cab8c89d83eea334b00b18b25b517aaf602f31c6))

## [1.8.0](https://github.com/hewx815/h-uni/compare/v1.7.0...v1.8.0) (2023-09-02)


### 🚀 Chore | 构建/工程依赖/工具

* typeHelper 类型标注 50% ([8d84c0c](https://github.com/hewx815/h-uni/commit/8d84c0c9f183117de459cc478918606897ab3f0a))


### ✨ Features | 新功能

* typeHelper 完成 初步类型标注 ([6a6a952](https://github.com/hewx815/h-uni/commit/6a6a9523af5e6a4ba3b4aa44a59bcd9ad450a63b))


### ✏️ Documentation | 文档

* typeHelper 文档编写 ([4d501cb](https://github.com/hewx815/h-uni/commit/4d501cbb9cda4327460bc0c1259b52cbe28536c4))

## [1.7.0](https://github.com/hewx815/h-uni/compare/v1.7.0-alpha.4...v1.7.0) (2023-09-01)

## [1.7.0-alpha.4](https://github.com/hewx815/h-uni/compare/v1.7.0-alpha.3...v1.7.0-alpha.4) (2023-09-01)


### 🐛 Bug Fixes | Bug 修复

* hhttp 合并配置 bug修复，新增测试页面 ([23735b1](https://github.com/hewx815/h-uni/commit/23735b109a6c5592273e1fdd1b8c84027c36fe04))

## [1.7.0-alpha.3](https://github.com/hewx815/h-uni/compare/v1.7.0-alpha.2...v1.7.0-alpha.3) (2023-08-31)


### 🐛 Bug Fixes | Bug 修复

* 插件库与工具库分离，vue-cli-plugin-h-uni-build defineConfig 导入 bug ([1a14e9e](https://github.com/hewx815/h-uni/commit/1a14e9efe763932cdfcfadce2ae542554a53163d))

## [1.7.0-alpha.2](https://github.com/hewx815/h-uni/compare/v1.7.0-alpha.1...v1.7.0-alpha.2) (2023-08-31)


### 🐛 Bug Fixes | Bug 修复

* vue-cli-plugin-h-uni-build defineConfig 导入 bug ([8915ac3](https://github.com/hewx815/h-uni/commit/8915ac31b51bc061f334dfca79a09c578b9af373))

## [1.7.0-alpha.1](https://github.com/hewx815/h-uni/compare/v1.7.0-alpha.0...v1.7.0-alpha.1) (2023-08-31)


### 🐛 Bug Fixes | Bug 修复

* 更改 导入安装方式 ([568eec1](https://github.com/hewx815/h-uni/commit/568eec1dffbc12dd4da64221d224d2950ad9844c))


### ✏️ Documentation | 文档

* 跳转组件文档bug ([9569369](https://github.com/hewx815/h-uni/commit/95693695870313a9d6544789aca2af04718d1bed))

## [1.7.0-alpha.0](https://github.com/hewx815/h-uni/compare/v1.6.0...v1.7.0-alpha.0) (2023-08-30)


### ✏️ Documentation | 文档

* 合并引起的 示例bug修复 ([2d5f187](https://github.com/hewx815/h-uni/commit/2d5f1873609ebcc0feed85aa941f76bb4d805263))
* 移除多余无用的组件工具文档 ([153fe6a](https://github.com/hewx815/h-uni/commit/153fe6aff0cae0262f4f11a798ebb976af3285d4))
* vue-cli-plugin-h-uni-build 、 vite-plugin-h-uni-build 文档更新 ([c42801e](https://github.com/hewx815/h-uni/commit/c42801ef4df0feed53cef27a39a350d3d0dad9e8))
* vue3文档开始页面 ([f48b982](https://github.com/hewx815/h-uni/commit/f48b982e50efdc7b9d215899332339f82518e6ae))


### 🚀 Chore | 构建/工程依赖/工具

* 代码格式化 ([ab598b8](https://github.com/hewx815/h-uni/commit/ab598b8776d769c0433fa74b0e6708631c0be535))
* 增加Vue3项目各平台编译信息 ([56950df](https://github.com/hewx815/h-uni/commit/56950df9b99ca66792b352cfb892ea9fe8859c88))
* for-vue2 版本更新 至 2.0.2-3080720230703001 ([fb6c859](https://github.com/hewx815/h-uni/commit/fb6c859f16cd46fa402ca4d594be96220f0cb176))
* for-vue3 更新版本至 3.0.0-alpha-3070720230316001 ([a2eac4e](https://github.com/hewx815/h-uni/commit/a2eac4eff5b197a82e631a396ae713cd3c6b7c33))
* vitepress 升级^1.0.0-rc.4 ([319c129](https://github.com/hewx815/h-uni/commit/319c129062fd20b6e57797cc56ab6e974839dfb1))
* vue3 项目 eslint 代码格式配置 ([d32e781](https://github.com/hewx815/h-uni/commit/d32e781d429961a2c603e80a0ac15857af76d46a))


### ♻️ Code Refactoring | 代码重构

* 使用ts进行开发，提供类型支持 ([8e77acc](https://github.com/hewx815/h-uni/commit/8e77accdb0c724053c020ca3ad8e9d181d4244b8))
* hhttp 代码重构，新增 ts 类型支持 ([6a07ed0](https://github.com/hewx815/h-uni/commit/6a07ed03bbb7932969db70fdca584b87312af3b3))


### ✨ Features | 新功能

* 增加for-vue2更多的组件方法挂载方式 ([f01d097](https://github.com/hewx815/h-uni/commit/f01d097271ea28ac97720cd052c20a853d087db0))
* vite-plugin-h-uni-build 插件新增 ([3dfa770](https://github.com/hewx815/h-uni/commit/3dfa770774b38566902ca305aaf3422636d951b8))
* vue2 新增 TypeHelper 类型工具 ([375a4d9](https://github.com/hewx815/h-uni/commit/375a4d9127742810b034c12ea1e471fcd479ec31))

## [1.6.0](https://github.com/hewx815/h-uni/compare/v1.5.0...v1.6.0) (2023-08-08)


### 🐛 Bug Fixes | Bug 修复

* h-uni 命令错误，columnify 依赖调整 ([18c72d4](https://github.com/hewx815/h-uni/commit/18c72d485249f40433b2c2f47c922687da5c0d65))


### 🚀 Chore | 构建/工程依赖/工具

* 取消对计划对 QQ,京东，快手小程序的支持，增加飞书小程序计划 ([d91d5d2](https://github.com/hewx815/h-uni/commit/d91d5d265ef677abebe7eeac61e06ca0ad3f5b4d))
* eslint 规则调整 ([3de56a1](https://github.com/hewx815/h-uni/commit/3de56a120a259418a89477b8795a3c25e22f619b))


### ✏️ Documentation | 文档

* 代码块右下角滚动条拖动块隐藏 ([2df665d](https://github.com/hewx815/h-uni/commit/2df665d1e6906b1630ad4a361d4cae446253aa99))


### ✨ Features | 新功能

* hhttp 支持支付宝、百度、抖音、飞书 平台 ([aef6673](https://github.com/hewx815/h-uni/commit/aef66734793663e97c6f57066860da88f4e48146))
* hTab组件 支持百度平台 ([f0d3318](https://github.com/hewx815/h-uni/commit/f0d33187a9f5463e9a5835679382371f18134fb4))
* hTab组件支持支付宝、飞书平台&&文档更新 ([2d3ecc9](https://github.com/hewx815/h-uni/commit/2d3ecc9c098f65b4dce6c67c62a7c41ccf8657a4))
* vue-cli-plugin-h-uni-build `delOldFile`编译前删除旧的编译文件功能 ([28dc066](https://github.com/hewx815/h-uni/commit/28dc0668ad21bc6f9da63d058e174fe6c52ec33f))
* vue-cli-plugin-h-uni-build 支持百度平台 ([a0224fd](https://github.com/hewx815/h-uni/commit/a0224fd59a5baf4a070e91379377521baba55d9e))
* vue-cli-plugin-h-uni-build 支持飞书平台&&文档更新 ([dc5b2b2](https://github.com/hewx815/h-uni/commit/dc5b2b2d4db3b82aae259c640366a0bb6ab7e529))
* vue-cli-plugin-h-uni-build 支持支付宝平台 ([22ae332](https://github.com/hewx815/h-uni/commit/22ae332f8e64d9f9574cc0b10e9085ff01126a5f))

## [1.5.0](https://github.com/hewx815/h-uni/compare/v1.4.2...v1.5.0) (2023-08-01)


### 🚀 Chore | 构建/工程依赖/工具

* uniapp版本更新 ([9c068f0](https://github.com/hewx815/h-uni/commit/9c068f063e45c694e5cd01edf8585d9aa290a6a4))


### ✨ Features | 新功能

* 组件：HTab 对抖音小程序平台的支持 ([d757cd8](https://github.com/hewx815/h-uni/commit/d757cd88c2b36fd49a4a78bee63679a7121aaef0))
* vue-cli-plugin-h-uni-build 新增对头条平台的支持&&文档更新 ([315a791](https://github.com/hewx815/h-uni/commit/315a791fbc947b3fa13641ccc7ac1e2488566b47))


### ✏️ Documentation | 文档

* 部分功能文档兼容性更新 ([ca20aee](https://github.com/hewx815/h-uni/commit/ca20aee562983733a1a046b596b2b36eda5a556e))

### [1.4.2](https://github.com/hewx815/h-uni/compare/v1.4.1...v1.4.2) (2023-07-26)


### 🚀 Chore | 构建/工程依赖/工具

* 手机预览组件生产环境域名配置 ([fffdc96](https://github.com/hewx815/h-uni/commit/fffdc96de096bd7cebe5e5c0e8751fd0bc654fa9))


### 🐛 Bug Fixes | Bug 修复

* 组件：HTab在微信小程序中的兼容问题 ([5292566](https://github.com/hewx815/h-uni/commit/5292566f81125078d364d32a2bf95ffdc0f111ce))


### ✏️ Documentation | 文档

* 修复文档无logo的bug ([a570562](https://github.com/hewx815/h-uni/commit/a570562aa7dea040fffba4c7ccdeb9d33f9fa881))


### 👷 Continuous Integration | CI 配置

* 修复：文档网站图片丢失问题，模拟器访问404 ([db9bf4d](https://github.com/hewx815/h-uni/commit/db9bf4d2e47bb507da4ac55c34cf4b8ec4aff89c))

### [1.4.1](https://github.com/hewx815/h-uni/compare/v1.4.0...v1.4.1) (2023-07-24)


### 🐛 Bug Fixes | Bug 修复

* 示例文件重命名：HtabSlot.vue=>HTabSlots.vue ([c4ceaff](https://github.com/hewx815/h-uni/commit/c4ceaff3e18f7bfcfde2dd8e649df2ec0985ad1c))

## [1.4.0](https://github.com/hewx815/h-uni/compare/v1.3.0...v1.4.0) (2023-07-24)


### 👷 Continuous Integration | CI 配置

* 打包脚本：生成短横线命名的资源文件夹 ([6860a7e](https://github.com/hewx815/h-uni/commit/6860a7ec20d01fc7e9055961f14e656530b6c64b))
* build 命令新增删除 dist 下所有 README.md ([11c1669](https://github.com/hewx815/h-uni/commit/11c16698ecc694370f02471ac6b050a7482d56d8))


### 🚀 Chore | 构建/工程依赖/工具

* 打包脚本增加h5预览打包，修改原有打包路径 ([273f108](https://github.com/hewx815/h-uni/commit/273f1084629a3fe4ecc03bed4fa56919995f86da))
* 新增 vue-cli-plugin-h-uni-build `afterBuild` 功能在H5平台特殊情况的提示功能 ([a7f1b20](https://github.com/hewx815/h-uni/commit/a7f1b20a0274320b3507fe68353bad8bab16ac60))
* vitepress 升级版本至 1.0.0-beta.5 ([f4c1b0c](https://github.com/hewx815/h-uni/commit/f4c1b0c4adfd8b7dfe8d34da86cf6c90a5b2682f))
* vitepress升级1.0.0-beta.6 配置：在开发期间禁用 md 缓存 ([dc04c45](https://github.com/hewx815/h-uni/commit/dc04c4525683cfdddd9cae8ed1c4dab0b3bde5e2))


### ✨ Features | 新功能

* 新增 cssConverter样式转换器，安装文档更新 ([ff829e7](https://github.com/hewx815/h-uni/commit/ff829e7b153f158b75fe4895ede767bf2c9ffdc7))
* h-column-tab 组件 => HTab 组件 ，组件基础功能完成 ([f3a92d2](https://github.com/hewx815/h-uni/commit/f3a92d28878b5c51c126f9cc84d0094fe13eef0a))
* hTab 标签栏组件功能测试完善&&文档更新 ([b9a673b](https://github.com/hewx815/h-uni/commit/b9a673b406d5acb1df273c089292f1031ce0bbfa))
* vue-cli-plugin-h-uni-build 对 H5 平台的支持性 ([cf2752d](https://github.com/hewx815/h-uni/commit/cf2752d36bcd7eafded4ab484e3b7dfe781bdc92))


### ✏️ Documentation | 文档

* 文档首页logo，左上方logo增加 ([2c1ca02](https://github.com/hewx815/h-uni/commit/2c1ca0255c177aee8f355671b26f27deaf40e3b2))
* 增加 编辑链接功能（帮助我改善此页面） ([8a363df](https://github.com/hewx815/h-uni/commit/8a363dfc65feb47b1904dc22a971a2e1a8914156))


### 🐛 Bug Fixes | Bug 修复

* 关闭了vitepress、for-vue2 开发模式下的局域网以及网络端口 ([28a999f](https://github.com/hewx815/h-uni/commit/28a999f42aa87f2accf0fdacd2b7bf532d5bb69f))
* 删除废弃文件、文件夹，git忽略 .vscode/ ([f3fdc5c](https://github.com/hewx815/h-uni/commit/f3fdc5cf4b552e31ddaa0f9f562c8e098bb9eaf0))
* 新增：文档内预览悬浮窗组件：Preview和PreviewBtn组件 ([928fd95](https://github.com/hewx815/h-uni/commit/928fd953a8b9dafcab2d0dcbd374d877b9b42a62))
* preview 组件 style 报错 ([49b2b79](https://github.com/hewx815/h-uni/commit/49b2b79d0048bc327a2cf8ab91c755ca12f3f911))
* preview组件更换url时iframe尺寸问题 ([41377fa](https://github.com/hewx815/h-uni/commit/41377fa038b22d481672f608b9e8db37cd378392))
* vitepress 配置文件重复键：`outline` 修复 ([00e0f75](https://github.com/hewx815/h-uni/commit/00e0f751c803b4725cd7f5c4058541a02f23c163))

## [1.3.0](https://github.com/hewx815/h-uni/compare/v1.2.11...v1.3.0) (2023-06-13)


### ✨ Features | 新功能

* h-column-tab 组件新增 ([49b9911](https://github.com/hewx815/h-uni/commit/49b9911a4b5c31f31ed10837d0a0d57be7bb8456))

### [1.2.11](https://github.com/hewx815/h-uni/compare/v1.2.10...v1.2.11) (2023-06-12)


### 🐛 Bug Fixes | Bug 修复

* build 脚本 vue2目录修改 bug ([6ba2065](https://github.com/hewx815/h-uni/commit/6ba20658451e092c89a7eda7605843e868196d03))


### 🚀 Chore | 构建/工程依赖/工具

* vitepress 升级 1.0.0-beta.2 ([22be412](https://github.com/hewx815/h-uni/commit/22be412fa8821c3bb2d933750ef922907dc02805))

### [1.2.10](https://github.com/hewx815/h-uni/compare/v1.2.9...v1.2.10) (2023-06-12)


### 🐛 Bug Fixes | Bug 修复

* release 脚本 体验优化，build 脚本 bug 修复 ([8435253](https://github.com/hewx815/h-uni/commit/8435253343c3a46b36e435e42d1c14440813f606))

### [1.2.9](https://github.com/hewx815/h-uni/compare/v1.2.8...v1.2.9) (2023-06-12)


### 👷 Continuous Integration | CI 配置

* 部署与发布流程 脚本封装 ([418b10d](https://github.com/hewx815/h-uni/commit/418b10d81dc0f06caea897845415d824da8152a2))


### 🐛 Bug Fixes | Bug 修复

* hhttp 请求出错时拦截器未能捕获错误 ([2bfaa97](https://github.com/hewx815/h-uni/commit/2bfaa9794868034d978953253c3a1672467fc5f8))
* release 脚本 bug 修复 ([019376f](https://github.com/hewx815/h-uni/commit/019376f92169a2c1c0f4b7b9a455be7bd7ec0ff8))
* release 脚本 bug 修复 2 ([edf8f05](https://github.com/hewx815/h-uni/commit/edf8f05da89add062c15d106811452d21c4f0c63))

### [1.2.8](https://github.com/hewx815/h-uni/compare/v1.2.7...v1.2.8) (2023-06-10)


### 🐛 Bug Fixes | Bug 修复

* 修复 h-uni命令行读取package.json路径错误，首页文档错误更改 ([0d5786c](https://github.com/hewx815/h-uni/commit/0d5786cd9c42270a5084e50dcf0678ea77cced9b))

### [1.2.7](https://github.com/hewx815/h-uni/compare/v1.2.6...v1.2.7) (2023-06-10)


### 👷 Continuous Integration | CI 配置

* git 忽略 cli运行缓存文件cli/storage/index.json ([b3ccdf7](https://github.com/hewx815/h-uni/commit/b3ccdf72083fd05ce1daff9a98a87c0efb622f22))


### 🐛 Bug Fixes | Bug 修复

* 完善 文档主页、版本信息 ([cf8f6f9](https://github.com/hewx815/h-uni/commit/cf8f6f904f634bd21722339262f5f35d06e16dc8))
* 修复 h-uni-build setMode 命令被覆盖bug，完善命令行提示 ([f80bbbf](https://github.com/hewx815/h-uni/commit/f80bbbf22212b6179421c26560c6e773382e50f2))
* git 忽略 cli运行缓存文件cli/storage/index.json 补充 ([61526be](https://github.com/hewx815/h-uni/commit/61526bec16997336da7c483135c1383e784ac853))
* hhttp：baseUrl和url 拼接时，多余斜杠处理 ([b02dade](https://github.com/hewx815/h-uni/commit/b02dadeb3c4e27e2a0de283801689881881e5f2f))


### ✏️ Documentation | 文档

* 文档更新 ([7203aff](https://github.com/hewx815/h-uni/commit/7203aff8a8d1720a3dcc5e290e85f1150095f1a6))

### [1.2.6](https://github.com/hewx815/h-uni/compare/v1.2.5...v1.2.6) (2023-06-05)


### 🐛 Bug Fixes | Bug 修复

* **\:** h-uni-build beforeBuild 对象深度合并修复 ([af9c876](https://github.com/hewx815/h-uni/commit/af9c8767c0e006953dbdb5617ae6bf8c8ec4a9cb))

### [1.2.5](https://github.com/hewx815/h-uni/compare/v1.2.4...v1.2.5) (2023-06-05)


### 🐛 Bug Fixes | Bug 修复

* h-uni-build beforeBuild 对象深度合并修复 ([0403d4a](https://github.com/hewx815/h-uni/commit/0403d4a472c76f14becfbfeaa6444880dc9e8bea))

### [1.2.4](https://github.com/hewx815/h-uni/compare/v1.2.3...v1.2.4) (2023-06-05)


### 🐛 Bug Fixes | Bug 修复

* vue-cli-plugin-h-uni-build bug 修复 ([4da18c2](https://github.com/hewx815/h-uni/commit/4da18c2cd8c133091a71d979deaccca04e6c8807))
* vue-cli-plugin-h-uni-build bug 修复 ([e7add84](https://github.com/hewx815/h-uni/commit/e7add8466ea17878176a7e91de5ae608e515403b))

### [1.2.3](https://github.com/hewx815/h-uni/compare/v1.2.2...v1.2.3) (2023-06-05)


### 🐛 Bug Fixes | Bug 修复

* vue-cli-plugin-h-uni-build bug 修复 ([3d8d935](https://github.com/hewx815/h-uni/commit/3d8d935c478775417678c5ff7d8d94c401247d9d))

### [1.2.2](https://github.com/hewx815/h-uni/compare/v1.2.1...v1.2.2) (2023-06-05)


### 🐛 Bug Fixes | Bug 修复

* h-uni 命令 bug 修复 ([f7febbe](https://github.com/hewx815/h-uni/commit/f7febbe494fc1dc85ff5c3a3a4d3e1f4eae9d3a4))

### [1.2.1](https://github.com/hewx815/h-uni/compare/v1.2.0...v1.2.1) (2023-06-05)

## [1.2.0](https://github.com/hewx815/h-uni/compare/v1.1.9...v1.2.0) (2023-06-05)


### ✨ Features | 新功能

* vue-cli-plugin-h-uni-build 新增 setMode 功能 ([fcf1370](https://github.com/hewx815/h-uni/commit/fcf1370c2daa5f2b496d3a62f867a7c0f079b299))

### [1.1.9](https://github.com/hewx815/h-uni/compare/v1.1.8...v1.1.9) (2023-06-03)


### 🚀 Chore | 构建/工程依赖/工具

* vitepress 升级 1.0.0-beta.1 ([4f6ef8b](https://github.com/hewx815/h-uni/commit/4f6ef8bbc232464132d4babc8bcb915bc332d112))


### ♻️ Code Refactoring | 代码重构

* 项目文档 README 路径调整 ([e804046](https://github.com/hewx815/h-uni/commit/e8040464e09572706f5af8de109e2278eb25244f))
* vue-cli-plugin-h-run-devtools => vue-cli-plugin-h-uni-build ([b902580](https://github.com/hewx815/h-uni/commit/b902580965e8071d87f3a7af867a879db68cb612))

### [1.1.8](https://github.com/hewx815/h-uni/compare/v1.1.7...v1.1.8) (2023-05-03)


### 🐛 Bug Fixes | Bug 修复

* 1.1.7 build ([0547418](https://github.com/hewx815/h-uni/commit/054741837658a936fff594c26183ca6c30add62e))

### [1.1.7](https://github.com/hewx815/h-uni/compare/v1.1.6...v1.1.7) (2023-05-03)


### 👷 Continuous Integration | CI 配置

* 新增：fot-vue2 组件工具安装文档，for-vue2 Hhttp bug 修复 ([7e6dbdf](https://github.com/hewx815/h-uni/commit/7e6dbdf019039cad0f9cd67a25d39f56a1a70f9c))

### [1.1.6](https://github.com/hewx815/h-uni/compare/v1.1.5...v1.1.6) (2023-05-02)


### 🐛 Bug Fixes | Bug 修复

* 命令行 bug 修复 ([6400d4e](https://github.com/hewx815/h-uni/commit/6400d4e3997bf5c3d204d8e6b0a3fefccf1314a1))

### [1.1.5](https://github.com/hewx815/h-uni/compare/v1.1.4...v1.1.5) (2023-05-02)


### 🐛 Bug Fixes | Bug 修复

* 命令行 bug 修复 ([bdfdcbc](https://github.com/hewx815/h-uni/commit/bdfdcbcadb60e43777e30b1eec777e67e26404cc))

### [1.1.4](https://github.com/hewx815/h-uni/compare/v1.1.3...v1.1.4) (2023-05-02)


### ♻️ Code Refactoring | 代码重构

* hhttp for-vue2 代码重构 ([efbda91](https://github.com/hewx815/h-uni/commit/efbda912e625f37166e89abe2ac389a6131f9b06))

### [1.1.3](https://github.com/hewx815/h-uni/compare/v1.1.2...v1.1.3) (2023-04-30)


### 🐛 Bug Fixes | Bug 修复

* eslint 配置 bug 修复 ([999faca](https://github.com/hewx815/h-uni/commit/999facaa9bdebabb414b591f9ef16e32b70d53ac))

### [1.1.2](https://github.com/hewx815/h-uni/compare/v1.1.1...v1.1.2) (2023-04-30)

### 👷 Continuous Integration | CI 配置

* 项目eslint 配置导入，vitepress 升级 74 ([15125a9](https://github.com/hewx815/h-uni/commit/15125a9b04aef156f2beef53a732f3090701ac45))

### [1.1.1](https://github.com/hewx815/h-uni/compare/v1.1.0...v1.1.1) (2023-04-29)


### 🐛 Bug Fixes | Bug 修复

* h-uni 命令行修复 ([33bfcc6](https://github.com/hewx815/h-uni/commit/33bfcc60f07dee3fb8a90eded383dd0de7d2cd68))

## [1.1.0](https://github.com/hewx815/h-uni/compare/v1.0.3...v1.1.0) (2023-04-29)


### ✨ Features | 新功能

* vue-cli-plugin-h-run-devtools 插件新增 ([15573a8](https://github.com/hewx815/h-uni/commit/15573a8109bec1c04c0174011fa9d2acc2cc68bd))

### [1.0.4](https://github.com/hewx815/h-uni/compare/v1.0.3...v1.0.4) (2023-04-27)


### 👷 Continuous Integration | CI 配置

* 调整 调整项目结构 ([54f8c55](https://github.com/hewx815/h-uni/commit/54f8c556602e280dafb9b20858992d5e10b1efab))

### [1.0.3](https://github.com/hewx815/h-uni/compare/v1.0.2...v1.0.3) (2023-04-23)


### 🐛 Bug Fixes | Bug 修复

* .versionrc.js bug 修复 ([5f14d49](https://github.com/hewx815/h-uni/commit/5f14d4938f88dc12618e39730bb6d2ae7bc70c8f))
* 修复 vitepress 打包时 vite寻找vue目录错误的问题 ([d99acf2](https://github.com/hewx815/h-uni/commit/d99acf2b2a482351b44405571da2028d5977568c))
* vitepress 版本错误修复 ([bd99ed6](https://github.com/hewx815/h-uni/commit/bd99ed6fa9c21839a96cdb99ba1c34cec67423ff))

### [1.0.2](https://github.com/hewx815/h-uni/compare/v1.0.1...v1.0.2) (2023-04-23)


### 🚀 Chore | 构建/工程依赖/工具

* dist 目录新增 ([cf6bacf](https://github.com/hewx815/h-uni/commit/cf6bacf9d866f1b92302af77310648aebf7dbd71))

### 1.0.1 (2023-04-23)


### ⚡ Performance Improvements | 性能优化

* 新增yarn.lock文件 ([0711111](https://github.com/hewx815/h-uni/commit/07111115f1d47b40f69f667b2d0cf8d61a73d0bb))
