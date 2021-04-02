import inquirer from "inquirer";
import { AUTHOR_EMAIL_QUESTION, AUTHOR_GITHUB_QUESTION, AUTHOR_NAME_QUESTION, AUTHOR_NPMJS_QUESTION, AUTHOR_URL_QUESTION } from "./AuthorQuestions";

export type AuthorAnswers = {
  authorName: string;
  authorEmail: string;
  authorURL: string;
  authorGithub: string;
  authorNPMjs: string;
};

export default function authorPrompt(): Promise<AuthorAnswers> {
  const questions = [
    AUTHOR_NAME_QUESTION,
    AUTHOR_EMAIL_QUESTION,
    AUTHOR_URL_QUESTION,
    AUTHOR_GITHUB_QUESTION,
    AUTHOR_NPMJS_QUESTION,
  ];

  return <Promise<AuthorAnswers>>inquirer.prompt(questions);
}
