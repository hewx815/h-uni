import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

/**
 * 根据当前文件，定义相对路径的绝对路径
 * @param fileMetaUrl 当前文件模块url
 * @param relativePath 相对路径
 */
export function defineAbsolutePathByCurrent(
  fileMetaUrl: ImportMeta["url"],
  relativePath: string,
) {
  const CurrentPath = dirname(fileURLToPath(fileMetaUrl));
  return resolve(CurrentPath, relativePath);
}
