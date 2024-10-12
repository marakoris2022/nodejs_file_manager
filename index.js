import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { getUserName } from "./utils/getUserName.js";
import { logWithColor } from "./utils/logWithColor.js";

const userName = getUserName();
const currentPath = import.meta.dirname;

process.on("exit", () =>
  logWithColor.red(`Thank you for using File Manager, ${userName}, goodbye!`)
);

logWithColor.blue(`Welcome to the File Manager, ${userName}!`);

function reRun(rl) {
  rl.close();
  run();
}

function run() {
  const rl = readline.createInterface({ input, output });
  rl.question("What do you think of Node.js? ", (answer) => {
    if (answer === ".exit") process.exit();

    if (answer === "test") {
      logWithColor.green("This is test!");
      reRun(rl);
      return;
    }

    logWithColor.red("Invalid input");
    reRun(rl);
  });
}

run();
