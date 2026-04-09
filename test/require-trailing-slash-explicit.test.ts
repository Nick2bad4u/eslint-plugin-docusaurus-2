/**
 * @packageDocumentation
 * RuleTester coverage for `require-trailing-slash-explicit`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-trailing-slash-explicit",
    getPluginRule("require-trailing-slash-explicit"),
    {
        invalid: [
            {
                code: 'export default { baseUrl: "/docs/" };',
                errors: [
                    {
                        messageId: "requireTrailingSlashExplicit",
                        suggestions: [
                            {
                                messageId: "setTrailingSlashFalse",
                                output: 'export default { baseUrl: "/docs/", trailingSlash: false };',
                            },
                            {
                                messageId: "setTrailingSlashTrue",
                                output: 'export default { baseUrl: "/docs/", trailingSlash: true };',
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { trailingSlash: "false" };',
                errors: [{ messageId: "requireTrailingSlashExplicit" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: "export default { trailingSlash: false };",
            },
            {
                code: "export default { trailingSlash: `true` };",
                errors: [{ messageId: "requireTrailingSlashExplicit" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: "export default { trailingSlash: true };",
            },
            {
                code: [
                    'const trailingSlash = "false";',
                    "",
                    "export default { trailingSlash };",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireTrailingSlashExplicit",
                        suggestions: [
                            {
                                messageId: "setTrailingSlashFalse",
                                output: [
                                    'const trailingSlash = "false";',
                                    "",
                                    "export default { trailingSlash: false };",
                                ].join("\n"),
                            },
                            {
                                messageId: "setTrailingSlashTrue",
                                output: [
                                    'const trailingSlash = "false";',
                                    "",
                                    "export default { trailingSlash: true };",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { trailingSlash: 1 };",
                errors: [
                    {
                        messageId: "requireTrailingSlashExplicit",
                        suggestions: [
                            {
                                messageId: "setTrailingSlashFalse",
                                output: "export default { trailingSlash: false };",
                            },
                            {
                                messageId: "setTrailingSlashTrue",
                                output: "export default { trailingSlash: true };",
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: "export default { trailingSlash: false };",
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { trailingSlash: true };",
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "const trailingSlash = false;",
                    "",
                    "export default { trailingSlash };",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    trailingSlash: process.env["DOCUSAURUS_TRAILING_SLASH"] === "true",',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: "export default { trailingSlash: 1 };",
                filename: "src/config.ts",
            },
        ],
    }
);
