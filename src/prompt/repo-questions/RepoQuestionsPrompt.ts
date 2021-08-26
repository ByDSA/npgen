import inquirer from "inquirer";
import { Q_REPO_DO, Q_REPO_PRIVATE } from "./RepoQuestions";

export type RepoAnswers = {
  repoDo: boolean;
  repoPrivate?: boolean;
};

export function repoPrompt(): Promise<RepoAnswers> {
  return inquirer.prompt([Q_REPO_DO, Q_REPO_PRIVATE]);
}
