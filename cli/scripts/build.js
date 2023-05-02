import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import fs from 'fs';
import {
  copyPackages,
  delDir,
  checkoutDir,
// eslint-disable-next-line import/extensions
} from './utils.js';

const startBuild = async () => {
  const CurrentPath = path.dirname(fileURLToPath(import.meta.url));

  const getPath = (pathd) => path.resolve(CurrentPath, pathd);

  const vue2Package = {
    srcDir: getPath('../../for-vue2/src/packages'),
    destDir: getPath('../../dist/for-vue2'),
  };

  const vue3Package = {
    srcDir: getPath('../../for-vue3/src/packages'),
    destDir: getPath('../../dist/for-vue3'),
  };

  checkoutDir(vue2Package.destDir);
  checkoutDir(vue3Package.destDir);

  delDir(vue2Package.destDir);
  delDir(vue3Package.destDir);

  copyPackages(vue2Package.srcDir, vue2Package.destDir);
  copyPackages(vue3Package.srcDir, vue3Package.destDir);

  const vue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue');
  const newVue2PackagePath = path.resolve(CurrentPath, '../../for-vue2/node_modules/vue_old');
  if (fs.existsSync(vue2PackagePath)) {
    fs.renameSync(vue2PackagePath, newVue2PackagePath);
  }

  spawn('yarn vitepress build', { shell: true, stdio: 'inherit' });

  fs.renameSync(newVue2PackagePath, newVue2PackagePath);
};

startBuild();
