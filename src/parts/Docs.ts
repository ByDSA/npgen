/* eslint-disable no-multi-str */
import { addDependenciesDev, addScript } from "../package-json/PackageJson";
import { clgDone, sectionTitle } from "../utils/utils";

export default function addDocs() {
  sectionTitle("Adding docs...");

  addDependencies();
  addScripts();
  clgDone();
}

function addDependencies() {
  addDependenciesDev("typedoc", "typedoc-github-wiki-theme", "typedoc-plugin-markdown");
}

function addScripts() {
  addScript("docs", "npm run docs:clean && typedoc");
  addScript("postdocs", ".scripts/docs-footer.sh");
  addScript("docs:clean", ".scripts/docs-clean.sh");
  addScript("docs:push", ".scripts/docs-push.sh");
  addScript("postrelease", "npm run docs");
  addScript("release:push", "git push && git push --tags && npm run docs:push");
}
