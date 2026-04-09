/**
 * @packageDocumentation
 * RuleTester coverage for `require-theme-config-announcement-bar-id`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-theme-config-announcement-bar-id",
    getPluginRule("require-theme-config-announcement-bar-id"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { announcementBar: { content: "Hello" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigAnnouncementBarId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const id = "   ";',
                    "",
                    "export default {",
                    '    themeConfig: { announcementBar: { id, content: "Hello" } },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireThemeConfigAnnouncementBarId" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    themeConfig: { announcementBar: { id: "site-wide-banner", content: "Hello" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const id = getId();",
                    "",
                    "export default {",
                    '    themeConfig: { announcementBar: { id, content: "Hello" } },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    themeConfig: { announcementBar: { content: "Hello" } },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
