/* eslint-disable no-multi-str */
import fs from "fs";
import path from "path";
import { addDependenciesDev, addScript } from "../package-json/PackageJson";
import { clgDone, sectionTitle } from "../utils/utils";

export default function addReadmeGenerator() {
  sectionTitle("Adding Readme generator...");

  addDependencies();
  addScripts();
  addFiles();
  clgDone();
}

function addDependencies() {
  addDependenciesDev("readme-md-generator");
}

function addScripts() {
  addScript("readme", "npm run readme:clean && npx readme-md-generator -p .readme/template.md -y");
  addScript("readme:clean", "rm -f README.md");
}

function addFiles() {
  fs.mkdirSync(README_FOLDER);
  fs.writeFileSync(path.join(README_FOLDER, OVERVIEW_FILE), OVERVIEW_CONTENT);
  fs.writeFileSync(path.join(README_FOLDER, USAGE_FILE), USAGE_CONTENT);

  const TEMPLATE_CONTENT = fs.readFileSync(`${__dirname}/${TEMPLATE_FILE}`);

  fs.writeFileSync(path.join(README_FOLDER, TEMPLATE_FILE), TEMPLATE_CONTENT);
  console.log("Generated readme files");
}

const README_FOLDER = ".readme";
const OVERVIEW_FILE = "overview.md";
const OVERVIEW_CONTENT = "This is overview content.";
const USAGE_FILE = "usage.md";
const USAGE_CONTENT = "### Method 1\
```js\
console.log(\"Hello world!\");\
```";
const TEMPLATE_FILE = "template.md";
