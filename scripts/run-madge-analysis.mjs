/**
 * @packageDocumentation
 * Run Madge analyses with deterministic, warning-free output.
 */

import madge from "madge";
import { resolve } from "node:path";

const sourceRootPath = resolve(process.cwd(), "src");
const excludedPathPattern = String.raw`(?:^|/|\\)(test|dist|node_modules|cache|\.cache|coverage|build|eslint-inspector|temp|\.docusaurus)(?:$|/|\\)|\.css$`;
const madgeOptions = {
    fileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "mjs",
        "cjs",
        "cts",
        "mts",
    ],
    excludeRegExp: [new RegExp(excludedPathPattern, "u")],
    tsConfig: resolve(process.cwd(), "tsconfig.json"),
};

const requestedMode = process.argv[2];

if (
    requestedMode !== "circular" &&
    requestedMode !== "leaves" &&
    requestedMode !== "orphans"
) {
    console.error(
        "Usage: node scripts/run-madge-analysis.mjs <circular|leaves|orphans>"
    );
    process.exit(1);
}

const dependencyTree = await madge(sourceRootPath, madgeOptions);
let analysisResult;

switch (requestedMode) {
    case "circular": {
        analysisResult = await dependencyTree.circular();
        break;
    }

    case "leaves": {
        analysisResult = await dependencyTree.leaves();
        break;
    }

    case "orphans": {
        analysisResult = await dependencyTree.orphans();
        break;
    }
}

if (!Array.isArray(analysisResult)) {
    console.error(
        `Madge '${requestedMode}' analysis returned an unexpected result.`
    );
    process.exit(1);
}

if (analysisResult.length === 0) {
    console.log(`Madge ${requestedMode}: no issues found.`);
    process.exit(0);
}

console.error(
    `Madge ${requestedMode}: found ${String(analysisResult.length)} issue(s).`
);

for (const entry of analysisResult) {
    if (Array.isArray(entry)) {
        console.error(`- ${entry.join(" -> ")}`);
        continue;
    }

    console.error(`- ${String(entry)}`);
}

process.exit(1);
