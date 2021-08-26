/* eslint-disable no-console */
import chalk from "chalk";
import { Args } from "./prompt/Args";

export default function finalMessage(args: Args) {
  console.log("");
  console.log(chalk.green("Done."));
  console.log(chalk.green(`Go into the project: cd ${args.name}`));
}
