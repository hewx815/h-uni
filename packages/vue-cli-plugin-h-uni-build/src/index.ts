import { ProjectOptions } from '@vue/cli-service/types/ProjectOptions';
import { openDevTool } from "@h-uni/h-uni-build";

module.exports = function vueCliPluginHUniBuild(api: ProjectOptions, options) {
  console.log("----------------HUniBuild1111");
  console.log(openDevTool);
  const dd = '1';
};

type config = () => void;

export default config;
