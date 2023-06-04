/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
const inquirer = require('inquirer8');
const fs = require('fs');
const path = require('path');
const { validPath, mergeObjects } = require('./utils');

module.exports = async (api, options, args) => {
  const { setMode, beforeBuild } = options.pluginOptions['h-uni-build'] ? options.pluginOptions['h-uni-build'] : {};

  // 选择模式
  if (setMode && setMode.length !== 0) {
    const names = setMode.map((item) => item.name);
    const { mode } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mode',
        message: '请选择启动模式',
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
            argss[0]['process.env'] = { ...argss[0]['process.env'], ...userConfig.env };
            return argss;
          });
      });
    }

    // uni 默认 inputDir
    const inputDir = process.env.UNI_INPUT_DIR;

    // manifestJson
    if (userConfig.manifestJson) {
      const manifestJsonPath = path.join(inputDir, 'manifest.json');
      const manifestJson = fs.readFileSync(manifestJsonPath, 'utf-8');

      // TODO:
      // 覆盖manifest.json
      if (typeof userConfig.manifestJson === 'string') {
        const userManifestJsonPath = userConfig.manifestJson;
        const userManifestJson = fs.readFileSync(userManifestJsonPath, 'utf-8');

        fs.writeFileSync(manifestJsonPath, userManifestJson);
      }

      // 修改manifest.json
      if (typeof userConfig.manifestJson === 'object') {
        const userManifest = userConfig.manifestJson;
        const manifest = JSON.parse(manifestJson);
        const userManifestJson = JSON.stringify(mergeObjects(userManifest, manifest));

        fs.writeFileSync(manifestJsonPath, userManifestJson);
      }
    }

    // 设置pagesJson
    if (userConfig.pagesJson) {
      const pagesJsonPath = path.resolve(path.resolve(inputDir, 'pages.json'));
      const pagesJson = fs.readFileSync(pagesJsonPath, 'utf-8');
      // TODO:
      // 覆盖pages.json
      if (typeof userConfig.pagesJson === 'string') {
        const userPagesJsonPath = userConfig.pagesJson;
        const userPagesJson = fs.readFileSync(userPagesJsonPath, 'utf-8');

        fs.writeFileSync(pagesJsonPath, userPagesJson);
      }

      // 修改pagesJson
      if (typeof userConfig.pagesJson === 'object') {
        const userPages = userConfig.pagesJson;
        const pages = JSON.parse(pagesJson);
        const userPagesJson = JSON.stringify(mergeObjects(pages, userPages));

        fs.writeFileSync(pagesJsonPath, userPagesJson);
      }
    }
  }

  // beforeBuild
  if (typeof beforeBuild === 'function') {
    await beforeBuild();
  }
};
