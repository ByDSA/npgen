/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";

export function baseDir() {
  const mainFileName = require.main?.filename || process.mainModule?.filename;

  if (mainFileName)
    return path.join(path.dirname(mainFileName));

  throw new Error();
}

dotenv.config();

const ARGV = require("yargs/yargs")(process.argv.slice(2))
  .env("ARG")
  .argv;

for (const prop in ARGV) {
  if (ARGV[prop] === "true")
    ARGV[prop] = true;

  if (ARGV[prop] === "false")
    ARGV[prop] = false;

  console.log(`${prop} => ${ARGV[prop]}`);
}

export function argv() {
  return ARGV;
}

export function sectionTitle(str: string) {
  console.log(chalk.yellow(`> ${str}`));
}

export function clgDone() {
  console.log(chalk.green("Done!"));
}
