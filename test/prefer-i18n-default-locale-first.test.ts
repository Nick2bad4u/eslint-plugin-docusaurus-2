/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-i18n-default-locale-first`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-i18n-default-locale-first",
    getPluginRule("prefer-i18n-default-locale-first"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr", "en"] },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferI18nDefaultLocaleFirst" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr"] },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr", "de", "en"] },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "preferI18nDefaultLocaleFirst" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en", "fr", "de"] },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const locales = ["fr", "en"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales },',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferI18nDefaultLocaleFirst",
                        suggestions: [
                            {
                                messageId: "moveDefaultLocaleFirst",
                                output: [
                                    'const locales = ["fr", "en"];',
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
                    'const locales = ["fr", "en", "de"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: locales },',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferI18nDefaultLocaleFirst",
                        suggestions: [
                            {
                                messageId: "moveDefaultLocaleFirst",
                                output: [
                                    'const locales = ["fr", "en", "de"];',
                                    "",
                                    "export default {",
                                    '    i18n: { defaultLocale: "en", locales: ["en", "fr", "de"] },',
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
                    '    i18n: { defaultLocale: "en" },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr"] },',
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
                    '    i18n: { defaultLocale: getDefaultLocale(), locales: ["fr", "en"] },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr", "en"] },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
