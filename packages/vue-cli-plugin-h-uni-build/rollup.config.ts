import { defineConfig } from "rollup";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';

export default defineConfig([
  {
    plugins: [
      nodeResolve(),
      typescript(),
      del({ targets: 'index.js' }),
    ],
    input: "./src/index.ts",
    output: {
      file: "./index.js",
      format: "cjs",
    }
  },
  {
    plugins: [
      nodeResolve(),
      typescript(),
      dts(),
      del({ targets: "./index.d.ts" }),
    ],
    input: "./src/index.ts",
    output: {
      file: "./index.d.ts",
      format: "cjs",
    },
  },
]);
