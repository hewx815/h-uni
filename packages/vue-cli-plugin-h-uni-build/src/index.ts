import { PluginAPI, ProjectOptions } from "@vue/cli-service";
import { openDevTool } from "@h-uni/h-uni-build";

export interface Config {
  openDevTools?: boolean;
}

export type BuildFn = (api: PluginAPI, options: ProjectOptions, args: unknown[]) => Promise<void>;

/**
 * vue-cli-plugin-h-uni-build
 * 提供给 vue-cli-service 的插件
 * 在 uni-serve 和 uni-build 之前和之后执行自定义逻辑
*/
export default async function vueCliPluginHUniBuild(api: PluginAPI, options: ProjectOptions) {
  const { beforeBuild } = await import("./beforeBuild.js");
  const { afterBuild } = await import("./afterBuild.js");

  console.log("---------------vue-cli-plugin-h-uni-build");
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
