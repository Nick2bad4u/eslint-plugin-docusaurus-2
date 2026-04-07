// @ts-check
import process from "node:process";

import { ESLint } from "eslint";
import pc from "picocolors";

import plugin from "../plugin.mjs";

const expectedEslintMajorArgumentPrefix = "--expect-eslint-major=";

/**
 * @param {readonly string[]} argv
 *
 * @returns {number | undefined}
 */
const parseExpectedEslintMajor = (argv) => {
    const matchingArgument = argv.find((argument) =>
        argument.startsWith(expectedEslintMajorArgumentPrefix)
    );

    if (matchingArgument === undefined) {
        return undefined;
    }

    const majorString = matchingArgument.slice(
        expectedEslintMajorArgumentPrefix.length
    );
    const majorValue = Number.parseInt(majorString, 10);

    if (Number.isNaN(majorValue)) {
        throw new Error(
            `Invalid ESLint major value in argument: ${matchingArgument}`
        );
    }

    return majorValue;
};

/**
 * @param {number | undefined} expectedMajor
 */
const assertEslintMajor = (expectedMajor) => {
    const runtimeVersion = ESLint.version;
    const runtimeMajor = Number.parseInt(
        runtimeVersion.split(".", 1)[0] ?? "",
        10
    );

    if (Number.isNaN(runtimeMajor)) {
        throw new Error(
            `Unable to parse ESLint runtime version: ${runtimeVersion}`
        );
    }

    if (expectedMajor !== undefined && runtimeMajor !== expectedMajor) {
        throw new Error(
            `Expected ESLint major ${expectedMajor}, but detected ${runtimeVersion}.`
        );
    }

    console.log(
        `${pc.green("✓")} ESLint runtime ${pc.bold(runtimeVersion)} detected.`
    );
};

/**
 * @returns {import("eslint").Linter.Config}
 */
const createRecommendedCompatibilityConfig = () => {
    const recommendedConfig = plugin.configs?.["recommended"];

    if (
        recommendedConfig === undefined ||
        recommendedConfig === null ||
        Array.isArray(recommendedConfig) ||
        typeof recommendedConfig !== "object"
    ) {
        throw new Error(
            "Plugin recommended config is unavailable for compatibility smoke checks."
        );
    }

    const typedRecommendedConfig =
        /** @type {import("eslint").Linter.Config} */ (recommendedConfig);

    return {
        ...typedRecommendedConfig,
        name: "compat-smoke:recommended",
        plugins: {
            ...typedRecommendedConfig.plugins,
            "docusaurus-2": plugin,
        },
        rules: {
            ...(typedRecommendedConfig.rules ?? {}),
        },
    };
};

/**
 * @returns {import("eslint").Linter.Config[]}
 */
const createCompatibilityConfig = () => [
    createRecommendedCompatibilityConfig(),
];

const runScenario = async () => {
    const eslint = new ESLint({
        cwd: process.cwd(),
        fix: false,
        ignore: false,
        overrideConfig: createCompatibilityConfig(),
        overrideConfigFile: true,
    });

    const lintResults = await eslint.lintText(
        [
            "export const siteTitle = 'docs';",
            "export const routeId = 'intro';",
        ].join("\n"),
        {
            filePath: "compat-smoke.ts",
        }
    );

    const fatalMessages = lintResults.flatMap((result) =>
        result.messages.filter((message) => message.fatal === true)
    );

    if (fatalMessages.length > 0) {
        throw new Error(
            `Compatibility smoke test encountered ${String(fatalMessages.length)} fatal message(s).`
        );
    }

    console.log(
        `${pc.green("✓")} Recommended preset loaded under ESLint ${pc.bold(ESLint.version)} with ${pc.bold(String(lintResults[0]?.messages.length ?? 0))} message(s).`
    );
};

console.log(pc.bold(pc.cyan("Running ESLint 9 compatibility smoke checks...")));

const expectedEslintMajor = parseExpectedEslintMajor(process.argv.slice(2));
assertEslintMajor(expectedEslintMajor);
await runScenario();

console.log(pc.bold(pc.green("ESLint compatibility smoke checks passed.")));
