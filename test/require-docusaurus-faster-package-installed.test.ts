/**
 * @packageDocumentation
 * RuleTester coverage for `require-docusaurus-faster-package-installed`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-docusaurus-faster-package-installed",
    getPluginRule("require-docusaurus-faster-package-installed"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        faster: true,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "requireDocusaurusFasterPackageInstalled" },
                ],
                filename: "temp/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        faster: true,",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
