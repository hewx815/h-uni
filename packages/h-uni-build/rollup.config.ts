import { defineConfig } from "rollup";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from "rollup-plugin-dts";
import del from 'rollup-plugin-delete';

export default defineConfig([
  // .d.ts
  {
    plugins: [
      dts(),
      del({ targets: 'types/*' }),
    ],
    input: "./src/index.ts",
    output: [
      {
        file: "./types/index.d.ts",
        format: "es",
      },
    ]
  },
  // .mjs, .cjs
  {
    plugins: [
      nodeResolve(),
      typescript(),
      del({ targets: 'dist/*' }),
    ],
    input: "./src/index.ts",
    external: ["@h-uni/h-uni-utils"],
    output: [
      {
        file: "./dist/es/index.js",
        format: "es",
      },
      {
        file: "./dist/cjs/index.js",
        format: "cjs",
      },
    ]
  },

]);
