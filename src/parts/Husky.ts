import { npm } from "../package-manager/npm";
import { clgDone, sectionTitle } from "../utils/utils";

export default function installHusky() {
  sectionTitle("Installing husky...");
  npm
    .exec("husky-init")
    .install();
  clgDone();
}

export function huskyAdd(hook: string, cmd: string) {
  npm.exec(`husky add .husky/${hook} '${cmd}'`);
}

export function huskyAddCommitLint() {
  huskyAdd(PRE_COMMIT, "npx --no-install commitlint --edit \"$1\"");
}

export const COMMIT_MSG = "commit-msg";

export const PRE_COMMIT = "pre-commit";
