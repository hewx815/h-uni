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
      del({ targets: "index.js" }),
      // terser(),
    ],
    input: "./src/index.ts",
    output: {
      file: "./index.js",
      format: "cjs",
    },
  },

  // type
  {
    plugins: [
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
