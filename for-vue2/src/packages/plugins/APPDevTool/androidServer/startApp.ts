import { spawn } from 'child_process';
import { COMMAND_ADB } from './constant.js';

export default function startApp(
  deviceName: string,
  applicationId: string,
  abdPath: string,
) {
  return new Promise((resolve, reject) => {
    const ps = spawn(
      COMMAND_ADB,
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
