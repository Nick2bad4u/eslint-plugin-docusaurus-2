/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-live-codeblock-when-live-codeblock-configured`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-live-codeblock-when-live-codeblock-configured",
    getPluginRule(
        "require-theme-live-codeblock-when-live-codeblock-configured"
    ),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "bottom",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireThemeLiveCodeblockWhenLiveCodeblockConfigured",
                        suggestions: [
                            {
                                messageId: "addThemeLiveCodeblockToPlugins",
                                output: [
                                    "export default {",
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "bottom",',
                                    "        },",
                                    "    },",
                                    '    plugins: ["@docusaurus/theme-live-codeblock"]',
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
                    '    plugins: ["@easyops-cn/docusaurus-search-local"],',
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "top",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireThemeLiveCodeblockWhenLiveCodeblockConfigured",
                        suggestions: [
                            {
                                messageId: "addThemeLiveCodeblockToPlugins",
                                output: [
                                    "export default {",
                                    '    plugins: ["@easyops-cn/docusaurus-search-local", "@docusaurus/theme-live-codeblock"],',
                                    "    themeConfig: {",
                                    "        liveCodeBlock: {",
                                    '            playgroundPosition: "top",',
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
                    'import type { Config } from "@docusaurus/types";',
                    "const themeConfig = {",
                    "    liveCodeBlock: {",
                    '        playgroundPosition: "bottom",',
                    "    },",
                    "};",
                    "",
                    "const config = {",
                    "    themeConfig,",
                    "} satisfies Config;",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireThemeLiveCodeblockWhenLiveCodeblockConfigured",
                        suggestions: [
                            {
                                messageId: "addThemeLiveCodeblockToPlugins",
                                output: [
                                    'import type { Config } from "@docusaurus/types";',
                                    "const themeConfig = {",
                                    "    liveCodeBlock: {",
                                    '        playgroundPosition: "bottom",',
                                    "    },",
                                    "};",
                                    "",
                                    "const config = {",
                                    "    themeConfig,",
                                    "} satisfies Config;",
                                    "",
                                    "export default config;",
                                ]
                                    .join("\n")
                                    .replace(
                                        "} satisfies Config;",
                                        '    plugins: ["@docusaurus/theme-live-codeblock"]\n} satisfies Config;'
                                    ),
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
                    '    plugins: ["@docusaurus/theme-live-codeblock"],',
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "bottom",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themes: ["@docusaurus/theme-live-codeblock"],',
                    "    themeConfig: {",
                    "        liveCodeBlock: {",
                    '            playgroundPosition: "bottom",',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'import type { Config } from "@docusaurus/types";',
                    "const themeConfig = {",
                    "    liveCodeBlock: {",
                    '        playgroundPosition: "bottom",',
                    "    },",
                    "};",
                    "",
                    "const config = {",
                    '    plugins: ["@docusaurus/theme-live-codeblock"],',
                    "    themeConfig,",
                    "} satisfies Config;",
                    "",
                    "export default config;",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
