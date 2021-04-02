"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inquirer_1 = tslib_1.__importDefault(require("inquirer"));
const AuthorQuestions_1 = require("./AuthorQuestions");
function authorPrompt() {
    const questions = [
        AuthorQuestions_1.AUTHOR_NAME_QUESTION,
        AuthorQuestions_1.AUTHOR_EMAIL_QUESTION,
        AuthorQuestions_1.AUTHOR_URL_QUESTION,
        AuthorQuestions_1.AUTHOR_GITHUB_QUESTION,
        AuthorQuestions_1.AUTHOR_NPMJS_QUESTION,
    ];
    return inquirer_1.default.prompt(questions);
}
exports.default = authorPrompt;
//# sourceMappingURL=AuthorPrompt.js.map