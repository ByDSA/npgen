"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPrompt = exports.getTargetPath = void 0;
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const CopyTemplateContents_1 = tslib_1.__importDefault(require("../CopyTemplateContents"));
const FinalMessage_1 = tslib_1.__importDefault(require("../FinalMessage"));
const PostProcess_1 = tslib_1.__importDefault(require("../PostProcess"));
const utils_1 = require("../utils/utils");
const AuthorPrompt_1 = tslib_1.__importDefault(require("./author-prompt/AuthorPrompt"));
const ProjectQuestionsPrompt_1 = tslib_1.__importDefault(require("./project-questions/ProjectQuestionsPrompt"));
const RepoQuestionsPrompt_1 = require("./repo-questions/RepoQuestionsPrompt");
function getTargetPath(name) {
    return utils_1.argv().out || path_1.default.join(process.cwd(), name);
}
exports.getTargetPath = getTargetPath;
function retrieveAllArgs() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const promptArgs = Object.assign(Object.assign(Object.assign({}, yield ProjectQuestionsPrompt_1.default()), yield RepoQuestionsPrompt_1.repoPrompt()), yield AuthorPrompt_1.default());
        const args = Object.assign(Object.assign({}, utils_1.argv()), promptArgs);
        return args;
    });
}
function generateCliOptions(args) {
    const templatePath = path_1.default.join(utils_1.baseDir(), "templates", args.template);
    const targetPath = getTargetPath(args.name);
    const templateConfig = getTemplateConfig(templatePath);
    if (!templateConfig.ignoreFiles)
        templateConfig.ignoreFiles = [];
    templateConfig.ignoreFiles.push(".template.json");
    const options = {
        templatePath,
        targetPath,
        config: templateConfig,
        args,
    };
    return options;
}
function showPrompt() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const args = yield retrieveAllArgs();
        const options = generateCliOptions(args);
        CopyTemplateContents_1.default(options);
        if (!(yield PostProcess_1.default(options)))
            return;
        FinalMessage_1.default(options);
    });
}
exports.showPrompt = showPrompt;
function getTemplateConfig(templatePath) {
    const configPath = path_1.default.join(templatePath, ".template.json");
    if (!fs_1.default.existsSync(configPath)) {
        return {};
    }
    const templateConfigContent = fs_1.default.readFileSync(configPath);
    if (templateConfigContent)
        return JSON.parse(templateConfigContent.toString());
    return {};
}
//# sourceMappingURL=Prompt.js.map