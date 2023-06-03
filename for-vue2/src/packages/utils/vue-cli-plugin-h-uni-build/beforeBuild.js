/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
// const inquirer = require('inquirer');

module.exports = async (api, options) => {
  const { setMode, beforeBuild } = options.pluginOptions['h-uni-build'] ? options.pluginOptions['h-uni-build'] : {};

  if (beforeBuild) {
    await beforeBuild();
  }

  if (setMode && setMode.length !== 0) {
    console.log('等待更新此功能');
    // const { mode } = await inquirer.prompt([
    //   {
    //     type: 'list',
    //     name: 'mode',
    //     message: '请选择启动模式',
    //     choices: [],
    //   },
    // ]);
  }
};
