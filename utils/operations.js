import { GLOBAL_CONSTANTS } from "../constants/global.js";
import path from "node:path";
import fs, { ftruncate } from "node:fs";
import { readFile, appendFile } from "node:fs/promises";
import { join } from "node:path";
import { logWithColor } from "./utils.js";

export async function readFileCat(filePath) {
  return new Promise((res, rej) => {
    const file = filePath.split(" ")[1];
    let filePathChecked = "";
    let readableStream;

    if (fs.existsSync(file)) {
      filePathChecked = file;
    } else if (fs.existsSync(join(GLOBAL_CONSTANTS.CURRENT_PATH, file))) {
      filePathChecked = join(GLOBAL_CONSTANTS.CURRENT_PATH, file);
    }
    if (filePathChecked) {
      readableStream = fs.createReadStream(filePathChecked);
      readableStream.on("data", (data) => {
        logWithColor.green(data.toString());
      });
      readableStream.on("end", () => res());
    } else {
      rej("Cant read data");
    }
  });
}

export async function createNewFileAdd(fileName) {
  const file = fileName.split(" ")[1];
  await appendFile(path.join(GLOBAL_CONSTANTS.CURRENT_PATH, file), "");
  logWithColor.green(`${file} - successfully created.`);
}
