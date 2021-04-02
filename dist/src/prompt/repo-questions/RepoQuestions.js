"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Q_REPO_PRIVATE = exports.Q_REPO_DO = exports.ARG_REPO_PRIVATE = exports.ARG_REPO_DO = void 0;
const utils_1 = require("../../utils/utils");
exports.ARG_REPO_DO = "repoDo";
exports.ARG_REPO_PRIVATE = "repoPrivate";
exports.Q_REPO_DO = {
    name: exports.ARG_REPO_DO,
    type: "confirm",
    message: "Upload repo?:",
    when: () => utils_1.argv()[exports.ARG_REPO_DO] === undefined,
};
exports.Q_REPO_PRIVATE = {
    name: exports.ARG_REPO_PRIVATE,
    type: "confirm",
    message: "Private repo?:",
    when: (answers) => answers[exports.ARG_REPO_DO] && utils_1.argv()[exports.ARG_REPO_PRIVATE] === undefined,
};
//# sourceMappingURL=RepoQuestions.js.map