"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = exports.baseDir = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
function baseDir() {
    var _a, _b;
    const mainFileName = ((_a = require.main) === null || _a === void 0 ? void 0 : _a.filename) || ((_b = process.mainModule) === null || _b === void 0 ? void 0 : _b.filename);
    if (mainFileName)
        return path_1.default.join(path_1.default.dirname(mainFileName));
    throw new Error();
}
exports.baseDir = baseDir;
dotenv_1.default.config();
const ARGV = require("yargs/yargs")(process.argv.slice(2))
    .env("ARG")
    .argv;
for (const prop in ARGV) {
    if (ARGV[prop] === "true")
        ARGV[prop] = true;
    if (ARGV[prop] === "false")
        ARGV[prop] = false;
    console.log(`${prop} => ${ARGV[prop]}`);
}
function argv() {
    return ARGV;
}
exports.argv = argv;
//# sourceMappingURL=utils.js.map