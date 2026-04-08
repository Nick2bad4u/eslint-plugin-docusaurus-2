/**
 * @packageDocumentation
 * RuleTester coverage for `require-site-config-fields`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-site-config-fields",
    getPluginRule("require-site-config-fields"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireBooleanConfigField" },
                    { messageId: "requireReportingSeverityConfigField" },
                    { messageId: "requireReportingSeverityConfigField" },
                    { messageId: "requireReportingSeverityConfigField" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const emptyBaseUrl = "";',
                    'const issueBanner = "yes";',
                    'const brokenLinks = "explode";',
                    "",
                    "export default {",
                    "    baseUrl: emptyBaseUrl,",
                    '    deploymentBranch: "gh-pages",',
                    '    favicon: "/img/favicon.ico",',
                    '    organizationName: "Nick2bad4u",',
                    '    projectName: "eslint-plugin-docusaurus-2",',
                    "    baseUrlIssueBanner: issueBanner,",
                    '    onBrokenAnchors: "warn",',
                    "    onBrokenLinks: brokenLinks,",
                    '    onDuplicateRoutes: "warn",',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireBooleanConfigField" },
                    { messageId: "requireReportingSeverityConfigField" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    title: "Docs",',
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireStringConfigField" },
                    { messageId: "requireBooleanConfigField" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                options: [
                    {
                        requiredBooleanFields: ["noIndex"],
                        requiredReportingSeverityFields: [],
                        requiredStringFields: ["tagline"],
                    },
                ],
            },
        ],
        valid: [
            {
                code: [
                    'const deploymentBranch = "gh-pages";',
                    "const organizationName = getOrganizationName();",
                    'const projectName = "eslint-plugin-docusaurus-2";',
                    "",
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "    deploymentBranch,",
                    '    favicon: "/img/favicon.ico",',
                    "    organizationName,",
                    "    projectName,",
                    "    baseUrlIssueBanner: true,",
                    '    onBrokenAnchors: "warn",',
                    '    onBrokenLinks: "throw",',
                    '    onDuplicateRoutes: "warn",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    tagline: "Docs",',
                    "    noIndex: false,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
                options: [
                    {
                        requiredBooleanFields: ["noIndex"],
                        requiredReportingSeverityFields: [],
                        requiredStringFields: ["tagline"],
                    },
                ],
            },
            {
                code: 'export default { title: "Docs" };',
                filename: "src/config.ts",
            },
        ],
    }
);
