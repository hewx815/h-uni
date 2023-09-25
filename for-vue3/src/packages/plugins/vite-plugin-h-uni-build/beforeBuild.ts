import inquirer from 'inquirer8';
import fs from 'fs';
import path from 'path';
import type { UserConfig, ConfigEnv } from 'vite';
import type { Config } from './defineConfig';
import {
  validPath, mergeObjects, delDir, log, error,
} from './utils';

export default async function (config: Config, viteConfig: UserConfig, env: ConfigEnv) {
  const key = 'VITE_PLUGIN_H_UNI_BUILD_BEFORE';
  process.env[key] = 'runing';

  const { setMode, beforeBuild, delOldFile } = config || {};

  // beforeBuild
  if (typeof beforeBuild === 'function') {
    await beforeBuild(viteConfig, env);
  }
  // delOldFile
  if (delOldFile) {
    const outDir = process.env.UNI_OUTPUT_DIR ? process.env.UNI_OUTPUT_DIR : '';
    if (validPath(outDir)) {
      try {
        delDir(outDir);
        log(`${outDir}下所有旧文件已清空`);
      } catch (e) {
        error('文件删除失败');
        error(e);
      }
    } else {
      log(`首次编译，未发现${outDir}存在旧文件`);
    }
  }

  // setMode
  if (setMode && setMode.length !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stripJsonComments: any = await import('strip-json-comments');

    // 选择模式
    const names = setMode.map((item) => item.name);

    // uni-build 输出后
    const bugFix = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 0);
    });

    await bugFix();

    const { mode } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: '[h-uni-build]:请选择启动模式',
        choices: names,
      },
    ]);

    // 用户配置
    const userConfig = setMode.find((item) => item.name === mode);

    // 设置env
    if (userConfig === undefined) return '';

    if (userConfig.env) {
      const envs: Record<string, string> = {};
      // eslint-disable-next-line no-shadow
      Object.keys(userConfig.env).forEach((key) => {
        if (userConfig.env) {
          envs[`process.env.${key}`] = userConfig.env[key];
        }
      });
      // eslint-disable-next-line no-param-reassign
      viteConfig.define = {
        ...viteConfig.define,
        ...envs,
      };
    }

    // uni 默认 inputDir
    const inputDir = process.env.UNI_INPUT_DIR as string;

    // manifestJson
    if (userConfig.manifestJson) {
      const manifestJsonPath = path.resolve(inputDir, 'manifest.json');
      const manifestDefaultJsonPath = path.resolve(inputDir, 'manifestDefault.json');

      // 备份
      if (!fs.existsSync(manifestDefaultJsonPath)) {
        fs.copyFileSync(manifestJsonPath, manifestDefaultJsonPath);
      }

      const manifestJson = fs.readFileSync(manifestDefaultJsonPath, 'utf-8');

      // 覆盖
      if (typeof userConfig.manifestJson === 'string') {
        const userManifestJsonPath = userConfig.manifestJson;
        const userManifestJson = fs.readFileSync(userManifestJsonPath, 'utf-8');

        fs.writeFileSync(manifestJsonPath, userManifestJson);
      }

      // 修改
      if (typeof userConfig.manifestJson === 'object') {
        const userManifest = userConfig.manifestJson;
        const manifest = JSON.parse(stripJsonComments(manifestJson));
        const userManifestJson = JSON.stringify(mergeObjects(manifest, userManifest));

        fs.writeFileSync(manifestJsonPath, userManifestJson);
      }
    }

    // pagesJson
    if (userConfig.pagesJson) {
      const pagesJsonPath = path.resolve(path.resolve(inputDir, 'pages.json'));
      const pagesDefaultPath = path.resolve(inputDir, 'pagesDefault.json');

      // 备份
      if (!fs.existsSync(pagesDefaultPath)) {
        fs.copyFileSync(pagesJsonPath, pagesDefaultPath);
      }
      const pagesJson = fs.readFileSync(pagesDefaultPath, 'utf-8');

      // 覆盖
      if (typeof userConfig.pagesJson === 'string') {
        const userPagesJsonPath = userConfig.pagesJson;
        const userPagesJson = fs.readFileSync(userPagesJsonPath, 'utf-8');

        fs.writeFileSync(pagesJsonPath, userPagesJson);
      }

      // 修改
      if (typeof userConfig.pagesJson === 'object') {
        const userPages = userConfig.pagesJson;
        const pages = JSON.parse(stripJsonComments(pagesJson));
        const userPagesJson = JSON.stringify(mergeObjects(pages, userPages));

        fs.writeFileSync(pagesJsonPath, userPagesJson);
      }
    }
  }
  return undefined;
}
