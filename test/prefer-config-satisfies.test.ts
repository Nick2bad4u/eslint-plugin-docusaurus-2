/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-config-satisfies`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-config-satisfies",
    getPluginRule("prefer-config-satisfies"),
    {
        invalid: [
            {
                code: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    "const config: Config = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [{ messageId: "preferConfigSatisfies" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    "const config = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "} satisfies Config;",
                    "",
                    "export default config;",
                ].join("\n"),
            },
            {
                code: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    'export default { title: "Docs", url: "https://example.com", baseUrl: "/" } as Config;',
                ].join("\n"),
                errors: [{ messageId: "preferConfigSatisfies" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    'export default { title: "Docs", url: "https://example.com", baseUrl: "/" } satisfies Config;',
                ].join("\n"),
            },
            {
                code: [
                    'import type { Config as DocusaurusConfig } from "@docusaurus/types";',
                    "",
                    "const config: DocusaurusConfig = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "};",
                    "",
                    "export default config;",
                ].join("\n"),
                errors: [{ messageId: "preferConfigSatisfies" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    'import type { Config as DocusaurusConfig } from "@docusaurus/types";',
                    "",
                    "const config = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "} satisfies DocusaurusConfig;",
                    "",
                    "export default config;",
                ].join("\n"),
            },
            {
                code: [
                    'import type * as Docusaurus from "@docusaurus/types";',
                    "",
                    'export default { title: "Docs", url: "https://example.com", baseUrl: "/" } as Docusaurus.Config;',
                ].join("\n"),
                errors: [{ messageId: "preferConfigSatisfies" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    'import type * as Docusaurus from "@docusaurus/types";',
                    "",
                    'export default { title: "Docs", url: "https://example.com", baseUrl: "/" } satisfies Docusaurus.Config;',
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    "const config = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "} satisfies Config;",
                    "",
                    "export default config;",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'import type { Config as DocusaurusConfig } from "@docusaurus/types";',
                    "",
                    "const config = {",
                    '    title: "Docs",',
                    '    url: "https://example.com",',
                    '    baseUrl: "/docs/",',
                    "} satisfies DocusaurusConfig;",
                    "",
                    "export default config;",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'import type * as Docusaurus from "@docusaurus/types";',
                    "",
                    'export default { title: "Docs", url: "https://example.com", baseUrl: "/" } satisfies Docusaurus.Config;',
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'import type { Config } from "@docusaurus/types";',
                    "",
                    'const config: Config = { title: "Docs", url: "https://example.com", baseUrl: "/" };',
                    "",
                    "export default config;",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
