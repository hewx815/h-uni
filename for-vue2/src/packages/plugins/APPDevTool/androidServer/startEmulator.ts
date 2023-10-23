import { spawn } from 'child_process';

export default function startEmulator(
  emulatorPath: string,
  avdName: string,
): Promise<number | null> {
  return new Promise((resolve, reject) => {
    const emulatorPs = spawn('emulator', ['-avd', avdName], { shell: true, cwd: emulatorPath, stdio: 'inherit' });

    emulatorPs.on('error', (err) => {
      reject(err);
    });

    emulatorPs.on('exit', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(code);
      }
    });
  });
}
