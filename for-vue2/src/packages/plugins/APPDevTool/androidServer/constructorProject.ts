import { parseStringPromise, Builder } from 'xml2js';
import {
  readFile, writeFile, readdir, copyFile, mkdir,
} from 'fs/promises';
import { resolve } from 'path';
import {
  err, checkPathExists, copyDir, deleteFolderContents, emptyFolder,
} from '../utils.js';
import {
  JAVA_V,
  COMPILE_SDK_V,
  BUIILD_TOOLS_V,
  DEFAULT_APPLICATION_ID,
  DEFAULT_APP_ID,
  DEFAULT_APP_KEY,
  DEFAULT_VERSION_CODE,
  DEFAULT_VERSION_NAME,
  COMMON_TEST_SIGNING,
  UNI_SDK_NAME_LIST,
} from './constant.js';

type ChangeBuildGradleOptions = {
  versionCode: number;
  compileSdkVersion: number;

  applicationId: string;
  versionName: string;
  keyAlias: string;
  keyPassword: string;
  storeFile: string;
  storePassword: string;
  sourceCompatibility: string;
  targetCompatibility: string;
  buildToolsVersion: string;
};

type ConstructorProjectOptions = {
  appID?: string;
  appKey?: string;
  applicationId?: string;
  versionCode?: number;
  versionName?: string;
  uniSdkPath?: string;
  signing?: {
    keyAlias: string;
    keyPassword: string;
    storeFile: string;
    storePassword: string;
  };
};

