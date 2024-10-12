import { GLOBAL_CONSTANTS } from "../constants/global.js";
import path from "node:path";
import os from "node:os";

export function upDir() {
  GLOBAL_CONSTANTS.CURRENT_PATH = path.resolve(
    GLOBAL_CONSTANTS.CURRENT_PATH,
    ".."
  );
}
