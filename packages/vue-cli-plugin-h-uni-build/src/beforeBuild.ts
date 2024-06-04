import { PluginAPI, ProjectOptions } from "@vue/cli-service";

export async function beforeBuild(api: PluginAPI, options: ProjectOptions, args: unknown[]) {
  console.error("----------------beforeBuild");
  // OpenDevTool();
}
