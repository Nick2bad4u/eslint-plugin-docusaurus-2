/**
 * @packageDocumentation
 * RuleTester coverage for `no-untranslated-text`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";

ruleTester.run("no-untranslated-text", getPluginRule("no-untranslated-text"), {
    invalid: [
        {
            code: "<Component>text</Component>",
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
        },
        {
            code: '<><Component>{"first"}</Component><Component>{`second`}</Component></>',
            errors: [
                { messageId: "wrapUntranslatedText" },
                { messageId: "wrapUntranslatedText" },
            ],
            filename: testFilename,
        },
        {
            code: "<Component>· — ×</Component>",
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
            options: [{ ignoredStrings: ["·", "—"] }],
        },
        {
            code: "<Translate>Not imported</Translate>",
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
        },
        {
            code: [
                'import Translate from "@docusaurus/Translate";',
                "function View(Translate: unknown) {",
                "    return <Translate>Shadowed</Translate>;",
                "}",
            ].join("\n"),
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
        },
        {
            code: "<div>first <span /> second</div>",
            errors: [
                { messageId: "wrapUntranslatedText" },
                { messageId: "wrapUntranslatedText" },
            ],
            filename: testFilename,
        },
    ],
    valid: [
        {
            code: [
                'import Translate from "@docusaurus/Translate";',
                "const view = <Translate><strong>Translated text</strong></Translate>;",
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: [
                'import { default as T } from "@docusaurus/Translate";',
                "const view = <T>Translated text</T>;",
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: [
                'import * as I18n from "@docusaurus/Translate";',
                "const view = <I18n.default>Translated text</I18n.default>;",
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: "<Component>· — ×</Component>",
            filename: testFilename,
            options: [
                {
                    ignoredStrings: [
                        "·",
                        "—",
                        "×",
                    ],
                },
            ],
        },
        {
            code: "<><Component>{value}</Component>   </>",
            filename: testFilename,
        },
        {
            code: "<Component>&#8203;</Component>",
            filename: testFilename,
            options: [{ ignoredStrings: ["​"] }],
        },
    ],
});
