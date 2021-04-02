"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const shell = tslib_1.__importStar(require("shelljs"));
const simple_git_1 = tslib_1.__importDefault(require("simple-git"));
const GitHub_1 = require("./github/GitHub");
function getGit() {
    const ooo = {
        baseDir: process.cwd(),
        binary: "git",
        maxConcurrentProcesses: 6,
    };
    const git = simple_git_1.default(ooo);
    return git;
}
function postProcess(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            return yield postProcessNode(options);
        }
        catch (e) {
            console.log(chalk_1.default.red(e));
            return false;
        }
    });
}
exports.default = postProcess;
function title(str) {
    console.log(chalk_1.default.yellow(str));
}
function initializeGitproject() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        title("Initializing git project...");
        needs("git");
        yield getGit().init();
        if (!fs_1.default.existsSync(".git"))
            throw new Error("Failed on initialize Git Project");
    });
}
function postProcessNode(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        shell.cd(options.targetPath);
        yield initializeGitproject();
        yield installDependencies();
        const opts = {
            name: options.args.name,
            description: options.args.description,
            private: options.args.repoPrivate,
        };
        if (options.args.repoDo) {
            title("Creating Github repo...");
            yield createGitRepo(opts);
        }
        return true;
    });
}
function generateReadme() {
    title("Generating README.md...");
    exec("npm run readme");
}
function firstCommit(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield generateReadme();
        yield getGit().add(".");
        yield commit("chore: first commit");
        yield getGit().branch({
            M: "main",
        });
        yield getGit().addRemote("origin", url);
    });
}
function commit(msg) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield getGit().commit(msg);
    });
}
function createGitRepo(options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const res = yield GitHub_1.createRepo(options);
        const url = res.data.clone_url;
        title("Doing first commit and pushing...");
        yield firstCommit(url);
        yield getGit().push("origin", "main");
    });
}
function installDependencies() {
    title("Installing npm dependencies...");
    needs("npm");
    exec("npm i");
}
function needs(file) {
    if (!shell.which(file))
        throw new Error(`No ${file} found`);
}
function exec(cmd) {
    const result = shell.exec(cmd);
    if (result.code !== 0)
        throw new Error(`Error executing ${cmd}`);
}
//# sourceMappingURL=PostProcess.js.map