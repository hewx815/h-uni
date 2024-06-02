import { ProjectOptions } from '@vue/cli-service/types/ProjectOptions';
import beforeBuild from './beforeBuild';
import afterBuild from './afterBuild';

interface ApiType extends ProjectOptions {
  service: {
    commands: {
      [command: string]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        fn: (...args: unknown[]) => Promise<any>;
      };
    };
  };
}

module.exports = function vueCliPluginHUniBuild(api: ApiType, options: ProjectOptions) {
  console.error("----------------HUniBuild1111");
  // Uni-serve
  const serve = api.service.commands['uni-serve'],
    serveFn = serve.fn;

  async function newServeFn(...args: unknown[]) {
    await beforeBuild(api, options, args);
    await serveFn(...args);
    await afterBuild(api, options, args);
  }

  serve.fn = (...args) => newServeFn(...args);

  // Uni-build
  const build = api.service.commands['uni-build'];
  buildFn = build.fn;

  newBuildFn = async (...args) => {
    await beforeBuild(api, options, args);
    await buildFn(...args);
    await afterBuild(api, options, args);
  };

  build.fn = (...args) => newBuildFn(...args);
};



type config = () => void;

export default config;
