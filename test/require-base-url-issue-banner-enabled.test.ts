/**
 * @packageDocumentation
 * RuleTester coverage for `require-base-url-issue-banner-enabled`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-base-url-issue-banner-enabled",
    getPluginRule("require-base-url-issue-banner-enabled"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlIssueBannerEnabled" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    baseUrlIssueBanner: false,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlIssueBannerEnabled" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    baseUrlIssueBanner: true,",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "const baseUrlIssueBanner = false;",
                    "",
                    "export default {",
                    "    baseUrlIssueBanner,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlIssueBannerEnabled" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    baseUrlIssueBanner: "true",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlIssueBannerEnabled" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    baseUrlIssueBanner: true,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const baseUrlIssueBanner = true;",
                    "",
                    "export default {",
                    "    baseUrlIssueBanner,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    baseUrlIssueBanner: isPreviewEnvironment(),",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    baseUrlIssueBanner: false,",
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
