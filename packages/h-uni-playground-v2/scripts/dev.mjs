import chokidar from 'chokidar';
import { fileURLToPath } from 'url';
import path from 'path';
import { spawn } from 'child_process';

function defineAbsolutePaths(metaUrl, relativePaths) {
  const dirPath = path.dirname(fileURLToPath(metaUrl));
  return path.resolve(dirPath, relativePaths);
}

const watcher = chokidar.watch(defineAbsolutePaths(import.meta.url, '../node_modules/@h-uni/vue-cli-plugin-h-uni-build/dist/'));


let timer = null;
let ps = null;
const delay = 300;

function dev() {
  return spawn('pnpm', ['dev:mp-weixin'], { stdio: 'inherit' });
}

// 监听文件变化, 执行 dev
watcher.on('ready', () => {
  ps = dev();
  watcher.on('all', (event, path) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (ps) ps.kill();
      ps = dev();
    }, delay);
  });
})

