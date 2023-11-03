import { spawn } from 'child_process';
import { COMMAND_ADB } from './constant.js';

export default function installApk(
  deviceName: string,
  apkPath: string,
  abdPath: string,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const adbPs = spawn(COMMAND_ADB, ['-s', deviceName, 'install', apkPath], { cwd: abdPath });

    adbPs.on('error', (err) => {
      reject(err);
    });

    adbPs.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
