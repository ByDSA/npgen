import { argv } from "../../utils/utils";

export const ARG_AUTHOR_NAME = "authorName";

export const AUTHOR_NAME_QUESTION = {
  name: ARG_AUTHOR_NAME,
  type: "input",
  message: "Author name:",
  when: () => !argv()[ARG_AUTHOR_NAME],
  validate: (input: string) => {
    if (/^([A-Za-z\-_\d])+$/.test(input))
      return true;

    return "Author name may only include letters, numbers, underscores and hashes.";
  },
};

// eslint-disable-next-line no-control-regex
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const ARG_AUTHOR_EMAIL = "authorEmail";

export const AUTHOR_EMAIL_QUESTION = {
  name: ARG_AUTHOR_EMAIL,
  type: "input",
  message: "Author Email:",
  when: () => !argv()[ARG_AUTHOR_EMAIL],
  validate: (input: string) => {
    if (emailRegex.test(input))
      return true;

    return "Author name may only include letters, numbers, underscores and hashes.";
  },
};

export const ARG_AUTHOR_GITHUB = "authorGithub";

export const AUTHOR_GITHUB_QUESTION = {
  name: ARG_AUTHOR_GITHUB,
  type: "input",
  message: "Author Github:",
  when: () => !argv().authorGithub,
  validate: (input: string) => {
    if (/^([A-Za-z\-_\d])+$/.test(input))
      return true;

    return "Author name may only include letters, numbers, underscores and hashes.";
  },
};

export const ARG_AUTHOR_NPMJS = "authorNpmjs";

export const AUTHOR_NPMJS_QUESTION = {
  name: ARG_AUTHOR_NPMJS,
  type: "input",
  message: "Author NPMjs:",
  when: () => !argv()[ARG_AUTHOR_NPMJS],
  validate: (input: string) => {
    if (/^([A-Za-z\-_\d])+$/.test(input))
      return true;

    return "Author name may only include letters, numbers, underscores and hashes.";
  },
};

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const ARG_AUTHOR_URL = "authorUrl";

export const AUTHOR_URL_QUESTION = {
  name: ARG_AUTHOR_URL,
  type: "input",
  message: "Author URL:",
  when: () => !argv()[ARG_AUTHOR_URL],
  validate: (input: string) => {
    if (URL_REGEX.test(input))
      return true;

    return "That's not a valid URL.";
  },
};
