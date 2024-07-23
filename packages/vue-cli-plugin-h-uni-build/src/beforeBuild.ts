import { PluginAPI, ProjectOptions } from "@vue/cli-service";
import { openDevTool } from "@h-uni/h-uni-build";

export async function beforeBuild(api: PluginAPI, options: ProjectOptions, args: unknown[]) {
  console.error("----------------beforeBuild1");
  openDevTool();
}
