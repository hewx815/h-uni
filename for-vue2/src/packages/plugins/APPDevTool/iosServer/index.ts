import type { Argvs } from '../index.js';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function iosServer(argvs: Argvs): Promise<string> {
  return new Promise((resolve) => {
    resolve('iosServer');
  });
}
