import { createReadStream, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { GLOBAL_CONSTANTS } from "../constants/global.js";
import { logWithColor } from "../utils/utils.js";

export const calculateHash = async (commandPath) => {
  return new Promise((res) => {
    const splitNamesString = commandPath.split(" ");
    const filePath = splitNamesString[1];

    if (!filePath) throw new Error("Failed to get file path");

    let filePathChecked;

    if (existsSync(filePath)) {
      filePathChecked = filePath;
    } else if (existsSync(join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath))) {
      filePathChecked = join(GLOBAL_CONSTANTS.CURRENT_PATH, filePath);
    }

    if (!filePathChecked) throw new Error("Failed to get file path");

    const hash = createHash("sha256");
    const input = createReadStream(filePathChecked);

    input.on("readable", () => {
      const data = input.read();
      if (data) hash.update(data);
      else {
        logWithColor.magenta(`Hash calculation: ${hash.digest("hex")}`);
        res();
        return;
      }
    });
  });
};
