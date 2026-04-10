/**
 * @packageDocumentation
 * RuleTester coverage for `no-deprecated-future-experimental-faster`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-deprecated-future-experimental-faster",
    getPluginRule("no-deprecated-future-experimental-faster"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        experimental_faster: true,",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedFutureExperimentalFaster" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    future: {",
                    "        faster: true,",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        faster: true,",
                    "        experimental_faster: { rspackBundler: true },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDeprecatedFutureExperimentalFaster" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
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
