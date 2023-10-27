/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';
import ts from 'typescript';
import url from 'url';
import stripJsonComments from 'strip-json-comments';
import { err, getSuffixName } from '../utils.js';
import type { Config } from '../config.js';

async function getJsImport(filePath: string): Promise<Config> {
  const fileUrl = url.pathToFileURL(filePath).href; // HACK: https://github.com/nodejs/node/issues/34765

  let config = {};

  try {
    const file = await import(fileUrl) as { default: Config; };
    config = file.default;
  } catch (e) {
    err(`读取${filePath}文件失败`, e);
  }

  return config;
}

async function getTsImport(filePath: string): Promise<Config> {
  const tsConfig = ts.readConfigFile(
    path.resolve(path.dirname(filePath), 'tsconfig.json'),
    (tsFilePath) => fs.readFileSync(tsFilePath, 'utf-8'),
  ) as { config: { compilerOptions: ts.CompilerOptions; }; };

  // 无用户配置文件时，使用默认配置
  if (Object.keys(tsConfig.config).length === 0) {
    tsConfig.config.compilerOptions = ts.getDefaultCompilerOptions();
  }

  if (!tsConfig.config.compilerOptions) err('tsconfig.json 缺少 compilerOptions 配置');

  const compilerOptions = ts.convertCompilerOptionsFromJson(
    tsConfig.config.compilerOptions,
    '.',
  ).options;

  const transpiled = ts.transpileModule(fs.readFileSync(filePath, 'utf-8'), { compilerOptions });

  let suffix = '';
  switch (getSuffixName(filePath)) {
    case 'ts':
      suffix = 'js';
      break;

    case 'mts':
      suffix = 'mjs';
      break;

    case 'cts':
      suffix = 'cjs';
      break;

    default:
      break;
  }

  const tempFilePath = path.resolve(path.dirname(filePath), `APPDevTool_config_temporary_${Date.now()}.${suffix}`);

  fs.writeFileSync(tempFilePath, transpiled.outputText, 'utf-8');

  const fileUrl = url.pathToFileURL(tempFilePath).href; // HACK: https://github.com/nodejs/node/issues/34765

  let config = {};

  try {
    const file = await import(fileUrl) as { default: Config; };
    config = file.default;
    fs.unlinkSync(tempFilePath);
  } catch (e) {
    fs.unlinkSync(tempFilePath);
    err(`读取${filePath}文件失败`, e);
  }

  return config;
}

function getJsonImport(filePath: string): Config {
  let config = {};

  try {
    const jsonStr = fs.readFileSync(filePath, 'utf-8');
    config = JSON.parse(stripJsonComments(jsonStr)) as Config;
  } catch (e) {
    err(`读取${filePath}文件失败`, e);
  }

  return config;
}

async function getDefaultConfig(): Promise<{ config: Config, path: string; }> {
  const configPath = path.resolve(process.cwd(), 'APPDevTool.config');

  // js
  if (fs.existsSync(`${configPath}.js`)) {
    const config = await getJsImport(`${configPath}.js`);
    return { config, path: `${configPath}.js` };
  }

  // mjs
  if (fs.existsSync(`${configPath}.mjs`)) {
    const config = await getJsImport(`${configPath}.mjs`);
    return { config, path: `${configPath}.mjs` };
  }

  // cjs
  if (fs.existsSync(`${configPath}.cjs`)) {
    const config = await getJsImport(`${configPath}.cjs`);
    return { config, path: `${configPath}.cjs` };
  }

  // ts
  if (fs.existsSync(`${configPath}.ts`)) {
    const config = await getTsImport(`${configPath}.ts`);
    return { config, path: `${configPath}.ts` };
  }

  // mts
  if (fs.existsSync(`${configPath}.mts`)) {
    const config = await getTsImport(`${configPath}.mts`);
    return { config, path: `${configPath}.mts` };
  }

  // cts
  if (fs.existsSync(`${configPath}.cts`)) {
    const config = await getTsImport(`${configPath}.cts`);
    return { config, path: `${configPath}.cts` };
  }

  // json
  if (fs.existsSync(`${configPath}.json`)) {
    const config = getJsonImport(`${configPath}.json`);
    return { config, path: `${configPath}.json` };
  }

  return { config: {}, path: '' };
}

/**
 * 获取APPDevTool配置
 * @param userConfigPath 指定配置文件路径
*/
export default async function getConfig(userConfigPath?: string): Promise<{ config: Config, path: string; }> {
  let _config = {};
  let _path = '';

  if (userConfigPath) { // 指定配置文件
    if (!fs.existsSync(userConfigPath)) {
      err(`未找到APPDevTool.config配置文件,在：${userConfigPath}`);
    } else {
      _path = userConfigPath;
    }

    const suffix = getSuffixName(userConfigPath);

    switch (suffix) {
      case 'js':
        _config = await getJsImport(userConfigPath);
        break;

      case 'mjs':
        _config = await getJsImport(userConfigPath);
        break;

      case 'cjs':
        _config = await getJsImport(userConfigPath);
        break;

      case 'ts':
        _config = await getTsImport(userConfigPath);
        break;

      case 'mts':
        _config = await getTsImport(userConfigPath);
        break;

      case 'cts':
        _config = await getTsImport(userConfigPath);
        break;

      case 'json':
        _config = getJsonImport(userConfigPath);
        break;

      default:
        err(`不支持'${suffix}'格式的配置文件`);
    }
  } else {
    const { config: defaultConfig, path: defaultPath } = await getDefaultConfig();
    _config = defaultConfig;
    _path = defaultPath;
  }

  return { config: _config, path: _path };
}
