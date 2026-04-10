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
const globalsPath = path.join(outputDirectoryPath, "globals.md");
const apiEntryDocumentPaths = [
    path.join(outputDirectoryPath, "README.md"),
    path.join(outputDirectoryPath, "index.md"),
    path.join(outputDirectoryPath, "modules.md"),
];

const resolveApiEntryDocumentPath = async () => {
    for (const candidatePath of apiEntryDocumentPaths) {
        try {
            await access(candidatePath);

            return candidatePath;
        } catch {
            continue;
        }
    }

    throw new Error(
        [
            "Unable to find a generated TypeDoc entry document.",
            `Checked output directory: ${outputDirectoryPath}`,
            "Checked candidates:",
            ...apiEntryDocumentPaths.map(
                (candidatePath) => `- ${candidatePath}`
            ),
        ].join("\n")
    );
};

await copyFile(await resolveApiEntryDocumentPath(), globalsPath);
