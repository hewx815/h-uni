import type { InputOptions } from 'rollup';

export default function () {
  return {
    name: 'vite-plugin-h-uni-build',

    buildStart(options: InputOptions): Promise<void> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 5000);
      });
    },

    buildEnd(error: any) {
      console.log('error', error);
    },

  };
}