export default async function constructorProject(
  projectPath: string,
  resourcePath: string,
  constructorProjectOptions: ConstructorProjectOptions,
) {
  // 配置uniSdk
  async function changeUniSdk(
    uniSdkDir?: string,
  ) {
    if (!uniSdkDir) {
      if (!checkPathExists(resolve(projectPath, '../.uniSdk'))) {
        err(`缺少uniSdk

  uniSdk 下载： https://nativesupport.dcloud.net.cn/AppDocs/download/android.html#
  uniSdk 配置教程： https://h-uni.hewxing.cn/for-vue2/plugins/APPDevTool#uniSdk`, '', 'android');
      } else {
        // eslint-disable-next-line no-param-reassign
        uniSdkDir = resolve(projectPath, '../.uniSdk');
      }
    } else if (!checkPathExists(uniSdkDir)) {
      err(`文件夹：${uniSdkDir} 不存在`, '', 'android');
    }

    const path = resolve(projectPath, './simpleDemo/libs');

    const sdks = await readdir(uniSdkDir as string);

    const deficiencySdks = UNI_SDK_NAME_LIST.filter((item) => !sdks.some((sdkName) => sdkName === item));

    if (deficiencySdks.length !== 0) {
      const N = '\n     ';
      err(`缺少以下 SDK 文件：${`\n${N}${deficiencySdks.join(N)}`}`, '', 'android');
    }

    if (!checkPathExists(path)) {
      await mkdir(path);
    }

    await emptyFolder(path);

    await Promise.all(
      UNI_SDK_NAME_LIST.map((sdkName) => copyFile(resolve(uniSdkDir as string, sdkName), resolve(path, sdkName))),
    );
  }

  // 修改AndroidManifest.xml文件
  async function changeAndroidManifestXml(
    appKey: string,
    applicationId: string,
  ) {
    try {
      const builder = new Builder();

      const path = resolve(projectPath, './simpleDemo/src/main/AndroidManifest.xml');

      const oldPath = resolve(projectPath, './simpleDemo/src/main/AndroidManifest_old.xml');

      let xmlStr = await readFile(path, 'utf-8');

      // 上一次 writeFile 中途退出出错，会导致文件内容为空
      if (xmlStr.length === 0 && checkPathExists(oldPath)) {
        xmlStr = await readFile(oldPath, 'utf-8');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const xmlObj = await parseStringPromise(xmlStr);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      xmlObj.manifest.application[0]['meta-data'][0].$['android:value'] = appKey;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      xmlObj.manifest.$.package = applicationId;
      const newXmlStr = builder.buildObject(xmlObj);

      await Promise.all([
        writeFile(oldPath, newXmlStr),
        writeFile(path, newXmlStr),
      ]);
    } catch (e) {
      err('修改AndroidManifest.xml文件出错', e, 'android');
    }
  }

  // 修改build.gradle文件
  async function changeBuildGradle(
    changeBuildGradleOptions: ChangeBuildGradleOptions,
  ) {
    try {
      const path = resolve(projectPath, './simpleDemo/build.gradle');
      const oldPath = resolve(projectPath, './simpleDemo/build_old.gradle');

      let gradleStr = await readFile(path, 'utf-8');

      if (gradleStr.length === 0 && checkPathExists(oldPath)) {
        gradleStr = await readFile(oldPath, 'utf-8');
      }

      const getText = (key: keyof ChangeBuildGradleOptions) => {
        if (key === 'storeFile') {
          const storeFile = resolve(projectPath, changeBuildGradleOptions[key]);
          if (checkPathExists(storeFile)) {
            return `file("${storeFile.replace(/\\/g, '/')}")`;
          }
          err(`签名文件：${storeFile}不存在`, '', 'android');
          return '';
        }

        if (key === 'targetCompatibility' || key === 'sourceCompatibility') {
          return `${changeBuildGradleOptions[key]}`;
        }

        if (typeof changeBuildGradleOptions[key] === 'string') {
          return `"${changeBuildGradleOptions[key]}"`;
        }

        if (typeof changeBuildGradleOptions[key] === 'number') {
          return `${changeBuildGradleOptions[key]}`;
        }

        err(`signing.${key}类型错误`, 'changeBuildGradle');
        return '';
      };

      Object.keys(changeBuildGradleOptions).forEach((key) => {
        gradleStr = gradleStr.replace(
          new RegExp(`${key}\\s+([^\\n]+)`, 'g'),
          `${key} ${getText(key as keyof ChangeBuildGradleOptions)}`,
        );
      });

      await Promise.all([
        writeFile(oldPath, gradleStr),
        writeFile(path, gradleStr),
      ]);
    } catch (e) {
      err('修改build.gradle文件出错', e, 'android');
    }
  }

  // 修改app资源文件
  async function changeResource(
    appID: string,
  ) {
    try {
      const path = resolve(projectPath, `./simpleDemo/src/main/assets/apps/${appID}/www`);

      if (checkPathExists(path)) {
        await deleteFolderContents(path);
      }

      copyDir(resourcePath, path);
    } catch (e) {
      err('修改app资源文件出错', e, 'android');
    }
  }

  // 修改dcloud_control.xml文件
  async function changeDcloudControlXml(
    appID: string,
  ) {
    try {
      const path = resolve(projectPath, './simpleDemo/src/main/assets/data/dcloud_control.xml');
      const oldPath = resolve(projectPath, './simpleDemo/src/main/assets/data/dcloud_control_old.xml');

      let oldXmlStr = await readFile(path, 'utf-8');

      if (oldXmlStr.length === 0 && checkPathExists(oldPath)) {
        oldXmlStr = await readFile(oldPath, 'utf-8');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const xmlObj = await parseStringPromise(oldXmlStr);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      xmlObj.hbuilder.apps[0].app[0].$.appid = appID;

      const builder = new Builder();

      const xmlStr = builder.buildObject(xmlObj);

      await Promise.all([
        writeFile(oldPath, xmlStr),
        writeFile(path, xmlStr),
      ]);
    } catch (e) {
      err('修改dcloud_control.xml文件出错', e, 'android');
    }
  }
  async function main() {
    await Promise.all([
      changeAndroidManifestXml(
        constructorProjectOptions?.appKey || DEFAULT_APP_KEY,
        constructorProjectOptions?.appKey || DEFAULT_APPLICATION_ID,
      ),
      changeBuildGradle(
        {
          applicationId: constructorProjectOptions?.appKey || DEFAULT_APPLICATION_ID,
          versionCode: constructorProjectOptions?.versionCode || DEFAULT_VERSION_CODE,
          versionName: constructorProjectOptions?.versionName || DEFAULT_VERSION_NAME,
          keyAlias: constructorProjectOptions?.signing ? constructorProjectOptions.signing.keyAlias : COMMON_TEST_SIGNING.keyAlias,
          keyPassword: constructorProjectOptions?.signing ? constructorProjectOptions.signing.keyPassword : COMMON_TEST_SIGNING.keyPassword,
          storeFile: constructorProjectOptions?.signing ? constructorProjectOptions.signing.storeFile : COMMON_TEST_SIGNING.storeFile,
          storePassword: constructorProjectOptions?.signing ? constructorProjectOptions.signing.storePassword : COMMON_TEST_SIGNING.storePassword,
          sourceCompatibility: JAVA_V,
          targetCompatibility: JAVA_V,
          compileSdkVersion: COMPILE_SDK_V,
          buildToolsVersion: BUIILD_TOOLS_V,
        },
      ),
      changeResource(constructorProjectOptions?.appID || DEFAULT_APP_ID),
      changeDcloudControlXml(constructorProjectOptions?.appID || DEFAULT_APP_ID),
      changeUniSdk(constructorProjectOptions?.uniSdkPath),
    ]);
  }

  await main();
}
