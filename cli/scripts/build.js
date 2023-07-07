import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import fs from 'fs';
import {
  copyDirs,
  delDir,
  checkoutDir,
  deleteReadmeFiles,
  // eslint-disable-next-line import/extensions
} from './utils.js';

const startBuild = async () => {
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

  const getPath = (pathd) => path.resolve(CurrentPath, pathd);

  // 把packages文件夹拷贝至 dist
  const vue2Package = {
    srcDir: getPath('../../for-vue2/src/packages'),
    destDir: getPath('../../dist/for-vue2'),
  };

  checkoutDir(vue2Package.destDir);
  delDir(vue2Package.destDir);
  copyDirs(vue2Package.srcDir, vue2Package.destDir);

  const vue3Package = {
    srcDir: getPath('../../for-vue3/src/packages'),
    destDir: getPath('../../dist/for-vue3'),
  };

  checkoutDir(vue3Package.destDir);
  delDir(vue3Package.destDir);
  copyDirs(vue3Package.srcDir, vue3Package.destDir);

  // 删除dist目录下所有的 README.md
  deleteReadmeFiles(getPath('../../dist'));

  // 解决 vitepress vue2包 冲突问题(vitepress新版本似乎已修复,保持运行无影响)
  const vue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue');
  const newVue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue_old');
  if (fs.existsSync(vue2PackagePath)) {
    fs.renameSync(vue2PackagePath, newVue2PackagePath);
  }
  // 执行vitepress打包
  spawnSync('yarn vitepress build', { shell: true, stdio: 'inherit' });

  if (fs.existsSync(newVue2PackagePath)) {
    fs.renameSync(newVue2PackagePath, vue2PackagePath);
  }

  // h5预览
  const vue2H5 = {
    srcDir: getPath('../../for-vue2/dist/build/h5'),
    destDir: getPath('../../website/preview-vue2'),
  };
  spawnSync('cd for-vue2&&yarn build:h5', { shell: true, stdio: 'inherit' });
  checkoutDir(vue2H5.destDir);
  delDir(vue2H5.destDir);
  copyDirs(vue2H5.srcDir, vue2H5.destDir);

  // TODO:VUE3的打包处理
};

startBuild();
