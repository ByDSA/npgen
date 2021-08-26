import inquirer from "inquirer";
import { PROJECT_QUESTIONS } from "./ProjectQuestions";

export type ProjectAnswers = {
  name: string;
  description: string;
};

export default function projectPrompt(): Promise<ProjectAnswers> {
  const ret = inquirer.prompt(PROJECT_QUESTIONS);

  return <Promise<ProjectAnswers>>ret;
}
