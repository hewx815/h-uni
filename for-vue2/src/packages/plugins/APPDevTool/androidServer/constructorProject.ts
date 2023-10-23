import { parseStringPromise, Builder } from 'xml2js';
import {
  readFile, writeFile,
} from 'fs/promises';
import { resolve } from 'path';
import {
  err, checkPathExists, copyDir, deleteFolderContents,
} from '../utils.js';

type ChangeBuildGradleOptions = {
  applicationId: string;
  versionCode: number;
  versionName: string;
  keyAlias: string;
  keyPassword: string;
  storeFile: string;
  storePassword: string;
};

type ConstructorProjectOptions = {
  appID?: string;
  appKey?: string;
  applicationId?: string;
  versionCode?: number;
  versionName?: string;
  signing?: {
    keyAlias: string;
    keyPassword: string;
    storeFile: string;
    storePassword: string;
  };
};

export const DEFAULT_APPLICATION_ID = 'com.android.testa';

export default async function constructorProject(
  projectPath: string,
  resourcePath: string,
  constructorProjectOptions?: ConstructorProjectOptions,
) {
  const DEFAULT_APP_ID = '__UNI__CA5CB1E';

  const DEFAULT_APP_KEY = '537cba7f932e287fd25900de910bc831';

  const DEFAULT_VERSION_CODE = 1;

  const DEFAULT_VERSION_NAME = '1.0';

  const COMMON_TEST_SIGNING = {
    keyAlias: 'android',
    keyPassword: '123456',
    storeFile: 'default.keystore',
    storePassword: '123456',
  };

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
        },
      ),
      changeResource(constructorProjectOptions?.appID || DEFAULT_APP_ID),
      changeDcloudControlXml(constructorProjectOptions?.appID || DEFAULT_APP_ID),
    ]);
  }

  await main();
}
