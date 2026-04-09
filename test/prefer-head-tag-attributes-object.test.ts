/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-head-tag-attributes-object`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-head-tag-attributes-object",
    getPluginRule("prefer-head-tag-attributes-object"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", rel: "preconnect", href: "https://github.com" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHeadTagAttributesObject" }],
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
                    '        { tagName: "meta", name: "theme-color", content: "#25c2a0" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHeadTagAttributesObject" }],
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
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "script", type: "application/ld+json", innerHTML: JSON.stringify({ ok: true }) },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHeadTagAttributesObject" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "script", attributes: { type: "application/ld+json" }, innerHTML: JSON.stringify({ ok: true }) },',
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect" }, href: "https://github.com" },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHeadTagAttributesObject" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                    '        { tagName: "meta", attributes: { name: "theme-color", content: "#25c2a0" } },',
                    '        { tagName: "script", attributes: { type: "application/ld+json" }, innerHTML: JSON.stringify({ ok: true }) },',
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
                    '        { tagName: "link", rel: "preconnect", href: "https://github.com" },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
