/* eslint-disable promise/always-return */
/* eslint-disable no-console */

import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import fs from 'fs';
import {
  copyDirs,
  delDir,
  checkoutDir,
  renameFilesToKebabCase,
  transformAndWriteFile,
  deleteFiles,
  tsToJs,
  updateVueFiles,
  processFilesInDir,
  // eslint-disable-next-line import/extensions
} from './utils.js';

const log = (message) => {
  console.log(`
[build]:${message}
`);
};

const err = (message) => {
  console.error(`
[build Error]:${message}
`);
};

const startBuild = async (isNpm) => {
  log('开始拷贝库文件...');
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));
  const getPath = (pathd) => path.resolve(CurrentPath, pathd);
  // for-vue2
  const vue2Package = {
    srcDir: getPath('../../for-vue2/src/packages'),
    destDir: getPath('../../dist/for-vue2'),
  };
  checkoutDir(vue2Package.destDir);
  delDir(vue2Package.destDir);
  copyDirs(vue2Package.srcDir, vue2Package.destDir);
  // for-vue3
  const vue3Package = {
    srcDir: getPath('../../for-vue3/src/packages'),
    destDir: getPath('../../dist/for-vue3'),
  };
  checkoutDir(vue3Package.destDir);
  delDir(vue3Package.destDir);
  copyDirs(vue3Package.srcDir, vue3Package.destDir);
  log('库文件拷贝成功 ✔');
  log('开始分离类型文件...');
  spawnSync(
    `yarn vue-tsc --project ${vue2Package.srcDir} --outDir ${vue2Package.destDir}  --declaration --emitDeclarationOnly`,
    { shell: true, stdio: 'inherit' },
  );
  spawnSync(
    `yarn vue-tsc --project ${vue3Package.srcDir} --outDir ${vue3Package.destDir}  --declaration --emitDeclarationOnly`,
    { shell: true, stdio: 'inherit' },
  );
  tsToJs(getPath('../../dist'));
  log('类型文件分离成功 ✔');

  log('开始处理包内部之间的导入路径...');
  // 删除冗余类型文件夹
  const vue2RedundanceDir = path.resolve(vue2Package.destDir, 'for-vue3');
  const vue3RedundanceDir = path.resolve(vue3Package.destDir, 'for-vue2');
  checkoutDir(vue2RedundanceDir);
  checkoutDir(vue3RedundanceDir);
  delDir(vue2RedundanceDir, () => true);
  delDir(vue3RedundanceDir, () => true);
  // 由于路径别名引起的错误的类型文件位置归位
  const vue2DDir = path.resolve(vue2Package.destDir, 'for-vue2/src/packages');
  const vue3DDir = path.resolve(vue3Package.destDir, 'for-vue3/src/packages');
  checkoutDir(vue2DDir);
  checkoutDir(vue3DDir);
  copyDirs(vue2DDir, vue2Package.destDir);
  copyDirs(vue3DDir, vue3Package.destDir);
  delDir(path.resolve(vue2Package.destDir, 'for-vue2'), () => true);
  delDir(path.resolve(vue3Package.destDir, 'for-vue3'), () => true);
  // 处理v2、v3路径别名
  processFilesInDir(vue2Package.destDir, {
    '@3': vue3Package.destDir,
    '@2': vue2Package.destDir,
  });
  processFilesInDir(vue3Package.destDir, {
    '@3': vue3Package.destDir,
    '@2': vue2Package.destDir,
  });
  log('处理包内部之间的导入路径 ✔');

  log('开始生成短横线命名组件文件...');
  // for-vue2
  const vue2Components = {
    srcDir: getPath('../../dist/for-vue2/components'),
    destDir: getPath('../../dist/for-vue2/components+'),
  };
  checkoutDir(vue2Components.destDir);
  delDir(vue2Components.destDir);
  copyDirs(vue2Components.srcDir, vue2Components.destDir);
  deleteFiles(vue2Components.destDir, (file) => {
    const suffix = file.slice(file.indexOf('.'), file.length + 1);
    return file === 'README.md' || suffix === '.d.ts' || suffix === '.vue.d.ts';
  });
  updateVueFiles(vue2Components.destDir, (file) => {
    const fileName = file.slice(0, file.indexOf('.'));
    const srcPath = `../../components/${fileName}/${file}`;
    return `<script>
  import ${fileName} from '${srcPath}'

  export default  ${fileName}
  </script>`;
  });
  renameFilesToKebabCase(vue2Components.destDir);
  transformAndWriteFile(getPath('../../dist/for-vue2/components+/index.js'));
  fs.unlinkSync(getPath('../../dist/for-vue2/tsconfig.json'));
  // for-vue3
  const vue3Components = {
    srcDir: getPath('../../dist/for-vue3/components'),
    destDir: getPath('../../dist/for-vue3/components+'),
  };
  checkoutDir(vue3Components.destDir);
  delDir(vue3Components.destDir);
  copyDirs(vue3Components.srcDir, vue3Components.destDir);
  deleteFiles(vue3Components.destDir, (file) => {
    const suffix = file.slice(file.indexOf('.'), file.length + 1);
    return file === 'README.md' || suffix === '.d.ts' || suffix === '.vue.d.ts';
  });
  updateVueFiles(vue3Components.destDir, (file) => {
    const fileName = file.slice(0, file.indexOf('.'));
    const srcPath = `../../components/${fileName}/${file}`;
    return `<script>
  import ${fileName} from '${srcPath}'

  export default  ${fileName}
  </script>`;
  });
  renameFilesToKebabCase(vue3Components.destDir);
  transformAndWriteFile(getPath('../../dist/for-vue3/components+/index.js'));
  log('生成短横线命名组件文件成功 ✔');
  fs.unlinkSync(getPath('../../dist/for-vue3/tsconfig.json'));

  // 如果是构建npm不执行站点打包服务
  if (!isNpm) {
    log('开始打包文档站点...');
    // 文档官网打包
    // 解决 vitepress vue2包 冲突问题(vitepress新版本似乎已修复,保持运行无影响)
    const vue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue');
    const newVue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue_old');
    if (fs.existsSync(vue2PackagePath)) {
      fs.renameSync(vue2PackagePath, newVue2PackagePath);
    }

    spawnSync('yarn vitepress build', { shell: true, stdio: 'inherit' });

    if (fs.existsSync(newVue2PackagePath)) {
      fs.renameSync(newVue2PackagePath, vue2PackagePath);
    }
    log('文档站点打包成功 ✔');

    log('开始打包vue2组件预览站点...');
    // vue2 示例打包
    const vue2H5 = {
      srcDir: getPath('../../for-vue2/dist/build/h5'),
      destDir: getPath('../../website/preview-vue2'),
    };
    spawnSync('cd for-vue2&&yarn build:h5', { shell: true, stdio: 'inherit' });
    checkoutDir(vue2H5.destDir);
    delDir(vue2H5.destDir);
    copyDirs(vue2H5.srcDir, vue2H5.destDir);
    log('vue2组件预览站点打包成功 ✔');

    log('开始打包vue3组件预览站点...');
    // vue3 示例打包
    const vue3H5 = {
      srcDir: getPath('../../for-vue3/dist/build/h5'),
      destDir: getPath('../../website/preview-vue3'),
    };
    spawnSync('cd for-vue3&&yarn build:h5', { shell: true, stdio: 'inherit' });
    checkoutDir(vue3H5.destDir);
    delDir(vue3H5.destDir);
    copyDirs(vue3H5.srcDir, vue3H5.destDir);
    log('vue3组件预览站点打包成功 ✔');
  }
};

console.clear();
const isNpm = process.argv[2] === '--npm';

let label = '[build]:构建npm包已完成 ✔ , 用时';
console.time(label);

if (isNpm) {
  label = '[build]:构建npm包已完成 ✔ , 用时';
  log('开始构建npm包');

  startBuild(true)
    .then(() => {
      console.timeEnd(label);
    })
    .catch((e) => {
      err(e);
    });
} else {
  label = '[build]:打包已完成 ✔ , 用时';
  console.time(label);
  log('开始打包');

  startBuild(false)
    .then(() => {
      console.timeEnd(label);
    })
    .catch((e) => {
      err(e);
    });

  console.timeEnd(label);
}
