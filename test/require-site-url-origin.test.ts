/**
 * @packageDocumentation
 * RuleTester coverage for `require-site-url-origin`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-site-url-origin",
    getPluginRule("require-site-url-origin"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    url: "http://example.com",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    url: "https://example.com",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    url: "https://example.com/docs/",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    url: "https://example.com",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    url: `https://example.com/docs/`,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    url: "https://example.com",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const siteUrl = "http://example.com/docs/";',
                    "",
                    "export default {",
                    "    url: siteUrl,",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireSiteUrlOrigin",
                        suggestions: [
                            {
                                messageId: "normalizeSiteUrlOrigin",
                                output: [
                                    'const siteUrl = "http://example.com/docs/";',
                                    "",
                                    "export default {",
                                    '    url: "https://example.com",',
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
                    '    url: "not a valid URL",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    url: 42,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireSiteUrlOrigin" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    url: "https://example.com",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    url: "http://localhost:3000",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    url: getSiteUrl(),",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    url: "http://example.com/docs/",',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
