/**
 * @packageDocumentation
 * RuleTester coverage for `validate-live-codeblock-playground-position`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-live-codeblock-playground-position",
    getPluginRule("validate-live-codeblock-playground-position"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "side",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateLiveCodeblockPlaygroundPosition",
                        suggestions: [
                            {
                                messageId: "setPlaygroundPositionTop",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "top",',
                                    "        },",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setPlaygroundPositionBottom",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "bottom",',
                                    "        },",
                                    "    },",
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
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateLiveCodeblockPlaygroundPosition",
                        suggestions: [
                            {
                                messageId: "setPlaygroundPositionTop",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "top",',
                                    "        },",
                                    "    },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setPlaygroundPositionBottom",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "bottom",',
                                    "        },",
                                    "    },",
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
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "top",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    "            playgroundPosition,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
