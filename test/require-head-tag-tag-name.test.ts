/**
 * @packageDocumentation
 * RuleTester coverage for `require-head-tag-tag-name`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-head-tag-tag-name",
    getPluginRule("require-head-tag-tag-name"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireHeadTagTagName",
                        suggestions: [
                            {
                                messageId: "setHeadTagTagNameLink",
                                output: [
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "link", attributes: { rel: "preconnect", href: "https://github.com" } },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { attributes: { name: "theme-color", content: "#25c2a0" } },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireHeadTagTagName",
                        suggestions: [
                            {
                                messageId: "setHeadTagTagNameMeta",
                                output: [
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "meta", attributes: { name: "theme-color", content: "#25c2a0" } },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    "        { innerHTML: JSON.stringify({ ok: true }) },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireHeadTagTagName",
                        suggestions: [
                            {
                                messageId: "setHeadTagTagNameScript",
                                output: [
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "script", innerHTML: JSON.stringify({ ok: true }) },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    headTags: [",
                    '        { tagName: "", innerHTML: JSON.stringify({ ok: true }) },',
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireHeadTagTagName",
                        suggestions: [
                            {
                                messageId: "setHeadTagTagNameScript",
                                output: [
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "script", innerHTML: JSON.stringify({ ok: true }) },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const attributes = getAttributes();",
                    "",
                    "export default {",
                    "    headTags: [",
                    "        { attributes },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireHeadTagTagName",
                        suggestions: [
                            {
                                messageId: "setHeadTagTagNameMeta",
                                output: [
                                    "const attributes = getAttributes();",
                                    "",
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "meta", attributes },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setHeadTagTagNameLink",
                                output: [
                                    "const attributes = getAttributes();",
                                    "",
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "link", attributes },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setHeadTagTagNameScript",
                                output: [
                                    "const attributes = getAttributes();",
                                    "",
                                    "export default {",
                                    "    headTags: [",
                                    '        { tagName: "script", attributes },',
                                    "    ],",
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
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
                    '        { attributes: { rel: "preconnect", href: "https://github.com" } },',
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
