/* eslint-disable node/no-extraneous-require */
const inquirer = require('inquirer8');
const fs = require('fs');
const path = require('path');
const stripJsonComments = require('strip-json-comments');
const {
  validPath, mergeObjects, delDir, log, error,
} = require('./utils');

module.exports = async (api, options, args) => {
  const { setMode, beforeBuild, delOldFile } = options.pluginOptions['h-uni-build'] ? options.pluginOptions['h-uni-build'] : {};

  // beforeBuild
  if (typeof beforeBuild === 'function') {
    await beforeBuild(api, options, args);
  }

  // delOldFile
  if (delOldFile) {
    const outDir = process.env.UNI_OUTPUT_DIR;
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
    // 选择模式
    const names = setMode.map((item) => item.name);

    // uni-build 输出后
    const bugFix = () => new Promise((resolve) => {
      setTimeout(() => {
        resolve();
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
    if (userConfig.env) {
      api.chainWebpack((config) => {
        config
          .plugin('define')
          .tap((argss) => {
            // eslint-disable-next-line no-param-reassign, node/no-unsupported-features/es-syntax
            argss[0]['process.env'] = { ...argss[0]['process.env'], ...userConfig.env };
            return argss;
          });
      });
    }

    // uni 默认 inputDir
    const inputDir = process.env.UNI_INPUT_DIR;

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
};
