import chokidar from 'chokidar';
import { log } from '../utils.js';
import { listenKeyPress, handerBug } from '../common/keyPress.js';
import { LISTEN_SERVER_HELP_TEXT, LISTEN_SERVER_DELAY } from './constant.js';

export default function listenServer(
  projectPath: string,
  configPath: string,
  resourceDir: string,
  callback: () => void,
) {
  let timer: NodeJS.Timeout | null = null;

  function change() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
    }, LISTEN_SERVER_DELAY);
  }

  function watchFile() {
    const watcher = chokidar.watch(projectPath);

    watcher.add(configPath);

    watcher.add(resourceDir);

    watcher.on('ready', () => {
      watcher.on('add', change);

      watcher.on('change', change);

      watcher.on('unlink', change);
    });
  }

  function watchKeyPress() {
    handerBug();

    listenKeyPress((name, key) => {
      if (key.name === 'r') {
        setTimeout(() => {
          // eslint-disable-next-line no-console
          console.clear();
        }, 0);
        change();
      }
    });
  }

  watchFile();

  watchKeyPress();

  log(`服务已启用...

  ${LISTEN_SERVER_HELP_TEXT}`);
}
