import { PluginAPI, ProjectOptions } from "@vue/cli-service";
import beforeBuild from "./beforeBuild";
import afterBuild from "./afterBuild";

interface Config {
  openDevTools?: boolean;
}

module.exports = function vueCliPluginHUniBuild(api: PluginAPI, options: ProjectOptions) {
  // uni-serve
  const serve = api.service.commands["uni-serve"];
  const serveFn = serve.fn;

  serve.fn = async function newServeFn(...args: unknown[]) {
    await beforeBuild(api, options, args);
    await serveFn(...args);
    await afterBuild(api, options, args);
  };

  // uni-build
  const build = api.service.commands["uni-build"];
  const buildFn = build.fn;

  build.fn = async function newBuildFn(...args: unknown[]) {
    await beforeBuild(api, options, args);
    await buildFn(...args);
    await afterBuild(api, options, args);
  };
};

export function defineConfig(config: Config) {
  return config;
}
