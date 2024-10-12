import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import os from "node:os";
import path from "node:path";
import { getUserName } from "./utils/utils.js";
import { logWithColor } from "./utils/utils.js";
import { GLOBAL_CONSTANTS } from "./constants/global.js";
import { upDir, cdDir, lsDir } from "./utils/navigation.js";
import {
  copyFileCP,
  createNewFileAdd,
  readFileCat,
  renameFileRn,
} from "./utils/operations.js";

GLOBAL_CONSTANTS.USER_NAME = getUserName();
GLOBAL_CONSTANTS.CURRENT_PATH = path.resolve(os.homedir());

process.on("exit", () =>
  logWithColor.blue(
    `Thank you for using File Manager, ${GLOBAL_CONSTANTS.USER_NAME}, goodbye!`
  )
);

logWithColor.blue(
  `Welcome to the File Manager, ${GLOBAL_CONSTANTS.USER_NAME}!`
);

const rl = readline.createInterface({ input, output });

async function handleInput(answer) {
  try {
    if (answer === ".exit") process.exit();

    if (answer === "up") {
      upDir();
    } else if (answer.startsWith("cd")) {
      await cdDir(answer);
    } else if (answer === "ls") {
      await lsDir();
    } else if (answer.startsWith("cat")) {
      await readFileCat(answer);
    } else if (answer.startsWith("add")) {
      await createNewFileAdd(answer);
    } else if (answer.startsWith("rn")) {
      await renameFileRn(answer);
    } else if (answer.startsWith("cp")) {
      await copyFileCP(answer);
    } else {
      logWithColor.red("Invalid input");
    }
  } catch (error) {
    console.error("Operation failed");
    logWithColor.gray(`Additional error info: ${error.message}`);
  }
  prompt();
}

function prompt() {
  rl.question(
    `You are currently in ${GLOBAL_CONSTANTS.CURRENT_PATH} `,
    handleInput
  );
}

prompt();
