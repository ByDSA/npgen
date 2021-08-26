/* eslint-disable no-console */
import chalk from "chalk";
import fs from "fs";
import * as shell from "shelljs";
import simpleGit, { SimpleGitOptions } from "simple-git";
import { createRepo, CreateRepoParams } from "./github/GitHub";
import { npm } from "./package-manager/npm";
import addChangelogGenerator from "./parts/Changelog";
import addDocs from "./parts/Docs";
import installHusky, { huskyAddCommitLint } from "./parts/Husky";
import installJest from "./parts/Jest";
import installEslint from "./parts/Linter";
import addReadmeGenerator from "./parts/Readme";
import { Args } from "./prompt/Args";
import { copyRender } from "./Template";
import { clgDone, sectionTitle } from "./utils/utils";

function getGit() {
  const ooo: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6,
  };
  const git = simpleGit(ooo);

  return git;
}

export default async function postProcess(options: Args) {
  try {
    return await postProcessNode(options);
  } catch (e) {
    console.log(chalk.red(e));

    return false;
  }
}

async function initializeGitproject() {
  sectionTitle("Initializing git project...");

  needs("git");
  await getGit().init();

  if (!fs.existsSync(".git"))
    throw new Error("Failed on initialize Git Project");
}

async function postProcessNode(args: Args) {
  shell.mkdir("-p", args.out);
  shell.cd(args.out);
  const PACKAGE_JSON_INPUT = "dsa/package.json";
  const PACKAGE_JSON_OUTPUT = "package.json";

  copyRender(PACKAGE_JSON_INPUT, PACKAGE_JSON_OUTPUT, args);

  await initializeGitproject();

  await installHusky();
  await huskyAddCommitLint();

  await installEslint();

  await addDocs();
  await addChangelogGenerator();

  await installJest();

  await addReadmeGenerator();

  const opts = {
    name: args.name,
    description: args.description,
    private: args.repoPrivate,
  };

  await installDependencies();

  if (args.repoDo) {
    sectionTitle("Creating Github repo...");
    await createGitRepo(opts);
  }

  return true;
}

function generateReadme() {
  sectionTitle("Generating README.md...");
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

  sectionTitle("Doing first commit and pushing...");
  await firstCommit(url);
  await getGit().push("origin", "main");
}

function installDependencies() {
  sectionTitle("Installing npm dependencies...");
  needs("npm");
  npm.install();
  clgDone();
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
