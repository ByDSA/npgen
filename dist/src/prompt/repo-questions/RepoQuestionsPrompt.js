"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repoPrompt = void 0;
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const RepoQuestions_1 = require("./RepoQuestions");
function repoPrompt() {
    return inquirer_1.default.prompt([RepoQuestions_1.Q_REPO_DO, RepoQuestions_1.Q_REPO_PRIVATE]);
}
exports.repoPrompt = repoPrompt;
//# sourceMappingURL=RepoQuestionsPrompt.js.map