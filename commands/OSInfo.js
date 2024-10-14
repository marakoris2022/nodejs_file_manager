import os from "node:os";
import { logWithColor } from "../utils/utils.js";

export function getEOL(CLIcommand) {
  const command = CLIcommand.split(" ")[1];

  if (!command) throw new Error('Cant read the "os" command');

  if (command === "--EOL") {
    logWithColor.yellow(JSON.stringify(os.EOL));
  } else if (command === "--cpus") {
    const cpus = os.cpus();
    logWithColor.yellow(`Overall amount of CPUS: ${cpus.length}`);
    cpus
      .reduce((acc, curVal) => {
        acc.push(curVal.model);
        return acc;
      }, [])
      .forEach((item) => logWithColor.blue(item));
  } else if (command === "--homedir") {
    logWithColor.yellow(`Home directory: ${JSON.stringify(os.homedir())}`);
  } else if (command === "--username") {
    logWithColor.yellow(
      `Current system user name: "${os.userInfo().username}"`
    );
  } else if (command === "--architecture") {
    const architecture = os.arch();
    logWithColor.yellow(`CPU Architecture: ${architecture}`);
  } else {
    throw new Error('Cant read the "os" command');
  }
}
