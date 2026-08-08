/**
 * Repository-specific configuration for Knip dependency analysis.
 *
 * @packageDocumentation
 */
import type { KnipConfig } from "knip";

/**
 * Knip configuration that scopes entry points and dependency heuristics to the
 * repository layout.
 */
const knipConfig: KnipConfig = {
    $schema: "https://unpkg.com/knip@6/schema.json",
    ignoreBinaries: [
        "actionlint",
        "gitleaks",
        "grype",
        "lychee",
        // Knip mistakes its configuration filename for a binary entry point.
        "knip.config.ts",
    ],
    ignoreDependencies: [
        ".*prettier.*",
        "@easyops-cn/docusaurus-search-local",
        "@easyops-cn/docusaurus-theme-docusaurus-search-local",
        "@eslint.*",
        "@microsoft/tsdoc-config",
        "@stryker-ignorer/console-all",
        "@types.*",
        "git-cliff",
        "gitcliff-config-nick2bad4u",
        "gitleaks-config-nick2bad4u",
        "jscpd-config-nick2bad4u",
        "lychee-config-nick2bad4u",
        "ncu-config-nick2bad4u",
        "postcss.*",
        "remark.*",
        "stylelint.*",
        "ts.*",
        "type.*",
        "yamllint-config-nick2bad4u",

        // Items flagged by knip report (ignored to suppress false-positives / repo-local tools)
        "clsx",
        "react-github-btn",
        "htmlhint",
        "leasot",
        "markdown-link-check",
        "sloc",
        "storybook",
        "react",
    ],
    ignoreIssues: {
        // npm, Secretlint, and Vitest load these config exports implicitly.
        ".npm-extension.mjs": ["exports"],
        ".secretlintrc.cjs": ["exports"],
        "vitest.stryker.config.ts": ["exports"],
        // Docusaurus MDX files import these helpers across workspace roots.
        "docs/docusaurus/src/components/RulePageDemos.tsx": ["exports"],
        // Stryker loads plugin families dynamically from these package globs.
        "stryker.config.mjs": ["unlisted"],
        // Kept as the shared typed RuleTester boundary for future typed rules.
        "test/_internal/typed-rule-tester.ts": ["exports"],
    },
    ignoreFiles: [
        "docs/docusaurus/src/components/RuleLiveDemo.tsx",
        "docs/docusaurus/src/components/RulePageDemos.tsx",
        "plugin.d.mts",
        "scripts/*.d.mts",
    ],
    ignoreExportsUsedInFile: {
        interface: true,
        type: true,
    },
    includeEntryExports: true,
    rules: {
        binaries: "error",
        catalog: "error",
        dependencies: "error",
        devDependencies: "error",
        duplicates: "error",
        enumMembers: "warn",
        exports: "warn",
        files: "error",
        namespaceMembers: "warn",
        nsExports: "warn",
        nsTypes: "warn",
        optionalPeerDependencies: "error",
        types: "warn",
        unlisted: "error",
        unresolved: "error",
    },
    workspaces: {
        ".": {
            entry: [
                ".npm-extension.mjs",
                ".secretlintrc.cjs",
                "docs/rules/**/*.mdx",
                "scripts/bootstrap-eslint-repo.mjs",
                "scripts/create-eslint-plugin-project.mjs",
                "test/_internal/typed-rule-tester.ts",
                "vitest.stryker.config.ts",
            ],
        },
        "docs/docusaurus": {
            entry: ["site-docs/**/*.{md,mdx}"],
        },
    },
};

export default knipConfig;
