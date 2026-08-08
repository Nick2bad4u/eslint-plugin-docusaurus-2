import nickTwoBadFourU from "eslint-config-nick2bad4u";

import plugin from "./plugin.mjs";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.withoutDocusaurus2,

    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Type Import Compatibility",
        rules: {
            "no-duplicate-imports": [
                "error",
                {
                    allowSeparateTypeImports: true,
                },
            ],
        },
    },

    {
        ignores: [
            "docs/docusaurus/typedoc-plugins/**/*.{js,mjs,cjs,ts,mts,cts}",
            "eslint.config.mjs",
            "knip.config.ts",
            "vitest.stryker.config.ts",
        ],
        name: "Local Generated and Tooling Ignores",
    },

    // Local Plugin Config
    // This lets us use the plugin's rules in this repository without needing to publish the plugin first.
    {
        files: ["src/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Docusaurus 2",
        plugins: {
            "docusaurus-2": plugin,
        },
        rules: {
            // @ts-expect-error -- plugin.mjs is typed as generic ESLint.Plugin.
            ...plugin.configs.all.rules,
        },
    },
    {
        files: [".github/workflows/auto-merge-dependabot-caller.yml"],
        name: "Intentional reusable Dependabot workflow",
        rules: {
            "github-actions/no-external-job": "off",
        },
    },
    {
        files: ["docs/docusaurus/**/*.{js,mjs,cjs,ts,mts,cts,tsx,jsx}"],
        name: "Local Docusaurus Site Code",
        rules: {
            "@typescript-eslint/no-dynamic-delete": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "canonical/filename-no-index": "off",
            "import-x/no-unresolved": "off",
            "n/no-process-env": "off",
            "prefer-named-capture-group": "off",
            "regexp/no-super-linear-backtracking": "off",
            "regexp/prefer-named-capture-group": "off",
            "regexp/prefer-unicode-sets-regexp": "off",
            "regexp/require-unicode-sets-regexp": "off",
            "runtime-cleanup/no-unmanaged-event-listeners": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/filename-case": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-global-object-property-assignment": "off",
            "unicorn/no-immediate-mutation": "off",
            "unicorn/no-incorrect-template-string-interpolation": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/no-unnecessary-global-this": "off",
            "unicorn/no-unreadable-new-expression": "off",
            // Scroll progress requires continuous layout-derived updates rather than visibility changes.
            "unicorn/prefer-observer-apis": "off",
            "unicorn/prefer-short-arrow-method": "off",
            "unicorn/prefer-temporal": "off",
        },
    },
    {
        files: [
            "docs/docusaurus/site-docs/**/*.md",
            "docs/docusaurus/site-docs/**/*.mdx",
            "docs/rules/**/*.md",
            "docs/rules/**/*.mdx",
        ],
        name: "Local Markdown Frontmatter Compatibility",
        rules: {
            "markdown/no-multiple-h1": "off",
            "remark/remark": "off",
        },
    },
    {
        files: ["src/**/*.{ts,mts,cts}"],
        name: "Local Source Migration Compatibility",
        rules: {
            "@typescript-eslint/restrict-template-expressions": "off",
            complexity: "off",
            "eslint-plugin/meta-property-ordering": [
                "error",
                [
                    "defaultOptions",
                    "deprecated",
                    "docs",
                    "fixable",
                    "hasSuggestions",
                    "languages",
                    "messages",
                    "replacedBy",
                    "schema",
                    "type",
                ],
            ],
            "import-x/max-dependencies": "off",
            "unicorn/consistent-boolean-name": "off",
            "unicorn/import-style": "off",
            "unicorn/no-break-in-nested-loop": "off",
            "unicorn/no-declarations-before-early-exit": "off",
            "unicorn/no-non-function-verb-prefix": "off",
            "unicorn/prefer-includes-over-repeated-comparisons": "off",
            "unicorn/prefer-minimal-ternary": "off",
            // AST analysis loops intentionally use guard-clause continues to
            // keep node narrowing flat. S135 has no threshold option, and
            // replacing these guards with nested branches obscures behavior.
            "sonarjs/too-many-break-or-continue-in-loop": "off",
        },
    },
    {
        files: ["src/rules/**/*.{ts,mts,cts}"],
        name: "Local ESLint Rule Listener Selectors",
        rules: {
            // ESLint requires PascalCase AST node names as listener keys, while
            // func-name-matching requires method names to match those keys.
            "sonarjs/function-name": [
                "warn",
                {
                    format: "^[_A-Za-z][a-zA-Z0-9]*$",
                },
            ],
        },
    },
    {
        files: ["src/plugin.ts"],
        name: "Local Package Metadata Import",
        rules: {
            // JSON module specifiers require the .json extension at runtime.
            "import-x/extensions": [
                "warn",
                "never",
                {
                    json: "always",
                },
            ],
        },
    },
    {
        files: ["docs/docusaurus/sidebars.rules.ts"],
        name: "Local Workspace Self Reference",
        rules: {
            // Docusaurus loads this build-time sidebar source directly through
            // jiti, so the private root source must use a relative .js specifier.
            "import-x/extensions": "off",
            "import-x/no-relative-packages": "off",
        },
    },
    {
        files: [
            "src/_internal/rule-docs-metadata.ts",
            "src/_internal/runtime-utils.ts",
            "src/_internal/type-checker-compat.ts",
            "src/plugin.ts",
        ],
        name: "Local Typed Runtime Boundaries",
        rules: {
            // These files validate dynamic records or construct generic total
            // maps before exposing exact public types. Assertions stay inside
            // these reviewed boundaries instead of leaking to rule code.
            "@typescript-eslint/no-unsafe-type-assertion": "off",
        },
    },
    {
        files: ["src/_internal/type-checker-compat.ts"],
        name: "Local TypeScript Version Compatibility",
        rules: {
            // Optional calls intentionally support TypeScript runtimes whose
            // TypeChecker surface can differ from the compile-time version.
            "@typescript-eslint/no-unnecessary-condition": "off",
        },
    },
    {
        files: [
            "eslint.config.mjs",
            "stryker.config.mjs",
            "vite.config.ts",
        ],
        name: "Local Tooling Config",
        rules: {
            "@typescript-eslint/dot-notation": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "unicorn/prefer-number-coercion": "off",
        },
    },
    {
        files: ["test/**/*.{ts,mts,cts}"],
        name: "Local Test Harness Compatibility",
        rules: {
            "@typescript-eslint/no-unsafe-call": "off",
            "test-signal/no-weak-existence-assertions": "off",
            "test-signal/require-negative-path": "off",
            "unicorn/no-this-outside-of-class": "off",
            "unicorn/no-top-level-side-effects": "off",
            "unicorn/no-unsafe-string-replacement": "off",
            "unicorn/prefer-https": "off",
        },
    },
    {
        files: ["test/readme-rules-table-sync.test.ts"],
        name: "Local Generated Docs Sync Test",
        rules: {
            "n/no-process-env": "off",
        },
    },
    // Add repository-specific config entries below as needed.
];

export default config;
