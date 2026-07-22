/**
 * @packageDocumentation
 * RuleTester coverage for `string-literal-i18n-messages`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";

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
                    'import * as I18n from "@docusaurus/Translate";',
                    // eslint-disable-next-line no-template-curly-in-string -- The rule must reject a dynamic message template.
                    "const title = I18n.translate({ message: `Hello ${name}` });",
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
                code: "const view = <Translate>{dynamicText}</Translate>; const title = translate({ message: dynamicText });",
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
        ],
    }
);
