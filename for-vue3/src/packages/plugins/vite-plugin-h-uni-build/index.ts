/* eslint-disable node/no-unpublished-import */
import type { UserConfig, ConfigEnv } from 'vite';
import type { Config } from './defineConfig';
import beforeBuild from './beforeBuild';
import afterBuild from './afterBuild';

export { default as defineConfigHUniBuild } from './defineConfig';

export function hUniBuild(config: Config) {
  return {

    name: 'vite-plugin-h-uni-build',

    async config(viteConfig: UserConfig, env: ConfigEnv) {
      const key = 'VITE_PLUGIN_H_UNI_BUILD_BEFORE';
      if (process.env[key] === 'runing') return;

      await beforeBuild(config, viteConfig, env);
    },

    async buildEnd(error: unknown) {
      const key = 'VITE_PLUGIN_H_UNI_BUILD_AFTER';
      if (process.env[key] === 'runing') return;

      await afterBuild(config, error);
    },

  };
}
