import {
  choiceDevConfig,
  choiceDevFolder,
  getScriptsList,
  choiceScript,
  runStart,
<<<<<<< HEAD
<<<<<<< HEAD
} from './utils.js';

import { setStorageSync, getStorageSync } from '../storage/index.js';
=======
} from './utils';

import { setStorageSync, getStorageSync } from '../storage/index';
>>>>>>> development
=======
// eslint-disable-next-line import/extensions
} from './utils.js';
// eslint-disable-next-line import/extensions
import { setStorageSync, getStorageSync } from '../storage/index.js';
>>>>>>> development

const lastModeKey = 'USER_LAST_MODE';

const startDev = async () => {
  try {
    let config;

    const configList = ['选择新配置'];

    const lastMode = await getStorageSync(lastModeKey);

    if (lastMode) {
      configList.unshift(`使用上一次的配置:${JSON.stringify(lastMode)}`);
    }

    const configUser = await choiceDevConfig(configList);
    if (configUser === '选择新配置') {
      const devFolder = await choiceDevFolder(['for-vue2', 'for-vue3']);
      const scriptsList = await getScriptsList(devFolder);
      const script = await choiceScript(scriptsList);

      await setStorageSync(lastModeKey, { devFolder, script });
      config = { devFolder, script };
    } else {
      config = lastMode;
    }

    // eslint-disable-next-line no-console
    console.log(`
>当前配置 ${JSON.stringify(config)}
>下次运行可直接使用此配置
`);

    runStart(config.devFolder, config.script);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('cli: error');
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

startDev();
