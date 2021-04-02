"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROJECT_QUESTIONS = exports.PROJECT_DESCRIPTION_QUESTION = exports.PROJECT_NAME_QUESTION = exports.PROJECT_TEMPLATE_QUESTION = exports.ARG_PROJECT_DESCRIPTION = exports.ARG_PROJECT_NAME = exports.ARG_TEMPLATE = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const utils_1 = require("../../utils/utils");
const Prompt_1 = require("../Prompt");
const TEMPLATES_FOLDER = path_1.default.join(utils_1.baseDir(), "templates");
const CHOICES = fs_1.default.readdirSync(TEMPLATES_FOLDER);
exports.ARG_TEMPLATE = "template";
exports.ARG_PROJECT_NAME = "name";
exports.ARG_PROJECT_DESCRIPTION = "description";
exports.PROJECT_TEMPLATE_QUESTION = {
    name: exports.ARG_TEMPLATE,
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES,
};
const REGEX_PROJECT_NAME = /^([A-Za-z\-_\d])+$/;
exports.PROJECT_NAME_QUESTION = {
    name: exports.ARG_PROJECT_NAME,
    type: "input",
    message: "Project name:",
    when: () => !utils_1.argv()[exports.ARG_PROJECT_NAME],
    validate: (input) => {
        if (!REGEX_PROJECT_NAME.test(input))
            return "Project name may only include letters, numbers, underscores and hashes.";
        if (fs_1.default.existsSync(Prompt_1.getTargetPath(input)))
            return `Folder ${input} exists. Delete or use another name.`;
        return true;
    },
};
const REGEX_PROJECT_DESCRIPTION = /^([A-Za-z\-_\d ])+$/;
exports.PROJECT_DESCRIPTION_QUESTION = {
    name: exports.ARG_PROJECT_DESCRIPTION,
    type: "input",
    message: "Project description:",
    when: () => !utils_1.argv()[exports.ARG_PROJECT_DESCRIPTION],
    validate: (input) => {
        if (REGEX_PROJECT_DESCRIPTION.test(input))
            return true;
        return "Project description may only include letters, numbers, underscores, hashes and spaces.";
    },
};
exports.PROJECT_QUESTIONS = [
    exports.PROJECT_TEMPLATE_QUESTION,
    exports.PROJECT_NAME_QUESTION,
    exports.PROJECT_DESCRIPTION_QUESTION,
];
//# sourceMappingURL=ProjectQuestions.js.map