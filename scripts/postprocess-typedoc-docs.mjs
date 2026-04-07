#!/usr/bin/env node

import { copyFile, access } from "node:fs/promises";
import * as path from "node:path";

const outputDirectoryArgument = process.argv[2];

if (
    typeof outputDirectoryArgument !== "string" ||
    outputDirectoryArgument.length === 0
) {
    throw new Error("Expected a TypeDoc output directory argument.");
}

const outputDirectoryPath = path.resolve(
    process.cwd(),
    outputDirectoryArgument
);
const readmePath = path.join(outputDirectoryPath, "README.md");
const globalsPath = path.join(outputDirectoryPath, "globals.md");

await access(readmePath);
await copyFile(readmePath, globalsPath);
