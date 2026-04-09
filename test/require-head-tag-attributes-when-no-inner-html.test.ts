/**
 * @packageDocumentation
 * RuleTester coverage for `require-head-tag-attributes-when-no-inner-html`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-head-tag-attributes-when-no-inner-html",
    getPluginRule("require-head-tag-attributes-when-no-inner-html"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "meta" }],',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireHeadTagAttributesWhenNoInnerHtml" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    headTags: [{ tagName: "meta", attributes: {} }],',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireHeadTagAttributesWhenNoInnerHtml" },
                ],
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
