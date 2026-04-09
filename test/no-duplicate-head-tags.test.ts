/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-head-tags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-head-tags",
    getPluginRule("no-duplicate-head-tags"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateHeadTags" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "meta", attributes: { name: "theme-color", content: "#25c2a0" } },',
                    '        { attributes: { content: "#25c2a0", name: "theme-color" }, tagName: "meta" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateHeadTags" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "meta", attributes: { name: "theme-color", content: "#25c2a0" } },',
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const headTags = [",
                    '    { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    '    { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "];",
                    "",
                    "export default {",
                    "    headTags,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateHeadTags" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "const headTags = [",
                    '    { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "];",
                    "",
                    "export default {",
                    "    headTags,",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    '        { tagName: "script", innerHTML: JSON.stringify({ ok: true }) },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: getHeadTags(),",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: dynamicHref } },',
                    '        { tagName: "link", attributes: { rel: "preconnect", href: dynamicHref } },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
