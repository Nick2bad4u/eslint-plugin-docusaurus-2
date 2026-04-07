/**
 * @packageDocumentation
 * RuleTester coverage for `require-doc-sidebar-link-type`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-doc-sidebar-link-type",
    getPluginRule("require-doc-sidebar-link-type"),
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
                    '            link: { id: "introduction" },',
                    '            items: ["introduction"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireDocLinkType" }],
                filename: "docs/docusaurus/sidebars.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            link: { type: "doc", id: "introduction" },',
                    '            items: ["introduction"],',
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
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    '            link: { type: "generated-index", id: "introduction" },',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferDocLinkType" }],
                filename: "docs/docusaurus/sidebars.rules.ts",
                output: [
                    'import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";',
                    "",
                    "const sidebars: SidebarsConfig = {",
                    "    docs: [",
                    "        {",
                    '            label: "Guides",',
                    '            items: ["introduction"],',
                    '            link: { type: "doc", id: "introduction" },',
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
                    '            link: { type: "doc", id: "introduction" },',
                    '            items: ["introduction"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            link: { type: "generated-index", title: "API" },',
                    '            items: ["api/index"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/sidebars.ts",
            },
            {
                code: ['const link = { id: "introduction" };'].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
