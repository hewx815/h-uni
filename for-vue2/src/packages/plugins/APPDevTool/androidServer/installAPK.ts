import { spawn } from 'child_process';

export default function installApk(
  deviceName: string,
  apkPath: string,
  abdPath: string,
): Promise<number | null> {
  const ADB_COMMAND = process.platform === 'win32' ? 'adb' : './adb';

  return new Promise((resolve, reject) => {
    const adbPs = spawn(ADB_COMMAND, ['-s', deviceName, 'install', apkPath], { cwd: abdPath });

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
