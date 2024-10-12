import { GLOBAL_CONSTANTS } from "../constants/global.js";
import path from "node:path";
import fs from "node:fs";
import { readdir, stat } from "node:fs/promises";

export async function cdDir(newPathOrRel) {
  const requestPath = newPathOrRel.split(" ")[1];

  const parsedPath = path.parse(requestPath);
  if (parsedPath.root) {
    const isExists = fs.existsSync(requestPath);
    if (isExists) {
      GLOBAL_CONSTANTS.CURRENT_PATH = path.resolve(requestPath);
      return;
    } else {
      throw new Error("Path is not exists.");
    }
  }
  const isExists = fs.existsSync(
    path.resolve(GLOBAL_CONSTANTS.CURRENT_PATH, requestPath)
  );
  if (isExists) {
    GLOBAL_CONSTANTS.CURRENT_PATH = path.join(
      GLOBAL_CONSTANTS.CURRENT_PATH,
      requestPath
    );
    return;
  } else {
    throw new Error("Path is not exists.");
  }
}

export function upDir() {
  GLOBAL_CONSTANTS.CURRENT_PATH = path.resolve(
    GLOBAL_CONSTANTS.CURRENT_PATH,
    ".."
  );
}

export async function lsDir() {
  function File(Name, Type) {
    this.Name = Name;
    this.Type = Type;
  }

  const files = await readdir(GLOBAL_CONSTANTS.CURRENT_PATH, {
    withFileTypes: true,
  });

  const filePromiseArr = [];
  const dataForTable = [];

  for (const file of files) {
    filePromiseArr.push(
      stat(path.join(GLOBAL_CONSTANTS.CURRENT_PATH, file.name))
    );
  }

  const statArr = await Promise.all(filePromiseArr);

  statArr.forEach((stat, index) => {
    const tableFile = new File(
      files[index].name,
      stat.isFile() ? "file" : "directory"
    );
    dataForTable.push(tableFile);
  });

  console.table(dataForTable);
  return;
}
