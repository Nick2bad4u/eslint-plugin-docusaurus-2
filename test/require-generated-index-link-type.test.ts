/**
 * @packageDocumentation
 * RuleTester coverage for `require-generated-index-link-type`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-generated-index-link-type",
    getPluginRule("require-generated-index-link-type"),
    {
        invalid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { title: "Guides", description: "Browse the guides." },',
                    '            items: ["intro"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireGeneratedIndexType" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { type: "generated-index", title: "Guides", description: "Browse the guides." },',
                    '            items: ["intro"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            label: "Rules",',
                    '            link: { type: "doc", slug: "/rules", title: "Rules" },',
                    '            items: ["overview"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferGeneratedIndexType" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            label: "Rules",',
                    '            link: { type: "generated-index", slug: "/rules", title: "Rules" },',
                    '            items: ["overview"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { type: "generated-index", title: "Guides", description: "Browse the guides." },',
                    '            items: ["intro"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "Docs",',
                    '            link: { type: "doc", id: "intro" },',
                    '            items: ["intro"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: [
                    'const link = { title: "Rules", description: "Browse rules" };',
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
