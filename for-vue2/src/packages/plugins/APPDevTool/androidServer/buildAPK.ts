import { spawn } from 'child_process';
import { COMMAND_GRADLEW } from './constant.js';

export default function buildAPK(
  projectPath: string,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const gradlewPs = spawn(COMMAND_GRADLEW, ['assembleDebug'], { cwd: projectPath, shell: true, stdio: 'inherit' });

    gradlewPs.on('error', (err) => {
      reject(err);
    });

    gradlewPs.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
