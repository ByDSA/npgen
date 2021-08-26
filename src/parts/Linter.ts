import { addDependenciesDev, addKey, addScript } from "../package-json/PackageJson";
import { clgDone, sectionTitle } from "../utils/utils";

export default function installEslint() {
  sectionTitle("Adding eslint...");

  addDependencies();
  addScripts();
  addPackageJson();
  clgDone();
}

function addDependencies() {
  addDependenciesDev("@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint",
    "eslint-config-airbnb-base",
    "eslint-import-resolver-typescript",
    "eslint-plugin-import",
    "eslint-plugin-jest lint-staged");
}

function addScripts() {
  addScript("lint:eslint", "eslint ./src/*.ts");
  addScript("lint:fix", "eslint ./src/*.ts --fix");
}

function addPackageJson() {
  addKey("lint-staged", lintStagedPackageJson);
}

const lintStagedPackageJson = {
  "*.{js,json,yml,yaml,css,scss,ts,tsx,md}": [
    "eslint --fix",
  ],
};
