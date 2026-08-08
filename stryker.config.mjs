import { createStrykerConfig } from "stryker-config-nick2bad4u";

const config = createStrykerConfig({
    coverageAnalysis: "perTest",
    dashboard: {
        project: "github.com/Nick2bad4u/eslint-plugin-docusaurus-2",
        version: "main",
    },
    eventReporter: {
        baseDir: "coverage/stryker-events",
    },
    ignorers: ["console-all"],
    incrementalFile: ".cache/stryker/incremental-full.json",
    mutate: [
        "src/**/*.ts",
        "src/**/*.mjs",
        "src/**/*.js",
        "!src/**/*.*.ts",
    ],
    plugins: ["@stryker-mutator/*", "@stryker-ignorer/*"],
    vitest: {
        configFile: "./vitest.stryker.config.ts",
    },
});

export default config;
