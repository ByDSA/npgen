"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const chalk_1 = tslib_1.__importDefault(require("chalk"));
function finalMessage(options) {
    console.log("");
    console.log(chalk_1.default.green("Done."));
    console.log(chalk_1.default.green(`Go into the project: cd ${options.args.name}`));
}
exports.default = finalMessage;
//# sourceMappingURL=FinalMessage.js.map