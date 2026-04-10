/**
 * @packageDocumentation
 * RuleTester coverage for `require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads",
    getPluginRule(
        "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads"
    ),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        faster: {",
                    "            ssgWorkerThreads: true,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreads",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    future: {",
                    "        faster: {",
                    "            ssgWorkerThreads: true,",
                    "        },",
                    "        v4: { removeLegacyPostBuildHeadAttribute: true }",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        v4: { removeLegacyPostBuildHeadAttribute: false },",
                    "        experimental_faster: { ssgWorkerThreads: true },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreads",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    future: {",
                    "        v4: { removeLegacyPostBuildHeadAttribute: true },",
                    "        experimental_faster: { ssgWorkerThreads: true },",
                    "    },",
                    "};",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        v4: { removeLegacyPostBuildHeadAttribute: true },",
                    "        faster: { ssgWorkerThreads: true },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
