/* eslint-disable no-console */
import chalk from "chalk";
import CliOptions from "./CliOptions";

export default function finalMessage(options: CliOptions) {
  console.log("");
  console.log(chalk.green("Done."));
  console.log(chalk.green(`Go into the project: cd ${options.args.name}`));
}
