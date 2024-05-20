// import { openDevTool } from "@h-uni/h-uni-build";

// export default function vueCliPluginHUniBuild() {
//   console.log(openDevTool);
//   console.log('----------------HUniBuild11');
// }

import { openDevTool } from '@h-uni/h-uni-build';

module.exports = function vueCliPluginHUniBuild(api, options) {
  console.log('----------------HUniBuild1111');
  console.log(openDevTool);
};

type config = () => void;

export default config;
