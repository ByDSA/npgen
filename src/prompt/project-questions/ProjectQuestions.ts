import fs from "fs";
import path from "path";
import { argv, baseDir } from "../../utils/utils";

const TEMPLATES_FOLDER = path.join(baseDir(), "templates");
const CHOICES = fs.readdirSync(TEMPLATES_FOLDER);

export const ARG_TEMPLATE = "template";

export const ARG_PROJECT_NAME = "name";

export const ARG_PROJECT_DESCRIPTION = "description";

export const PROJECT_TEMPLATE_QUESTION = {
  name: ARG_TEMPLATE,
  type: "list",
  message: "What project template would you like to generate?",
  when: () => !argv()[ARG_TEMPLATE],
  choices: CHOICES,
};

const REGEX_PROJECT_NAME = /^([A-Za-z\-_\d])+$/;

export const PROJECT_NAME_QUESTION = {
  name: ARG_PROJECT_NAME,
  type: "input",
  message: "Project name:",
  when: () => !argv()[ARG_PROJECT_NAME],
  validate: (input: string) => {
    if (!REGEX_PROJECT_NAME.test(input))
      return "Project name may only include letters, numbers, underscores and hashes.";

    return true;
  },
};

const REGEX_PROJECT_DESCRIPTION = /^([A-Za-z\-_\d ])+$/;

export const PROJECT_DESCRIPTION_QUESTION = {
  name: ARG_PROJECT_DESCRIPTION,
  type: "input",
  message: "Project description:",
  when: () => !argv()[ARG_PROJECT_DESCRIPTION],
  validate: (input: string) => {
    if (REGEX_PROJECT_DESCRIPTION.test(input))
      return true;

    return "Project description may only include letters, numbers, underscores, hashes and spaces.";
  },
};

export const PROJECT_QUESTIONS = [
  PROJECT_TEMPLATE_QUESTION,
  PROJECT_NAME_QUESTION,
  PROJECT_DESCRIPTION_QUESTION,
];
