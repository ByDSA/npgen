"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUser = exports.createRepo = void 0;
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const auth_oauth_device_1 = require("@octokit/auth-oauth-device");
const rest_1 = require("@octokit/rest");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const path_1 = tslib_1.__importDefault(require("path"));
const shelljs_1 = tslib_1.__importDefault(require("shelljs"));
const utils_1 = require("../utils/utils");
let token;
let octokit;
const GITHUB_APP_TOKEN_VAR = "GITHUB_APP_TOKEN";
function createRepo(opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (yield getOctokit()).repos.createForAuthenticatedUser(opts);
    });
}
exports.createRepo = createRepo;
function fetchUser(username) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return (yield getOctokit()).users.getByUsername({
            username,
        });
    });
}
exports.fetchUser = fetchUser;
function fetchToken() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const clientId = "ebc29700f97760503537";
        const auth = auth_oauth_device_1.createOAuthDeviceAuth({
            clientType: "oauth-app",
            scopes: ["repo"],
            clientId,
            onVerification(verification) {
                console.log("Open %s", verification.verification_uri);
                console.log("Enter code: %s", verification.user_code);
            },
        });
        const tokenAuthentication = yield auth({
            type: "oauth",
        });
        return tokenAuthentication.token;
    });
}
function getOctokit() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!octokit) {
            if (!token) {
                token = getTokenFromEnv();
                if (!token) {
                    token = yield fetchToken();
                    saveTokenToEnv();
                }
            }
            octokit = new rest_1.Octokit({
                auth: token,
            });
        }
        return octokit;
    });
}
function getTokenFromEnv() {
    dotenv_1.default.config();
    const GITHUB_APP_TOKEN = process.env[GITHUB_APP_TOKEN_VAR];
    return GITHUB_APP_TOKEN;
}
function saveTokenToEnv() {
    console.log("Saving token into .env ...");
    const cmd = `echo ${GITHUB_APP_TOKEN_VAR}=${token} >> ${path_1.default.join(utils_1.baseDir(), ".env")}`;
    console.log(cmd);
    shelljs_1.default.exec(cmd);
}
//# sourceMappingURL=GitHub.js.map