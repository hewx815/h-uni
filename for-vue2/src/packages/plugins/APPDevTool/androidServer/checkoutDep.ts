import { spawn } from 'child_process';
import path from 'path';
import { err } from '../utils.js';

export default async function checkoutDep() {
  function getJavaVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      const ps = spawn('./java.exe', ['-version'], { cwd: path.resolve(process.env.JAVA_HOME as string, './bin') });

      ps.on('error', (e) => {
        reject(e);
      });

      let oneTimes = true;

      ps.stderr.on('data', (data) => {
        if (oneTimes) {
          oneTimes = false;

          const data1 = String(data).split('\r\n')[0];

          if (data1.indexOf('openjdk version') !== 0 && data1.indexOf('java version') !== 0) {
            reject(new Error());
          } else {
            const version = data1.split(' ')[2].replace(/"/g, '').split('.');

            let versionStr = '';

            if (Number(version[0]) > 10) {
              versionStr = `VERSION_${version[0]}`;
            }

            if (Number(version[0]) > 25) {
              versionStr = 'VERSION_HIGHER';
            }

            versionStr = `VERSION_${version[0]}_${version[1]}`;

            resolve(versionStr);
          }
        }
      });
    });
  }

  function checkoutBuildTool() {

  }

  let javaVersion = '';
  try {
    javaVersion = await getJavaVersion();
  } catch (e) {
    err('获取 java 版本出错', e, 'android');
  }

  return {
    javaVersion,
  };
  // console.log(javaVersion);
  // checkoutBuildTool();
}

// checkoutDep('C:\\Program Files\\Eclipse Adoptium\\jdk-8.0.382.5-hotspot');
