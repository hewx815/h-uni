import { PluginAPI, ProjectOptions } from "@vue/cli-service";

export async function afterBuild(api: PluginAPI, options: ProjectOptions, args: unknown[]) {
  console.error("----------------afterBuild");
  // OpenDevTool();
}
