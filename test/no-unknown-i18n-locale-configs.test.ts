/**
 * @packageDocumentation
 * RuleTester coverage for `no-unknown-i18n-locale-configs`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-unknown-i18n-locale-configs",
    getPluginRule("no-unknown-i18n-locale-configs"),
    {
        invalid: [
            {
                code: [
                    "export default {",
                    "    i18n: {",
                    '        defaultLocale: "en",',
                    '        locales: ["en", "fr"],',
                    "        localeConfigs: {",
                    '            en: { url: "https://en.example.com" },',
                    '            de: { url: "https://de.example.com" },',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                errors: [
                    {
                        data: { localeName: "`de`" },
                        messageId: "noUnknownI18nLocaleConfigs",
                    },
                ],
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
        valid: [
            {
                code: [
                    "export default {",
                    "    i18n: {",
                    '        defaultLocale: "en",',
                    '        locales: ["en", "fr"],',
                    "        localeConfigs: {",
                    '            en: { url: "https://en.example.com" },',
                    '            fr: { url: "https://fr.example.com" },',
                    "        },",
                    "    },",
                    "};",
                ].join("\n"),
                filename: "docs/docusaurus/docusaurus.config.ts",
            },
        ],
    }
);
