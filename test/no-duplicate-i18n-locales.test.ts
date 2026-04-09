/**
 * @packageDocumentation
 * RuleTester coverage for `no-duplicate-i18n-locales`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-duplicate-i18n-locales",
    getPluginRule("no-duplicate-i18n-locales"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr", "en"] },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "noDuplicateI18nLocales" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr"] },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const locales = ["en", "fr", "en"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales },',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateI18nLocales",
                        suggestions: [
                            {
                                messageId: "replaceWithDedupedLocales",
                                output: [
                                    'const locales = ["en", "fr", "en"];',
                                    "",
                                    "export default {",
                                    '    i18n: { defaultLocale: "en", locales: ["en", "fr"] },',
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    'const locales = ["en", "fr", "en"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: locales },',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "noDuplicateI18nLocales",
                        suggestions: [
                            {
                                messageId: "replaceWithDedupedLocales",
                                output: [
                                    'const locales = ["en", "fr", "en"];',
                                    "",
                                    "export default {",
                                    '    i18n: { defaultLocale: "en", locales: ["en", "fr"] },',
                                    "};",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr"] },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: getLocales() },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr", getLocale()] },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "en"] },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
