import { spawn } from 'child_process';

const COMMAND = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

export default function buildAPK(
  projectPath: string,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const gradlewPs = spawn(COMMAND, ['assembleDebug'], { cwd: projectPath, shell: true, stdio: 'inherit' });

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
