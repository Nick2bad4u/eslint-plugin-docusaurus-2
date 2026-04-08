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
const indexPath = path.join(outputDirectoryPath, "index.md");
const globalsPath = path.join(outputDirectoryPath, "globals.md");

const resolveApiIndexPath = async () => {
    try {
        await access(readmePath);

        return readmePath;
    } catch {
        await access(indexPath);

        return indexPath;
    }
};

await copyFile(await resolveApiIndexPath(), globalsPath);
