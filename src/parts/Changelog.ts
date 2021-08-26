/* eslint-disable no-multi-str */
import { addDependenciesDev, addScript } from "../package-json/PackageJson";
import { clgDone, sectionTitle } from "../utils/utils";

export default function addChangelogGenerator() {
  sectionTitle("Adding Changelog generator...");

  addDependencies();
  addScripts();
  clgDone();
}

function addDependencies() {
  addDependenciesDev("standard-version");
}

function addScripts() {
  addScript("release", "standard-version");
}
