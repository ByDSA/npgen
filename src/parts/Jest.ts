import chalk from "chalk";
import fs from "fs";
import { addDependenciesDev, addScript } from "../package-json/PackageJson";
import { clgDone, sectionTitle } from "../utils/utils";

export default function installJest() {
  sectionTitle("Adding Jest...");

  addDependencies();
  addJestScripts();
  generateJestConfig();
  clgDone();
}

function addDependencies() {
  addDependenciesDev("jest", "@types/jest", "ts-jest");
}

function addJestScripts() {
  addScript("test", "jest");
  addScript("test:watch", "jest --watch");
  addScript("test:coverage", "jest --coverage");
}

function generateJestConfig() {
  const JEST_CONFIG_FILE = "jest.config.js";

  fs.writeFileSync(JEST_CONFIG_FILE, JEST_CONFIG);
  console.log(`Generated ${chalk.blue(JEST_CONFIG_FILE)}`);
}

const JEST_CONFIG = `module.exports = {
  moduleDirectories: ["node_modules", "src"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": require.resolve("babel-jest"),
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["<rootDir>/node_modules/?!(@datune)"],
  globals: {
    "ts-jest": {
      isolatedModules: false,
    },
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
`;
