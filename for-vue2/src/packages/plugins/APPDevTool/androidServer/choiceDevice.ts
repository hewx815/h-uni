import { spawn } from 'child_process';
import inquirer from 'inquirer8';
import {
  log, err,
} from '../utils.js';
import { listenKeyPress, clearAllListenKeyPress } from '../common/keyPress.js';
import type { KeypressCallBack } from '../common/keyPress.js';
import {
  COMMAND_ADB, LF, CHOICE_DEVICE_HELP_TEXT, DEVICE_TYPES,
} from './constant.js';

export type DeviceOptions = {
  deviceName: string;
  description: string;
  name: string;
  type: 'emulator' | 'usb' | 'unknown';
};

export default async function choiceDevice(abdPath: string) {
  let devicesGetting: boolean = false;

  let device = {} as DeviceOptions;

  // 获取设备列表
  function getDevices(): Promise<Array<DeviceOptions>> {
    return new Promise((resolve, reject) => {
      devicesGetting = true;

      const adbPs = spawn(COMMAND_ADB, ['devices', '-l'], { cwd: abdPath });

      adbPs.on('error', (error) => {
        reject(error);
      });

      adbPs.stdout.on('data', (data) => {
        const devices = String(data)
          .split(LF)

          .filter((item) => item !== '' && item !== 'List of devices attached')

          .map((item) => {
            const deviceInfoList = item.split(' ').filter((itemItem) => itemItem !== '');

            const deviceName = deviceInfoList[0];

            const deviceStr = deviceInfoList[2].slice(0, deviceInfoList[2].indexOf(':'));

            const deviceType = DEVICE_TYPES.find((itemItem) => itemItem.str === deviceStr);

            const name = deviceType ? deviceType.name : '未知设备';

            const description = `${deviceName}(${name})
${deviceInfoList.splice(2, deviceInfoList.length - 2).join(' ')}`;

            const type = deviceType ? deviceType.type : 'unknown';

            return {
              description, name, type, deviceName,
            } as DeviceOptions;
          });

        setTimeout(() => {
          resolve(devices);
          devicesGetting = false;
        }, 1000);
      });
    });
  }

  // 用户选择设备
  function userChoice(
    devices: Array<DeviceOptions>,
  ): Promise<DeviceOptions> {
    return new Promise((resolve, reject) => {
      inquirer.prompt([{
        type: 'list',
        name: 'device',
        message: '[APPDevTool]:请选择设备\n',
        choices: devices.map((item) => item.description),
      }])

        .then(({ device: _device }) => resolve(devices.find((item) => item.description === _device) as DeviceOptions))

        .catch((error) => reject(error));
    });
  }

  // 重新加载设备列表
  function reLoadDevices(
    str: Parameters<KeypressCallBack>[0],
    key: Parameters<KeypressCallBack>[1],
  ) {
    if (key.name === 'r') {
      if (!devicesGetting) {
        // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-floating-promises
        main();
      }
    }
  }

  // 清除 inquirer 键盘 监听器
  function clearInquirerKeyListners() {
    const listeners = process.stdin.listeners('keypress');

    const onKeyPressListeners = listeners.filter((listener) => listener.name === 'onkeypress');

    listeners.forEach((listener) => {
      if (listener.name !== 'onkeypress' && listener.name !== 'hUniAPPDevToolKeyPress') {
        process.stdin.removeListener('keypress', listener as (...args: unknown[]) => void);
      }
    });

    onKeyPressListeners.forEach((listener, index) => {
      if (index !== onKeyPressListeners.length - 1) {
        process.stdin.removeListener('keypress', listener as (...args: unknown[]) => void);
      }
    });
  }

  async function main() {
    // eslint-disable-next-line no-console
    console.clear();
    log(`

  正在搜索设备中...`);

    clearInquirerKeyListners();
    clearAllListenKeyPress();

    listenKeyPress(reLoadDevices);

    let devices: Array<DeviceOptions> = [];

    try {
      devices = await getDevices();
    } catch (error) {
      err('获取ADB设备出错', error, 'android');
    }

    // eslint-disable-next-line no-console
    console.clear();
    if (devices.length === 0) {
      log(`${CHOICE_DEVICE_HELP_TEXT}

  未搜索到任何设备`);
    } else {
      log(`${CHOICE_DEVICE_HELP_TEXT}

  搜索设备成功, 共搜索到 ${devices.length} 个设备`);

      try {
        device = await userChoice(devices);
      } catch (error) {
        err('选择ADB设备出错', error);
      }
    }
  }

  await main();

  while (!device.name) {
    // 选择设备中...
    // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  clearAllListenKeyPress();
  return device;
}
