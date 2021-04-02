/* eslint-disable no-console */
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
import path from "path";
import shell from "shelljs";
import { baseDir } from "../utils/utils";

let token: string|undefined;
let octokit: Octokit|undefined;
const GITHUB_APP_TOKEN_VAR = "GITHUB_APP_TOKEN";

export type CreateRepoParams = { name: string; description?: string; private?: boolean };

export async function createRepo(opts: CreateRepoParams) {
  return (await getOctokit()).repos.createForAuthenticatedUser(opts);
}

export async function fetchUser(username: string) {
  return (await getOctokit()).users.getByUsername( {
    username,
  } );
}

async function fetchToken() {
  const clientId = "ebc29700f97760503537";
  const auth = createOAuthDeviceAuth( {
    clientType: "oauth-app",
    scopes: ["repo"],
    clientId,
    onVerification(verification) {
      console.log("Open %s", verification.verification_uri);
      console.log("Enter code: %s", verification.user_code);
    },
  } );
  const tokenAuthentication = await auth( {
    type: "oauth",
  } );

  return tokenAuthentication.token;
}

async function getOctokit(): Promise<Octokit> {
  if (!octokit) {
    if (!token) {
      token = getTokenFromEnv();

      if (!token) {
        token = await fetchToken();
        saveTokenToEnv();
      }
    }

    octokit = new Octokit( {
      auth: token,
    } );
  }

  return octokit;
}

function getTokenFromEnv(): string|undefined {
  dotenv.config();
  const GITHUB_APP_TOKEN = process.env[GITHUB_APP_TOKEN_VAR];

  return GITHUB_APP_TOKEN;
}

function saveTokenToEnv() {
  console.log("Saving token into .env ...");
  const cmd = `echo ${GITHUB_APP_TOKEN_VAR}=${token} >> ${path.join(baseDir(), ".env")}`;

  console.log(cmd);
  shell.exec(cmd);
}
