import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
// import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import { defineConfig } from "rollup";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig([
  // code
  {
    plugins: [
      nodeResolve(),
      typescript(),
      del({ targets: "./dist/*" }),
    ],
    input: "./src/index.ts",
    output: {
      dir: "./dist",
      format: "cjs",
    },
  },

  // type
  {
    plugins: [
      dts(),
      del({ targets: "./types/*" }),
    ],
    input: "./src/index.ts",
    output: {
      file: "./types/index.d.ts",
      format: "es",
    },
  },
]);
