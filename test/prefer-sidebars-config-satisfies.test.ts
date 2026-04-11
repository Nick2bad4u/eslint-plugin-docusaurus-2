/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-sidebars-config-satisfies`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-sidebars-config-satisfies",
    getPluginRule("prefer-sidebars-config-satisfies"),
    {
        invalid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    '    docs: ["introduction"],',
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [{ messageId: "preferSidebarsConfigSatisfies" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars = {",
                    '    docs: ["introduction"],',
                    "} satisfies SidebarsConfig;",
                    "",
                    "export default sidebars;",
                ].join("\n"),
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    'export default { docs: ["introduction"] } as SidebarsConfig;',
                ].join("\n"),
                errors: [{ messageId: "preferSidebarsConfigSatisfies" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    'export default { docs: ["introduction"] } satisfies SidebarsConfig;',
                ].join("\n"),
            },
            {
                code: [
                    'import type { SidebarsConfig as DocsSidebars } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: DocsSidebars = {",
                    '    docs: ["introduction"],',
                    "};",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                errors: [{ messageId: "preferSidebarsConfigSatisfies" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig as DocsSidebars } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars = {",
                    '    docs: ["introduction"],',
                    "} satisfies DocsSidebars;",
                    "",
                    "export default sidebars;",
                ].join("\n"),
            },
            {
                code: [
                    'import type * as DocsPlugin from "@docusaurus/plugin-content-docs";',
                    "",
                    'export default { docs: ["introduction"] } as DocsPlugin.SidebarsConfig;',
                ].join("\n"),
                errors: [{ messageId: "preferSidebarsConfigSatisfies" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    'import type * as DocsPlugin from "@docusaurus/plugin-content-docs";',
                    "",
                    'export default { docs: ["introduction"] } satisfies DocsPlugin.SidebarsConfig;',
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars = {",
                    '    docs: ["introduction"],',
                    "} satisfies SidebarsConfig;",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'import type { SidebarsConfig as DocsSidebars } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars = {",
                    '    docs: ["introduction"],',
                    "} satisfies DocsSidebars;",
                    "",
                    "export default sidebars;",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'import type * as DocsPlugin from "@docusaurus/plugin-content-docs";',
                    "",
                    'export default { docs: ["introduction"] } satisfies DocsPlugin.SidebarsConfig;',
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.rules.ts",
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    'const sidebars: SidebarsConfig = { docs: ["introduction"] };',
                    "",
                    "export default sidebars;",
                ].join("\n"),
                filename: "src/sidebar-data.ts",
            },
        ],
    }
);
