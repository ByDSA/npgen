import fs from "fs";
import path from "path";
import CliOptions from "../CliOptions";
import copyTemplateContent from "../CopyTemplateContents";
import finalMessage from "../FinalMessage";
import postProcess from "../PostProcess";
import TemplateConfig from "../TemplateConfig";
import { argv, baseDir } from "../utils/utils";
import { Args } from "./Args";
import authorPrompt from "./author-prompt/AuthorPrompt";
import projectPrompt from "./project-questions/ProjectQuestionsPrompt";
import { repoPrompt } from "./repo-questions/RepoQuestionsPrompt";

export function getTargetPath(name: string) {
  return argv().out || path.join(process.cwd(), name);
}

async function retrieveAllArgs() {
  const promptArgs: Args = {
    ...await projectPrompt(),
    ...await repoPrompt(),
    ...await authorPrompt(),
  };
  const args: Args = <any> {
    ...argv(),
    ...promptArgs,
  };

  return args;
}

function generateCliOptions(args: Args): CliOptions {
  const templatePath = path.join(baseDir(), "templates", args.template);
  const targetPath = getTargetPath(args.name);
  const templateConfig = getTemplateConfig(templatePath);

  if (!templateConfig.ignoreFiles)
    templateConfig.ignoreFiles = [];

  templateConfig.ignoreFiles.push(".template.json");

  const options: CliOptions = {
    templatePath,
    targetPath,
    config: templateConfig,
    args,
  };

  return options;
}

export async function showPrompt() {
  const args = await retrieveAllArgs();
  const options = generateCliOptions(args);

  copyTemplateContent(options);

  if (!await postProcess(options))
    return;

  finalMessage(options);
}

function getTemplateConfig(templatePath: string): TemplateConfig {
  const configPath = path.join(templatePath, ".template.json");

  if (!fs.existsSync(configPath)) {
    return {
    };
  }

  const templateConfigContent = fs.readFileSync(configPath);

  if (templateConfigContent)
    return JSON.parse(templateConfigContent.toString());

  return {
  };
}
