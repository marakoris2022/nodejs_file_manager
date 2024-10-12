import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";
import path from "node:path";
import { getUserName } from "./utils/getUserName.js";
import { logWithColor } from "./utils/logWithColor.js";
import { GLOBAL_CONSTANTS } from "./constants/global.js";
import { upDir } from "./utils/upDir.js";

GLOBAL_CONSTANTS.USER_NAME = getUserName();
GLOBAL_CONSTANTS.CURRENT_PATH = path.resolve(os.homedir());

process.on("exit", () =>
  logWithColor.red(
    `Thank you for using File Manager, ${GLOBAL_CONSTANTS.USER_NAME}, goodbye!`
  )
);

logWithColor.blue(
  `Welcome to the File Manager, ${GLOBAL_CONSTANTS.USER_NAME}!`
);

function reRun(rl) {
  rl.close();
  run();
}

function run() {
  const rl = readline.createInterface({ input, output });
  rl.question(
    `You are currently in ${GLOBAL_CONSTANTS.CURRENT_PATH} `,
    (answer) => {
      if (answer === ".exit") process.exit();

      if (answer === "test") {
        logWithColor.green("This is test!");
        reRun(rl);
        return;
      }

      if (answer === "up") {
        upDir();
        reRun(rl);
        return;
      }

      logWithColor.red("Invalid input");
      reRun(rl);
    }
  );
}

run();
