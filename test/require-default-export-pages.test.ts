/**
 * @packageDocumentation
 * RuleTester coverage for `require-default-export-pages`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-default-export-pages",
    getPluginRule("require-default-export-pages"),
    {
        invalid: [
            {
                code: [
                    "export const metadata = {",
                    '    title: "Support",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "missingDefaultExport" }],
                filename: "docs/docusaurus/src/pages/support.js",
            },
            {
                code: [
                    "export default {",
                    '    route: "/support",',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "invalidDefaultExport" }],
                filename: "docs/docusaurus/src/pages/support/index.tsx",
            },
        ],
        valid: [
            {
                code: [
                    "export default function SupportPage() {",
                    "    return null;",
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/pages/support.jsx",
            },
            {
                code: ["export const helper = () => null;"].join("\n"),
                filename: "docs/docusaurus/src/pages/_helpers.tsx",
            },
            {
                code: ["export const helper = () => null;"].join("\n"),
                filename: "docs/docusaurus/src/pages/support/Widget.test.tsx",
            },
        ],
    }
);
