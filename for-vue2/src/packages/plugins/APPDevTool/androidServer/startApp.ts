import { spawn } from 'child_process';

export default function startApp(
  deviceName: string,
  applicationId: string,
  abdPath: string,
) {
  return new Promise((resolve, reject) => {
    const ADB_COMMAND = process.platform === 'win32' ? 'adb' : './adb';

    const ps = spawn(
      ADB_COMMAND,
      ['-s', deviceName, 'shell', 'am', 'start', `${applicationId}/io.dcloud.PandoraEntry`],
      { cwd: abdPath },
    );

    ps.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });

    ps.on('error', (err) => {
      reject(err);
    });
  });
}
