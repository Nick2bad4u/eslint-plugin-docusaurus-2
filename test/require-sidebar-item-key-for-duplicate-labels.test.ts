/**
 * @packageDocumentation
 * RuleTester coverage for `require-sidebar-item-key-for-duplicate-labels`.
 */

import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-sidebar-item-key-for-duplicate-labels",
    getPluginRule("require-sidebar-item-key-for-duplicate-labels"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            items: ["intro"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            items: ["reference"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: { label: "API" },
                        messageId: "requireSidebarItemKeyForDuplicateLabels",
                    },
                    {
                        data: { label: "API" },
                        messageId: "requireSidebarItemKeyForDuplicateLabels",
                    },
                ],
                filename: "sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    "            items: [",
                    "                {",
                    '                    type: "category",',
                    '                    label: "API",',
                    '                    items: ["a"],',
                    "                },",
                    "                {",
                    '                    type: "category",',
                    '                    label: "API",',
                    '                    items: ["b"],',
                    "                },",
                    "            ],",
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: { label: "API" },
                        messageId: "requireSidebarItemKeyForDuplicateLabels",
                    },
                    {
                        data: { label: "API" },
                        messageId: "requireSidebarItemKeyForDuplicateLabels",
                    },
                ],
                filename: "sidebars.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            key: "api-one",',
                    '            label: "API",',
                    '            items: ["intro"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            key: "api-two",',
                    '            label: "API",',
                    '            items: ["reference"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "sidebars.ts",
            },
            {
                code: [
                    'const getLabel = () => "API";',
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    "            label: getLabel(),",
                    '            items: ["intro"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            items: ["reference"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "sidebars.ts",
            },
            {
                code: [
                    "export default {",
                    "    docs: [",
                    "        {",
                    '            type: "category",',
                    '            label: "API",',
                    '            items: ["intro"],',
                    "        },",
                    "        {",
                    '            type: "category",',
                    '            label: "Guides",',
                    '            items: ["reference"],',
                    "        },",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "sidebars.ts",
            },
        ],
    }
);
