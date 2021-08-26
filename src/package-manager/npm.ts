/* eslint-disable import/prefer-default-export */
import shell from "shelljs";
import PackageManager from "./PackageManager";

export const npm: PackageManager = {
  exec: (str: string): PackageManager => {
    shell.exec(`npx ${str}`, {
      silent: true,
    } );

    return npm;
  },
  install: (lib?: string): PackageManager => {
    shell.exec(`npm i ${lib}`, {
      silent: true,
    } );

    return npm;
  },
  installDev: (lib?: string): PackageManager => {
    shell.exec(`npm i -D ${lib}`, {
      silent: true,
    } );

    return npm;
  },
};
