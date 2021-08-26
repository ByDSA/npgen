import { argv } from "../../utils/utils";

export const ARG_REPO_DO = "repoDo";

export const ARG_REPO_PRIVATE = "repoPrivate";

export const Q_REPO_DO = {
  name: ARG_REPO_DO,
  type: "confirm",
  message: "Upload repo?:",
  when: () => argv()[ARG_REPO_DO] === undefined,
};

export const Q_REPO_PRIVATE = {
  name: ARG_REPO_PRIVATE,
  type: "confirm",
  message: "Private repo?:",
  when: (answers: any) => answers[ARG_REPO_DO] && argv()[ARG_REPO_PRIVATE] === undefined,
};
