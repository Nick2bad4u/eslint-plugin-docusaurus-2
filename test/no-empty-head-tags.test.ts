/**
 * @packageDocumentation
 * RuleTester coverage for `no-empty-head-tags`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run("no-empty-head-tags", getPluginRule("no-empty-head-tags"), {
    invalid: [
        {
            code: [
                "export default {",
                '    headTags: [{ tagName: "meta" }],',
                "};",
            ].join("\n"),
            errors: [{ messageId: "noEmptyHeadTags" }],
            filename: "docs/docusaurus/docusaurus.config.ts",
            output: [
                "export default {",
                "    headTags: [],",
                "};",
            ].join("\n"),
        },
        {
            code: [
                "export default {",
                "    headTags: [",
                '        { tagName: "meta", attributes: {} },',
                '        { tagName: "script", innerHTML: "" },',
                '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                "    ],",
                "};",
            ].join("\n"),
            errors: [
                { messageId: "noEmptyHeadTags" },
                { messageId: "noEmptyHeadTags" },
            ],
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
                "const headTags = [",
                '    { tagName: "meta", attributes: {} },',
                '    { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                "];",
                "",
                "export default {",
                "    headTags,",
                "};",
            ].join("\n"),
            errors: [{ messageId: "noEmptyHeadTags" }],
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
                "const attributes = getAttributes();",
                "",
                "export default {",
                '    headTags: [{ tagName: "meta", attributes }],',
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
                '    headTags: [{ tagName: "meta" }],',
                "};",
            ].join("\n"),
            filename: "src/config.ts",
        },
    ],
});
