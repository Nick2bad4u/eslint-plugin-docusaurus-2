/**
 * @packageDocumentation
 * RuleTester coverage for `require-pages-plugin-excludes`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-pages-plugin-excludes",
    getPluginRule("require-pages-plugin-excludes"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {",
                    '                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],',
                    '                    path: "src/pages",',
                    "                },",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePagesPluginExcludes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {",
                    '                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],',
                    '                    path: "src/pages", exclude: ["**/*.d.ts", "**/*.d.tsx", "**/__tests__/**", "**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],',
                    "                },",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {",
                    '                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],',
                    '                    exclude: ["**/*.d.ts"],',
                    "                },",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requirePagesPluginExcludes" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {",
                    '                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],',
                    '                    exclude: ["**/*.d.ts", "**/*.d.tsx", "**/__tests__/**", "**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],',
                    "                },",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {",
                    '                    include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],',
                    '                    exclude: ["**/*.d.ts", "**/*.d.tsx", "**/__tests__/**", "**/*.test.{js,jsx,ts,tsx}", "**/*.spec.{js,jsx,ts,tsx}"],',
                    "                },",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    "    presets: [",
                    "        [",
                    '            "classic",',
                    "            {",
                    "                pages: {},",
                    "            },",
                    "        ],",
                    "    ],",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
