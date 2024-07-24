import { PluginAPI, ProjectOptions } from "@vue/cli-service";
import { OpenDevTool } from "@h-uni/h-uni-build";

export async function afterBuild(api: PluginAPI, options: ProjectOptions, args: unknown[]) {
  console.log("----------------afterBuild");
  OpenDevTool.run({
    platform: OpenDevTool.UNIPlatform.MP_WEIXIN,
  });
}
