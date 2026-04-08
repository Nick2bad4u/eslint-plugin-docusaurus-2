/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-href-for-external-links`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-href-for-external-links",
    getPluginRule("prefer-href-for-external-links"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    label: "GitHub",',
                    '                    to: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHrefForExternalLinks" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    label: "GitHub",',
                    '                    href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Project",',
                    "                    items: [",
                    "                        {",
                    '                            label: "NPM",',
                    '                            "to": "https://www.npmjs.com/package/eslint-plugin-docusaurus-2",',
                    "                        },",
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferHrefForExternalLinks" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    themeConfig: {",
                    "        footer: {",
                    "            links: [",
                    "                {",
                    '                    title: "Project",',
                    "                    items: [",
                    "                        {",
                    '                            label: "NPM",',
                    '                            "href": "https://www.npmjs.com/package/eslint-plugin-docusaurus-2",',
                    "                        },",
                    "                    ],",
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    themeConfig: {",
                    "        navbar: {",
                    "            items: [",
                    "                {",
                    '                    label: "GitHub",',
                    '                    href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2",',
                    "                },",
                    "                {",
                    '                    label: "Docs",',
                    '                    to: "/docs/intro",',
                    "                },",
                    "            ],",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: 'export default { to: "https://example.com" };',
                filename: "src/config.ts",
            },
        ],
    }
);
