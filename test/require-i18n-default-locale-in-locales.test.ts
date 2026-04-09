/**
 * @packageDocumentation
 * RuleTester coverage for `require-i18n-default-locale-in-locales`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "require-i18n-default-locale-in-locales",
    getPluginRule("require-i18n-default-locale-in-locales"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    i18n: {",
                    '        locales: ["en"],',
                    "    },",
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireI18nDefaultLocale" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en" },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireI18nDefaultLocaleInLocales" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["en"] },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr"] },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireI18nDefaultLocaleInLocales" }],
                filename: "docs/docusaurus/docusaurus.config.ts",
                output: [
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales: ["fr", "en"] },',
                    "};",
                ].join("\n"),
            },
            {
                code: [
                    'const locales = ["fr"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales },',
                    "};",
                ].join("\n"),
                errors: [
                    {
                        messageId: "requireI18nDefaultLocaleInLocales",
                        suggestions: [
                            {
                                messageId: "addDefaultLocaleToLocales",
                                output: [
                                    'const locales = ["fr"];',
                                    "",
                                    "export default {",
                                    '    i18n: { defaultLocale: "en", locales: ["fr", "en"] },',
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
                    "export default {",
                    '    i18n: { defaultLocale: "", locales: ["en"] },',
                    "};",
                ].join("\n"),
                errors: [{ messageId: "requireI18nDefaultLocale" }],
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
                    'const locales = ["en", "fr"];',
                    "",
                    "export default {",
                    '    i18n: { defaultLocale: "en", locales },',
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
                    '    i18n: { defaultLocale: getDefaultLocale(), locales: ["en"] },',
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
            {
                code: [
                    "export default {",
                    '    i18n: { locales: ["fr"] },',
                    "};",
                ].join("\n"),
                filename: "src/config.ts",
            },
        ],
    }
);
