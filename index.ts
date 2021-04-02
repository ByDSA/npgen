#!/usr/bin/env node

import { showPrompt } from "./src/prompt/Prompt";

(async function main() {
  await showPrompt();
}());
