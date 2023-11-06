import columnify from 'columnify';
import { log } from '../utils.js';

export default function help() {
  const data: Array<{ name: string, value: string, description: string, }> = [
    {
      name: '--dev',
      value: '无',
      description: '编译 APP (同时编译 android 和 ios)',
    },
    {
      name: '--devAndroid',
      value: '无',
      description: '编译 android',
    },
    {
      name: '--devIos',
      value: '无',
      description: '编译 ios',
    },
    {
      name: '--root',
      value: '项目目录',
      description: '项目的根目录(默认为当前目录)',
    },
    {
      name: '--config',
      value: '配置文件目录',
      description: '使用指定的配置文件路径(默认为 root 目录下"APPDevTool.config(.js|.cjs|.mjs|.ts|.cts|.mts|.josn)"文件)',
    },
    {
      name: '--project',
      value: '目录位置',
      description: '构建项目的位置(默认在 root 目录下 node_modules/.h-uni目录下构建)',
    },
    {
      name: '--help',
      value: '无',
      description: '查看帮助',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const content = columnify(
    data.map((item) => ({
      参数: item.name,
      值: item.value,
      描述: item.description,
    })),
    { minWidth: 20 },
  );

  log(`可用参数如下：

${content}
`);

  // eslint-disable-next-line no-process-exit
  process.exit();
}
