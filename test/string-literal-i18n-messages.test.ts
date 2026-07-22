/**
 * @packageDocumentation
 * RuleTester coverage for `string-literal-i18n-messages`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";
const translateImports =
    'import Translate, { translate } from "@docusaurus/Translate";';
const dynamicNameInterpolation = ["$", "{name}"].join("");
const dynamicTextInterpolation = ["$", "{text}"].join("");
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

ruleTester.run(
    "string-literal-i18n-messages",
    getPluginRule("string-literal-i18n-messages"),
    {
        invalid: [
            {
                code: [
                    'import Translate from "@docusaurus/Translate";',
                    "const view = <Translate>{text}</Translate>;",
                ].join("\n"),
                errors: [
                    {
                        column: 25,
                        endColumn: 31,
                        endLine: 2,
                        line: 2,
                        messageId: "requireStaticMessageChild",
                        suggestions: [],
                    },
                ],
                filename: testFilename,
            },
            {
                code: [
                    'import Translate from "@docusaurus/Translate";',
                    "const view = <Translate>Hi {text} my friend</Translate>;",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import Translate from "@docusaurus/Translate";',
                    "const view = <Translate> {text} </Translate>;",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import Translate from "@docusaurus/Translate";',
                    "const view = <Translate>`{text}`</Translate>;",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import Translate from "@docusaurus/Translate";',
                    `const view = <Translate>{\`${dynamicTextInterpolation}\`}</Translate>;`,
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import T from "@docusaurus/Translate";',
                    "const view = <T>Hello {name}, welcome.</T>;",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import * as I18n from "@docusaurus/Translate";',
                    "const view = <I18n.default><strong>Nested</strong></I18n.default>;",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageChild" }],
                filename: testFilename,
            },
            {
                code: [
                    'import { translate as t } from "@docusaurus/Translate";',
                    "const title = t({ message: metaTitle });",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageArgument" }],
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "const title = translate({ ['message']: dynamicText });",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageArgument" }],
                filename: testFilename,
            },
            {
                code: [
                    'import * as I18n from "@docusaurus/Translate";',
                    `const title = I18n.translate({ message: \`Hello ${dynamicNameInterpolation}\` });`,
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageArgument" }],
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "const title = translate(metaTitle);",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageArgument" }],
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "const title = translate();",
                ].join("\n"),
                errors: [{ messageId: "requireStaticMessageArgument" }],
                filename: testFilename,
            },
        ],
        valid: [
            ...upstreamStaticTranslateCases.map((jsx) => ({
                code: `${translateImports}\nconst view = ${jsx};`,
                filename: testFilename,
            })),
            {
                code: [
                    'import Translate, { translate } from "@docusaurus/Translate";',
                    "const view = <Translate>{'Welcome, {name}!'}</Translate>;",
                    "const title = translate({ message: `My page title` });",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    'import * as I18n from "@docusaurus/Translate";',
                    "const view = <I18n.default>Hardcoded text</I18n.default>;",
                    "const title = I18n.translate({ message: 'Hardcoded title' });",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "const title = translate({ otherProp: metaTitle });",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    translateImports,
                    'const view = <Translate id="homepage.title" description="Homepage title">Welcome home</Translate>;',
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    translateImports,
                    "const view = <Translate values={{ firstName: 'Sébastien' }}>{'Welcome, {firstName}! How are you?'}</Translate>;",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    translateImports,
                    "const view = <Translate>{'This'} is {`valid`}</Translate>;",
                    "const title = translate({ message: 'The logo of site {siteName}' }, { siteName: 'Docusaurus' });",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "const message = 'message';",
                    "const title = translate({ [message]: dynamicText });",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: "const view = <Translate>{dynamicText}</Translate>; const title = translate({ message: dynamicText });",
                filename: testFilename,
            },
            {
                code: "const view = <I18n:Translate>{dynamicText}</I18n:Translate>;",
                filename: testFilename,
            },
            {
                code: [
                    'import Translate, { translate } from "@docusaurus/Translate";',
                    "function View(Translate: unknown, translate: (value: unknown) => unknown) {",
                    "    return <Translate>{dynamicText}</Translate>;",
                    "}",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    'import { translate } from "@docusaurus/Translate";',
                    "function getTitle(translate: (value: unknown) => unknown) {",
                    "    return translate({ message: dynamicText });",
                    "}",
                ].join("\n"),
                filename: testFilename,
            },
            {
                code: [
                    'import * as I18n from "@docusaurus/Translate";',
                    "function getTitle(I18n: { translate: (value: unknown) => unknown }) {",
                    "    return I18n.translate({ message: dynamicText });",
                    "}",
                ].join("\n"),
                filename: testFilename,
            },
        ],
    }
);
