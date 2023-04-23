import path from "path";
import { defineConfig } from "vitepress";
import { fileURLToPath } from "url";

const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  lang: 'zh-CN',
  outDir: path.resolve(CurrentPath, '../dist/doc'),
  srcExclude: ['dist/npm/**/*'],
  title: "h-uni",
  lastUpdated: true,
  // 路径重写
  rewrites: {
    ':for/src/packages/:type/:dd/:dd.md': ':for/:type/:dd.md',
  },
  themeConfig: {
    nav: [
      { text: "主页", link: "/" },
      { text: "开始", link: "/README" },
      { text: "组件", link: "/for-vue2/components/HButton" },
      { text: "工具", link: "/for-vue2/utils/Hhttp" },
      { text: "更新记录", link: "/CHANGELOG" },
      {
        text: "切换文档",
        items: [
          { text: "for-vue2", link: "/for-vue2/components/HButton" },
          { text: "for-vue3", link: "/for-vue3/components/HButton" },
        ],
      },
      {
        text: "网站导航",
        items: [
          { text: "暂无!", link: "/item-1" },
          { text: "暂无!!", link: "/item-2" },
          { text: "暂无!!!", link: "/item-3" },
        ],
      },
    ],
    sidebar: {
      '/for-vue2/': [
        {
          text: "for-vue2",
          items: [
            {
              text: "组件",
              collapsed: false,
              items: [
                { text: '按钮 button', link: '/for-vue2/components/HButton' },
              ]
            },
            {
              text: "工具",
              collapsed: false,
              items: [
                { text: '网络请求 Hhttp', link: '/for-vue2/utils/Hhttp' }
              ]
            },
          ],
        },
      ],
      '/for-vue3/': [
        {
          text: "for-vue3",
          items: [
            {
              text: "组件",
              collapsed: false,
              items: [
                { text: '按钮 HButton', link: '/for-vue3/components/HButton' }
              ]
            },
            {
              text: "工具",
              collapsed: false,
              items: [
                { text: '网络请求 Hhttp', link: '/for-vue3/utils/Hhttp' }
              ]
            },
          ],
        },
      ]
    },
    socialLinks: [{ icon: "github", link: "https://github.com/hewx815/h-uni" }],
  },
});
