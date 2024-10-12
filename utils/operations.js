import { GLOBAL_CONSTANTS } from "../constants/global.js";
import fs from "node:fs";
import { appendFile, rename } from "node:fs/promises";
import { join, dirname, parse } from "node:path";
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
  await appendFile(join(GLOBAL_CONSTANTS.CURRENT_PATH, file), "");
  logWithColor.green(`${file} - successfully created.`);
}

export async function renameFileRn(namesString) {
  const splitNamesString = namesString.split(" ");
  const filePath = splitNamesString[1];
  const newFileName = splitNamesString[2];

  let filePathChecked;

  if (!filePath || !newFileName)
    throw new Error("Can't get Path or NewFileName");

  if (fs.existsSync(filePath)) {
    filePathChecked = filePath;
  } else if (fs.existsSync(join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath))) {
    filePathChecked = join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath);
  }

  await rename(filePathChecked, join(dirname(filePathChecked), newFileName));
  logWithColor.green(`${newFileName} - successfully renamed.`);
}

export async function copyFileCP(pathString) {
  return new Promise((res, rej) => {
    const splitPathString = pathString.split(" ");
    let nameOfFile;
    const filePath = splitPathString[1];
    const newFilePath = splitPathString[2];

    if (!filePath || !newFilePath) {
      rej(new Error("Can't get Path"));
      return;
    }

    let filePathChecked = "";

    if (fs.existsSync(filePath)) {
      filePathChecked = filePath;
      nameOfFile = parse(filePath).base;
    } else if (fs.existsSync(join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath))) {
      filePathChecked = join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath);
      nameOfFile = parse(filePathChecked).base;
    } else {
      rej("Source file does not exist.");
      return;
    }

    if (fs.existsSync(join(newFilePath, nameOfFile))) {
      logWithColor.magenta("File already in folder.");
      logWithColor.green("Copy is finished.");
      res();
      return;
    }

    const readableStream = fs.createReadStream(filePathChecked);
    const writeableStream = fs.createWriteStream(join(newFilePath, nameOfFile));

    readableStream.on("error", (error) => {
      rej(`Error reading source file: ${error.message}`);
    });

    writeableStream.on("error", (error) => {
      rej(`Error writing to destination file: ${error.message}`);
    });

    readableStream.pipe(writeableStream);

    writeableStream.on("finish", () => {
      logWithColor.green("Copy is finished.");
      res();
    });
  });
}
