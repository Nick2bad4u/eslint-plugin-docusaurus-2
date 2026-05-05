// eslint-disable-next-line @typescript-eslint/no-require-imports, import-x/no-commonjs -- Secretlint loads this repository config as CommonJS (.cjs).
const sharedConfig = require("secretlint-config-nick2bad4u/secretlintrc.json");

/** @type {import("@secretlint/types").SecretLintConfigDescriptor} */
const secretlintConfig = {
    ...sharedConfig,
    rules: [...sharedConfig.rules],
};

// eslint-disable-next-line import-x/no-commonjs -- Secretlint expects CommonJS export shape for .cjs config files.
module.exports = secretlintConfig;
