/**
 * @packageDocumentation
 * RuleTester coverage for `require-base-url-slashes`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-base-url-slashes",
    getPluginRule("require-base-url-slashes"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    baseUrl: "docs/",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    baseUrl: "/docs",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    baseUrl: `docs`,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    baseUrl: "  ",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    baseUrl: "/",',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const baseUrl = "docs";',
                    "",
                    "export default {",
                    "    baseUrl,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    baseUrl: 42,",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireBaseUrlSlashes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    baseUrl: "/",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    baseUrl: "/docs/",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const baseUrl = "/docs/";',
                    "",
                    "export default {",
                    "    baseUrl,",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    baseUrl: getBaseUrl(),",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    baseUrl: "docs",',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
