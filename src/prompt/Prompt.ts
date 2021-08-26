import path from "path";
import finalMessage from "../FinalMessage";
import postProcess from "../PostProcess";
import { argv } from "../utils/utils";
import { Args } from "./Args";
import authorPrompt from "./author-prompt/AuthorPrompt";
import projectPrompt from "./project-questions/ProjectQuestionsPrompt";
import { repoPrompt } from "./repo-questions/RepoQuestionsPrompt";

function getTargetPath(name: string) {
  return argv().out || path.join(process.cwd(), name);
}

async function retrieveAllArgs() {
  const promptArgs = {
    ...await projectPrompt(),
    ...await repoPrompt(),
    ...await authorPrompt(),
  };
  const args: Args = <any> {
    ...argv(),
    out: getTargetPath(promptArgs.name),
    ...promptArgs,
  };

  return args;
}

export default async function showPrompt() {
  const args = await retrieveAllArgs();

  if (await postProcess(args))
    finalMessage(args);
}
