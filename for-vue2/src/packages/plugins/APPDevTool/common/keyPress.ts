/* eslint-disable no-process-exit */
/* eslint-disable no-use-before-define */
import readline from 'readline';

export type KeypressCallBack = (
  str: string,
  key: {
    sequence: string;
    name: string;
    ctrl: boolean;
    meta: boolean;
    shift: boolean;
  }) => void;

const keypressCallBacks: KeypressCallBack[] = [];

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on(
  'keypress',
  hUniAPPDevToolKeyPress,
);

function hUniAPPDevToolKeyPress(str: Parameters<KeypressCallBack>[0], key: Parameters<KeypressCallBack>[1]) {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    keypressCallBacks.forEach((callback) => {
      callback(str, key);
    });
  }
}

/**
 * 添加监听键盘按键监听器
 * @param callback - 回调函数
 * @returns 返回监听器的编号
*/
export function listenKeyPress(callback: KeypressCallBack) {
  keypressCallBacks.push(callback);
  return keypressCallBacks.length - 1;
}

/**
 * 清除监听键盘监听器
*/
export function clearListenKeyPress(number: ReturnType<typeof listenKeyPress>) {
  keypressCallBacks.splice(number, 1);
}

/**
 * 清除所有监听键盘监听器
*/
export function clearAllListenKeyPress() {
  keypressCallBacks.splice(0, keypressCallBacks.length);
}

/**
 * 获取全部监听键盘监听器
*/
export function getAllListenKeyPress() {
  return keypressCallBacks;
}

/**
 * 处理 bug
*/
export function handerBug() {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.pipe(process.stdout);
}
