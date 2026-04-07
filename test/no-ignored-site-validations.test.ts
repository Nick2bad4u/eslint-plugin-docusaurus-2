/**
 * @packageDocumentation
 * RuleTester coverage for `no-ignored-site-validations`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-ignored-site-validations",
    getPluginRule("no-ignored-site-validations"),
    {
        invalid: [
            {
                code: [
                    "const config = {",
                    '    onBrokenLinks: "ignore",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [{ messageId: "avoidIgnoredValidation" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const config = {",
                    '    onBrokenLinks: "throw",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
            },
            {
                code: [
                    "const config = {",
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "    markdown: {",
                    "        hooks: {",
                    '            onBrokenMarkdownLinks: "ignore",',
                    "        },",
                    "    },",
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [{ messageId: "avoidIgnoredValidation" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const config = {",
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "    markdown: {",
                    "        hooks: {",
                    '            onBrokenMarkdownLinks: "warn",',
                    "        },",
                    "    },",
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "const config = {",
                    '    onBrokenLinks: "throw",',
                    '    onBrokenAnchors: "warn",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    title: "Docs",',
                    "    markdown: {",
                    "        hooks: {",
                    '            onBrokenMarkdownLinks: "warn",',
                    "        },",
                    "    },",
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { onBrokenLinks: "ignore" };',
                filename: "src/config.ts",
            },
        ],
    }
);
