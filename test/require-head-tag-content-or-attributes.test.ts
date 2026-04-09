/**
 * @packageDocumentation
 * RuleTester coverage for `require-head-tag-content-or-attributes`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-head-tag-content-or-attributes",
    getPluginRule("require-head-tag-content-or-attributes"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "meta" }],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireHeadTagContentOrAttributes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "meta", attributes: {} }],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireHeadTagContentOrAttributes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "script", innerHTML: "" }],',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireHeadTagContentOrAttributes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "meta", attributes: { name: "theme-color", content: "#25c2a0" } }],',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "script", innerHTML: JSON.stringify({ ok: true }) }],',
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
                    '    headTags: [{ tagName: "meta" }],',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
