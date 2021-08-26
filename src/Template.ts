/* eslint-disable no-console */
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { Args } from "./prompt/Args";
import { baseDir } from "./utils/utils";

const templatesDir = path.join(baseDir(), "templates");

export function copyFolder(originFolder: string, remoteFolder: string, args: Args) {
  const filesToCopy = fs.readdirSync(originFolder);

  filesToCopy.forEach((file) => {
    const origFilePath = path.join(originFolder, file);
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const writePath = path.join(remoteFolder, file);

      if (false)
        fs.copyFileSync(origFilePath, writePath);
      else
        copyRender(origFilePath, writePath, args);
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(remoteFolder, file));

      const newOriginFolder = path.join(originFolder, file);
      const newRemoteFolder = path.join(remoteFolder, file);

      copyFolder(newOriginFolder, newRemoteFolder, args);
    }
  } );
}

export function copyRender(inputRelative: string, outputRelative: string, args: Args) {
  const inputAbsolute = path.join(templatesDir, inputRelative);
  let contents = fs.readFileSync(inputAbsolute, "utf8");

  contents = ejs.render(contents, args);
  const outputAbsolute = path.join(args.out, outputRelative);

  fs.writeFileSync(outputAbsolute, contents, "utf8");
}
