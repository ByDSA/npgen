import chalk from "chalk";
import jsonfile from "jsonfile";

const PACKAGE_JSON = "package.json";

export function addScript(name: string, content: string) {
  const json = read();

  json.scripts[name] = content;

  write(json);

  console.log(`Added script ${chalk.blue(name)}.`);
}

export function addDependenciesDev(...names: string[]) {
  const json = read();

  json.devDependencies = json.devDependencies || {
  };

  for (const n of names)
    json.devDependencies[n] = "*";

  write(json);
  console.log(`Added devDependencies ${chalk.blue(names.toString())} to ${PACKAGE_JSON}.`);
}

export function addKey(key: string, obj: any) {
  const json = read();

  json[key] = obj;
  write(json);
  console.log(`Added key ${key} to ${PACKAGE_JSON}`);
}

function write(json: any) {
  jsonfile.writeFileSync(PACKAGE_JSON, json, {
    spaces: 4,
    EOL: "\r\n",
  } );
}

function read() {
  return jsonfile.readFileSync(PACKAGE_JSON);
}
