/* eslint-disable no-console */
import chalk from "chalk";
import fs from "fs";
import * as shell from "shelljs";
import simpleGit, { SimpleGitOptions } from "simple-git";
import CliOptions from "./CliOptions";
import { createRepo, CreateRepoParams } from "./github/GitHub";

function getGit() {
  const ooo: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6,
  };
  const git = simpleGit(ooo);

  return git;
}

export default async function postProcess(options: CliOptions) {
  try {
    return await postProcessNode(options);
  } catch (e) {
    console.log(chalk.red(e));

    return false;
  }
}

function title(str: string) {
  console.log(chalk.yellow(str));
}

async function initializeGitproject() {
  title("Initializing git project...");

  needs("git");
  await getGit().init();

  if (!fs.existsSync(".git"))
    throw new Error("Failed on initialize Git Project");
}

async function postProcessNode(options: CliOptions) {
  shell.cd(options.targetPath);

  await initializeGitproject();

  await installDependencies();

  const opts = {
    name: options.args.name,
    description: options.args.description,
    private: options.args.repoPrivate,
  };

  if (options.args.repoDo) {
    title("Creating Github repo...");
    await createGitRepo(opts);
  }

  return true;
}

function generateReadme() {
  title("Generating README.md...");
  exec("npm run readme");
}

async function firstCommit(url: string) {
  await generateReadme();
  await getGit().add(".");
  await commit("chore: first commit");
  await getGit().branch( {
    M: "main",
  } );
  await getGit().addRemote("origin", url);
}

async function commit(msg: string) {
  await getGit().commit(msg);
}

async function createGitRepo(options: CreateRepoParams) {
  const res = await createRepo(options);
  const url = res.data.clone_url;

  title("Doing first commit and pushing...");
  await firstCommit(url);
  await getGit().push("origin", "main");
}

function installDependencies() {
  title("Installing npm dependencies...");
  needs("npm");
  exec("npm i");
}

function needs(file: string) {
  if (!shell.which(file))
    throw new Error(`No ${file} found`);
}

function exec(cmd: string) {
  const result = shell.exec(cmd);

  if (result.code !== 0)
    throw new Error(`Error executing ${cmd}`);
}
