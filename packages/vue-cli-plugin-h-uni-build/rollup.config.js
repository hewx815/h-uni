"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_typescript_1 = require("@rollup/plugin-typescript");
var rollup_plugin_delete_1 = require("rollup-plugin-delete");
// import terser from "@rollup/plugin-terser";
var rollup_plugin_dts_1 = require("rollup-plugin-dts");
var rollup_1 = require("rollup");
var plugin_node_resolve_1 = require("@rollup/plugin-node-resolve");
var plugin_commonjs_1 = require("@rollup/plugin-commonjs");
exports.default = (0, rollup_1.defineConfig)([
    // code
    {
        plugins: [
            (0, plugin_commonjs_1.default)(),
            (0, plugin_node_resolve_1.default)(),
            (0, plugin_typescript_1.default)(),
            (0, rollup_plugin_delete_1.default)({ targets: "index.js" }),
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
            (0, rollup_plugin_dts_1.dts)(),
            (0, rollup_plugin_delete_1.default)({ targets: "./index.d.ts" }),
        ],
        input: "./src/index.ts",
        output: {
            file: "./index.d.ts",
            format: "cjs",
        },
    },
]);
