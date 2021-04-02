"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const ProjectQuestions_1 = require("./ProjectQuestions");
function projectPrompt() {
    const ret = inquirer_1.default.prompt(ProjectQuestions_1.PROJECT_QUESTIONS);
    return ret;
}
exports.default = projectPrompt;
//# sourceMappingURL=ProjectQuestionsPrompt.js.map