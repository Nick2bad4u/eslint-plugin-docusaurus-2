/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-future-experimental-storage`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-deprecated-future-experimental-storage",
    getPluginRule("no-deprecated-future-experimental-storage"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    '        experimental_storage: { type: "localStorage", namespace: true },',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noDeprecatedFutureExperimentalStorage" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    storage: { type: "localStorage", namespace: true },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    storage: { type: "localStorage", namespace: false },',
                    "    future: {",
                    '        experimental_storage: { type: "localStorage", namespace: true },',
                    "        v4: true,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    { messageId: "noDeprecatedFutureExperimentalStorage" },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    storage: { type: "localStorage", namespace: true },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
