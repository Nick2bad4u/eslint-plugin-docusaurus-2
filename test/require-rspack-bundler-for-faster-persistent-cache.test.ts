/**
 * @packageDocumentation
 * RuleTester coverage for `require-rspack-bundler-for-faster-persistent-cache`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-rspack-bundler-for-faster-persistent-cache",
    getPluginRule("require-rspack-bundler-for-faster-persistent-cache"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        faster: {",
                    "            rspackPersistentCache: true,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireRspackBundlerForFasterPersistentCache",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    future: {",
                    "        faster: {",
                    "            rspackPersistentCache: true,",
                    "            rspackBundler: true",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    "    future: {",
                    "        experimental_faster: {",
                    "            rspackPersistentCache: true,",
                    "            rspackBundler: false,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId:
                            "requireRspackBundlerForFasterPersistentCache",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    "    future: {",
                    "        experimental_faster: {",
                    "            rspackPersistentCache: true,",
                    "            rspackBundler: true,",
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
                    "    future: {",
                    "        faster: {",
                    "            rspackBundler: true,",
                    "            rspackPersistentCache: true,",
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
