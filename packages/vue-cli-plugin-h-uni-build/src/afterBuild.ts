import { PluginAPI, ProjectOptions } from "@vue/cli-service";

export default async function afterBuild(api: PluginAPI, options: ProjectOptions, args: unknown[]) {
  console.error("----------------afterBuild");
  // OpenDevTool();
}
