import path from "path";
import { fileURLToPath } from "url";

import { defineConfig } from "vitest/config";

import { playwright } from "@vitest/browser-playwright";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({});
