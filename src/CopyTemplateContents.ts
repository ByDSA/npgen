/* eslint-disable no-console */
import chalk from "chalk";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import CliOptions from "./CliOptions";

function createFolder(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
    process.exit(1);
  }

  fs.mkdirSync(projectPath);

  return true;
}

function copyContents(originFolder: string, remoteFolder: string, cliOptions: CliOptions) {
  const { config } = cliOptions;
  const filesToCopy = fs.readdirSync(originFolder);

  filesToCopy.forEach((file) => {
    const origFilePath = path.join(originFolder, file);
    const stats = fs.statSync(origFilePath);

    if (config.ignoreFiles && config.ignoreFiles.indexOf(file) > -1)
      return;

    if (stats.isFile()) {
      const writePath = path.join(remoteFolder, file);

      if (config.ignoreFilesEJS && matchArray(origFilePath, config.ignoreFilesEJS))
        fs.copyFileSync(origFilePath, writePath);
      else {
        let contents = fs.readFileSync(origFilePath, "utf8");

        contents = ejs.render(contents, cliOptions.args);

        fs.writeFileSync(writePath, contents, "utf8");
      }
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(remoteFolder, file));

      const newOriginFolder = path.join(originFolder, file);
      const newRemoteFolder = path.join(remoteFolder, file);

      copyContents(newOriginFolder, newRemoteFolder, cliOptions);
    }
  } );
}

function matchArray(str: string, array: string[]): boolean {
  for (const a of array) {
    if (str.match(a))
      return true;
  }

  return false;
}

export default function copyTemplateContent(options: CliOptions) {
  if (!createFolder(options.targetPath))
    return;

  copyContents(options.templatePath, options.targetPath, options);
}
