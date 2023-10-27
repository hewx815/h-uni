import columnify from 'columnify';
import { log } from '../utils.js';

export default function help() {
  const data: Record<string, string> = {
    '--dev': '编译 APP (同时编译 android 和 ios)',
    '--devAndroid': '编译 android',
    '--devIos': '编译 ios',
    '--devPath': '编译指定文件夹的位置(默认为当前目录下"android"、"ios"文件夹)',
    '--configPath': '使用指定的配置文件路径(默认为当前目录下"APPDevTool.config(.js|.cjs|.mjs|.ts|.cts|.mts|.josn)"文件)',
    '--help': '查看帮助',
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const content = columnify(
    Object.keys(data).map((key) => ({
      参数: key,
      描述: data[key],
    })),
    { minWidth: 30 },
  );

  log(`可用参数如下：

${content}
`);

  // eslint-disable-next-line no-process-exit
  process.exit();
}
