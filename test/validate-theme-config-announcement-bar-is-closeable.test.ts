/**
 * @packageDocumentation
 * RuleTester coverage for `validate-theme-config-announcement-bar-is-closeable`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "validate-theme-config-announcement-bar-is-closeable",
    getPluginRule("validate-theme-config-announcement-bar-is-closeable"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { announcementBar: { isCloseable: "true" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "validateAnnouncementBarIsCloseable" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: { announcementBar: { isCloseable: true } },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const isCloseable = "maybe";',
                    "",
                    "export default {",
                    "    themeConfig: { announcementBar: { isCloseable } },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "validateAnnouncementBarIsCloseable",
                        suggestions: [
                            {
                                messageId: "setAnnouncementBarCloseableFalse",
                                output: [
                                    'const isCloseable = "maybe";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { announcementBar: { isCloseable: false } },",
                                    "};",
                                ].join("\n"),
                            },
                            {
                                messageId: "setAnnouncementBarCloseableTrue",
                                output: [
                                    'const isCloseable = "maybe";',
                                    "",
                                    "export default {",
                                    "    themeConfig: { announcementBar: { isCloseable: true } },",
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
                    "    themeConfig: { announcementBar: { isCloseable: false } },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const announcementBar = getAnnouncementBar();",
                    "",
                    "export default {",
                    "    themeConfig: { announcementBar },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { announcementBar: { isCloseable: "true" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
