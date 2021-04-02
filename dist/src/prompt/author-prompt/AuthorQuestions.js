"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTHOR_URL_QUESTION = exports.ARG_AUTHOR_URL = exports.AUTHOR_NPMJS_QUESTION = exports.ARG_AUTHOR_NPMJS = exports.AUTHOR_GITHUB_QUESTION = exports.ARG_AUTHOR_GITHUB = exports.AUTHOR_EMAIL_QUESTION = exports.ARG_AUTHOR_EMAIL = exports.AUTHOR_NAME_QUESTION = exports.ARG_AUTHOR_NAME = void 0;
const utils_1 = require("../../utils/utils");
exports.ARG_AUTHOR_NAME = "authorName";
exports.AUTHOR_NAME_QUESTION = {
    name: exports.ARG_AUTHOR_NAME,
    type: "input",
    message: "Author name:",
    when: () => !utils_1.argv()[exports.ARG_AUTHOR_NAME],
    validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input))
            return true;
        return "Author name may only include letters, numbers, underscores and hashes.";
    },
};
// eslint-disable-next-line no-control-regex
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
exports.ARG_AUTHOR_EMAIL = "authorEmail";
exports.AUTHOR_EMAIL_QUESTION = {
    name: exports.ARG_AUTHOR_EMAIL,
    type: "input",
    message: "Author Email:",
    when: () => !utils_1.argv()[exports.ARG_AUTHOR_EMAIL],
    validate: (input) => {
        if (emailRegex.test(input))
            return true;
        return "Author name may only include letters, numbers, underscores and hashes.";
    },
};
exports.ARG_AUTHOR_GITHUB = "authorGithub";
exports.AUTHOR_GITHUB_QUESTION = {
    name: exports.ARG_AUTHOR_GITHUB,
    type: "input",
    message: "Author Github:",
    when: () => !utils_1.argv().authorGithub,
    validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input))
            return true;
        return "Author name may only include letters, numbers, underscores and hashes.";
    },
};
exports.ARG_AUTHOR_NPMJS = "authorNpmjs";
exports.AUTHOR_NPMJS_QUESTION = {
    name: exports.ARG_AUTHOR_NPMJS,
    type: "input",
    message: "Author NPMjs:",
    when: () => !utils_1.argv()[exports.ARG_AUTHOR_NPMJS],
    validate: (input) => {
        if (/^([A-Za-z\-_\d])+$/.test(input))
            return true;
        return "Author name may only include letters, numbers, underscores and hashes.";
    },
};
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
exports.ARG_AUTHOR_URL = "authorUrl";
exports.AUTHOR_URL_QUESTION = {
    name: exports.ARG_AUTHOR_URL,
    type: "input",
    message: "Author URL:",
    when: () => !utils_1.argv()[exports.ARG_AUTHOR_URL],
    validate: (input) => {
        if (URL_REGEX.test(input))
            return true;
        return "That's not a valid URL.";
    },
};
//# sourceMappingURL=AuthorQuestions.js.map