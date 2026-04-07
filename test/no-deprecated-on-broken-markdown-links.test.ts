/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-on-broken-markdown-links`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-deprecated-on-broken-markdown-links",
    getPluginRule("no-deprecated-on-broken-markdown-links"),
    {
        invalid: [
            {
                code: [
                    "const config = {",
                    '    title: "Docs",',
                    '    onBrokenMarkdownLinks: "warn",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedOnBrokenMarkdownLinks" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const config = {",
                    '    title: "Docs",',
                    '    markdown: { hooks: { onBrokenMarkdownLinks: "warn" } },',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    '    onBrokenMarkdownLinks: "warn",',
                    "    markdown: {",
                    "        hooks: {",
                    '            onBrokenMarkdownImages: "throw",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedOnBrokenMarkdownLinks" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "    markdown: {",
                    "        hooks: {",
                    '            onBrokenMarkdownLinks: "warn",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { onBrokenMarkdownLinks: "warn" };',
                filename: "src/config.ts",
            },
        ],
    }
);
