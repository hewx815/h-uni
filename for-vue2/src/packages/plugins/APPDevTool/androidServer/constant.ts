export const JAVA_V: string = 'JavaVersion.VERSION_1_8';

export const COMPILE_SDK_V: number = 30;

export const BUIILD_TOOLS_V: string = '30.0.3';

export const DEFAULT_APP_ID: string = '__UNI__CA5CB1E';

export const DEFAULT_APP_KEY: string = '537cba7f932e287fd25900de910bc831';

export const DEFAULT_VERSION_CODE: number = 1;

export const DEFAULT_VERSION_NAME: string = '1.0';

export const DEFAULT_APPLICATION_ID: string = 'com.android.testa';

export const COMMAND_SDKMANAGER: string = process.platform === 'win32' ? 'sdkmanager.bat' : './sdkmanager';

export const COMMAND_GRADLEW: string = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

export const COMMAND_ADB: string = process.platform === 'win32' ? 'adb' : './adb';

export const LF: string = process.platform === 'win32' ? '\r\n' : '\n';

export const CHOICE_DEVICE_HELP_TEXT: string = '使用 R 键刷新';

export const LISTEN_SERVER_HELP_TEXT: string = `
  - 修改文件自动刷新
  - 按下 R 键手动刷新
`;
export const LISTEN_SERVER_DELAY: number = 200;

export const COMMON_TEST_SIGNING: {
  keyAlias: string;
  keyPassword: string;
  storeFile: string;
  storePassword: string;
} = {
  keyAlias: 'android',
  keyPassword: '123456',
  storeFile: 'default.keystore',
  storePassword: '123456',
};

export const UNI_SDK_NAME_LIST: Array<string> = [
  'uniapp-v8-release.aar',
  'oaid_sdk_1.0.25.aar',
  'lib.5plus.base-release.aar',
  'breakpad-build-release.aar',
  'android-gif-drawable-release@1.2.23.aar',
];

export const DEVICE_TYPES: Array<{ name: string, str: string, type: string; }> = [
  {
    name: '模拟器设备',
    str: 'product',
    type: 'emulator',
  },
  {
    name: 'USB设备',
    str: 'product',
    type: 'usb',
  },
];
