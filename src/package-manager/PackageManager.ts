type PackageManager = {
  exec(_: string): PackageManager;
  install(lib?: string): PackageManager;
  installDev(lib?: string): PackageManager;
};

export default PackageManager;
