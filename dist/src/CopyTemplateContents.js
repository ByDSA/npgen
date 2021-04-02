"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const ejs_1 = tslib_1.__importDefault(require("ejs"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
function createFolder(projectPath) {
    if (fs_1.default.existsSync(projectPath)) {
        console.log(chalk_1.default.red(`Folder ${projectPath} exists. Delete or use another name.`));
        process.exit(1);
    }
    fs_1.default.mkdirSync(projectPath);
    return true;
}
function copyContents(originFolder, remoteFolder, cliOptions) {
    const { config } = cliOptions;
    const filesToCopy = fs_1.default.readdirSync(originFolder);
    filesToCopy.forEach((file) => {
        const origFilePath = path_1.default.join(originFolder, file);
        const stats = fs_1.default.statSync(origFilePath);
        if (config.ignoreFiles && config.ignoreFiles.indexOf(file) > -1)
            return;
        if (stats.isFile()) {
            const writePath = path_1.default.join(remoteFolder, file);
            if (config.ignoreFilesEJS && matchArray(origFilePath, config.ignoreFilesEJS))
                fs_1.default.copyFileSync(origFilePath, writePath);
            else {
                let contents = fs_1.default.readFileSync(origFilePath, "utf8");
                contents = ejs_1.default.render(contents, cliOptions.args);
                fs_1.default.writeFileSync(writePath, contents, "utf8");
            }
        }
        else if (stats.isDirectory()) {
            fs_1.default.mkdirSync(path_1.default.join(remoteFolder, file));
            const newOriginFolder = path_1.default.join(originFolder, file);
            const newRemoteFolder = path_1.default.join(remoteFolder, file);
            copyContents(newOriginFolder, newRemoteFolder, cliOptions);
        }
    });
}
function matchArray(str, array) {
    for (const a of array) {
        if (str.match(a))
            return true;
    }
    return false;
}
function copyTemplateContent(options) {
    if (!createFolder(options.targetPath))
        return;
    copyContents(options.templatePath, options.targetPath, options);
}
exports.default = copyTemplateContent;
//# sourceMappingURL=CopyTemplateContents.js.map