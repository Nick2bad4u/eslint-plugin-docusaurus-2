/**
 * @packageDocumentation
 * RuleTester coverage for `no-untranslated-text`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";
const translateImport = 'import Translate from "@docusaurus/Translate";';
const withTranslateImport = (code: string): string =>
    `${translateImport}\nconst view = ${code};`;

const upstreamStaticTranslateCases = [
    "<Translate>text</Translate>",
    "<Translate> text </Translate>",
    '<Translate>"text"</Translate>',
    "<Translate>'text'</Translate>",
    "<Translate>`text`</Translate>",
    '<Translate>{"text"}</Translate>',
    "<Translate>{'text'}</Translate>",
    "<Translate>{`text`}</Translate>",
] as const;

const upstreamIgnoredValidCases = [
    "<Component>·</Component>",
    "<Component>· </Component>",
    "<Component> · </Component>",
    "<Component>· ·</Component>",
    "<Component>· — ×</Component>",
    '<Component>{"·"}</Component>',
    "<Component>{'·'}</Component>",
    "<Component>{`·`}</Component>",
] as const;

const upstreamInvalidTextCases = [
    "<Component> text </Component>",
    '<Component>"text"</Component>',
    "<Component>'text'</Component>",
    "<Component>`text`</Component>",
    '<Component>{"text"}</Component>',
    "<Component>{'text'}</Component>",
    "<Component>{`text`}</Component>",
    "<>text</>",
] as const;

const upstreamIgnoredInvalidCases = [
    "<Component>··</Component>",
    "<Component> ·· </Component>",
    '<Component>"·"</Component>',
    "<Component>'·'</Component>",
    "<Component>`·`</Component>",
] as const;

ruleTester.run("no-untranslated-text", getPluginRule("no-untranslated-text"), {
    invalid: [
        {
            code: "<Component>text</Component>",
            errors: [
                {
                    column: 12,
                    endColumn: 16,
                    endLine: 1,
                    line: 1,
                    messageId: "wrapUntranslatedText",
                },
            ],
            filename: testFilename,
        },
        ...upstreamInvalidTextCases.map((code) => ({
            code,
            errors: [{ messageId: "wrapUntranslatedText" as const }],
            filename: testFilename,
        })),
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
        ...upstreamIgnoredInvalidCases.map((code) => ({
            code,
            errors: [{ messageId: "wrapUntranslatedText" as const }],
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
        })),
        {
            code: "<Component>Docusaurus</Component>",
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
            options: [{ ignoredStrings: ["Docu", "saurus"] }],
        },
        {
            code: "<Translate>Not imported</Translate>",
            errors: [{ messageId: "wrapUntranslatedText" }],
            filename: testFilename,
        },
        {
            code: "<I18n:Translate>Namespaced text</I18n:Translate>",
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
        ...upstreamStaticTranslateCases.map((code) => ({
            code: withTranslateImport(code),
            filename: testFilename,
        })),
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
        ...upstreamIgnoredValidCases.map((code) => ({
            code,
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
        })),
        {
            code: "<Component>Docusaurus</Component>",
            filename: testFilename,
            options: [{ ignoredStrings: ["Docusaurus"] }],
        },
        {
            code: "<> {' · '} </>",
            filename: testFilename,
            options: [{ ignoredStrings: ["·"] }],
        },
        {
            code: "<><Component>{value}</Component>   </>",
            filename: testFilename,
        },
        {
            code: "<Component> {value} </Component>",
            filename: testFilename,
        },
        {
            code: [
                translateImport,
                'const view = <Translate id="homepage.title" description="Homepage title">Welcome home</Translate>;',
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: [
                translateImport,
                "const view = <Translate values={{ firstName: 'Sébastien' }}>{'Welcome, {firstName}! How are you?'}</Translate>;",
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: [
                translateImport,
                "const view = <Translate>{'This'} is {`valid`}</Translate>;",
            ].join("\n"),
            filename: testFilename,
        },
        {
            code: "translate({ message: `My page meta title` }); translate({ otherProp: metaTitle });",
            filename: testFilename,
        },
        {
            code: "<Component>&#8203;</Component>",
            filename: testFilename,
            options: [{ ignoredStrings: ["​"] }],
        },
    ],
});
