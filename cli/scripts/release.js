/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { spawnSync, execSync } from 'child_process';
import inquirer from 'inquirer';

const log = (message) => {
  console.log(`
[release]:${message}`);
};

// 升级版本号=>打包=>发布=>提交代码=>部署文档
const main = async () => {
  console.clear();

  log(`开始: 升级版本号 => 打包 => 发布 => 上传代码 => 上传标签 => 部署文档

>>>请勿手动退出！！！<<<`);

  const data = execSync('git rev-parse --abbrev-ref HEAD');

  if (String(data).trim() !== 'production') {
    log(`只能在production分支进行升级部署

    当前分支:${String(data)}`);
    log('本次升级已退出,无任何更改');
    return false;
  }

  const { isMerge } = await inquirer.prompt([
    {
      type: 'confirm',
      message: '是否已经`合并`且`提交`本次升级的全部代码',
      name: 'isMerge',
    },
  ]);

  if (!isMerge) {
    log('本次升级已退出,无任何更改');
    return false;
  }

  // 升级版本
  log('开始升级版本号');
  const { isPrerelease } = await inquirer.prompt([
    {
      type: 'confirm',
      message: '是否以测试版发布？',
      name: 'isPrerelease',
    },
  ]);
  const prerelease = isPrerelease ? ' -- --prerelease alpha' : '';
  spawnSync(`yarn standard-version${prerelease}`, { shell: true, stdio: 'inherit' });
  log('升级版本号结束');
  log('CHANGELOG.md 已更新，请前往检查');

  const { isChecked } = await inquirer.prompt([
    {
      type: 'confirm',
      message: '是否已经检查了 CHANGELOG.md (接下来的操作无法撤回！！！)',
      name: 'isChecked',
    },
  ]);

  if (!isChecked) {
    log('本次升级已退出,请参阅以下方法恢复当前更新');
    log(`
    1.恢复 package.json 和 package-lock.json 文件的上一个版本，可以使用以下命令：
    git checkout HEAD~ -- package.json package-lock.json
    这样会将这两个文件恢复到上一个提交状态。

    2.删掉新生成的标签。如果你在执行 standard-version 命令时，使用了 --tag-prefix 参数来指定标签前缀，那么需要将这个前缀一并删除。假设你的标签前缀为 v，则需要使用以下命令：
    git tag -d v1.0.0
    其中 v1.0.0 为新生成的标签名称。

    3.恢复上一个提交状态。如果你希望在撤销 standard-version 的同时，将代码库恢复到上一个提交状态，可以使用以下命令：
    git reset HEAD~1 --hard
    这样会将代码库恢复到上一个提交状态，并删除最后一次提交。

    请注意，这三条命令都是不可逆的操作，请务必在确认无误之后再执行。`);
    return false;
  }

  // 打包
  log('开始构建npm包');
  spawnSync('yarn build', { shell: true, stdio: 'inherit' });
  log('构建npm包结束');

  // 发布
  log('开始发布');
  spawnSync('npm publish', { shell: true, stdio: 'inherit' });
  log('发布结束');

  // 提交代码
  log('开始提交代码');
  spawnSync('git push', { shell: true, stdio: 'inherit' });
  log('提交代码结束');

  // 上传标签
  log('开始上传标签');
  spawnSync('git push --tags', { shell: true, stdio: 'inherit' });
  log('上传标签结束');

  log(`${new Date()}
  本次升级成功，前往以下网址确认
  npm:https://www.npmjs.com/package/h-uni?activeTab=versions
  git:https://github.com/hewx815/h-uni/commits/production
  tags:https://github.com/hewx815/h-uni/tags
  home:https://h-uni.hewxing.cn/CHANGELOG
  `);

  return true;
};

try {
  main();
} catch (err) {
  console.error(`☠ ☠ ☠ ☠ ☠
  ${new Date()}
  升级出错,请查看错误信息手动更正！！！`);
  console.error(err);
}
