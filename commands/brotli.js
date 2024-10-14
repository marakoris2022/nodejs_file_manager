import zlib from "zlib";
import fs from "node:fs";
import path from "path";
import { GLOBAL_CONSTANTS } from "../constants/global.js";
import { logWithColor } from "../utils/utils.js";

export async function compressFile(commandPath) {
  return new Promise((resolve, reject) => {
    const compress = zlib.createBrotliCompress();

    const splitNamesString = commandPath.split(" ");
    const filePath = splitNamesString[1];
    const endFilePath = splitNamesString[2];
    let nameOfFile;

    if (!filePath || !endFilePath) throw new Error("Failed to get file path");

    let filePathChecked;

    if (fs.existsSync(filePath)) {
      filePathChecked = filePath;
      nameOfFile = path.parse(filePath).base;
    } else if (
      fs.existsSync(path.join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath))
    ) {
      nameOfFile = path.parse(filePath).base;
      filePathChecked = path.join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath);
    }

    const fullEndPath = path.join(endFilePath, nameOfFile + ".br");

    const input = fs.createReadStream(filePathChecked);
    const output = fs.createWriteStream(fullEndPath);

    input.pipe(compress).pipe(output);
    output.on("finish", () => {
      logWithColor.green(`Compression completed: ${fullEndPath}`);
      resolve();
    });
    output.on("error", (ex) => {
      reject(ex);
    });
  });
}

export async function uncompressFile(commandPath) {
  return new Promise((resolve, reject) => {
    const decompress = zlib.createBrotliDecompress();

    const splitNamesString = commandPath.split(" ");
    const filePath = splitNamesString[1];
    const endFilePath = splitNamesString[2]; // Распакованный файл

    if (!filePath || !endFilePath) {
      throw new Error("Failed to get file path");
    }

    let filePathChecked;

    if (fs.existsSync(filePath)) {
      filePathChecked = filePath;
    } else if (
      fs.existsSync(path.join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath))
    ) {
      filePathChecked = path.join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath);
    } else {
      throw new Error(`File not found: ${filePath}`);
    }

    const nameOfFile = path.parse(filePathChecked).name;

    const outputFileName = path.join(endFilePath, nameOfFile);

    const input = fs.createReadStream(filePathChecked);
    const output = fs.createWriteStream(outputFileName);

    input.pipe(decompress).pipe(output);
    output.on("finish", () => {
      logWithColor.green(`Decompression completed: ${outputFileName}`);
      resolve();
    });
    output.on("error", (ex) => {
      reject(ex);
    });
  });
}
