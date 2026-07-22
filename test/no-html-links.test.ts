/**
 * @packageDocumentation
 * RuleTester coverage for `no-html-links`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";

ruleTester.run("no-html-links", getPluginRule("no-html-links"), {
    invalid: [
        {
            code: [
                'import Link from "@docusaurus/Link";',
                'const view = <a href="/docs/intro">Intro</a>;',
            ].join("\n"),
            errors: [
                {
                    messageId: "preferDocusaurusLink",
                    suggestions: [
                        {
                            messageId: "replaceWithDocusaurusLink",
                            output: [
                                'import Link from "@docusaurus/Link";',
                                'const view = <Link to="/docs/intro">Intro</Link>;',
                            ].join("\n"),
                        },
                    ],
                },
            ],
            filename: testFilename,
        },
        {
            code: [
                'import DocsLink from "@docusaurus/Link";',
                'const view = <a href="mailto:docs@example.com">Email</a>;',
            ].join("\n"),
            errors: [
                {
                    messageId: "preferDocusaurusLink",
                    suggestions: [
                        {
                            messageId: "replaceWithDocusaurusLink",
                            output: [
                                'import DocsLink from "@docusaurus/Link";',
                                'const view = <DocsLink to="mailto:docs@example.com">Email</DocsLink>;',
                            ].join("\n"),
                        },
                    ],
                },
            ],
            filename: testFilename,
        },
        {
            code: [
                'import * as DocusaurusLink from "@docusaurus/Link";',
                'const view = <a href="/docs">Docs</a>;',
            ].join("\n"),
            errors: [
                {
                    messageId: "preferDocusaurusLink",
                    suggestions: [
                        {
                            messageId: "replaceWithDocusaurusLink",
                            output: [
                                'import * as DocusaurusLink from "@docusaurus/Link";',
                                'const view = <DocusaurusLink.default to="/docs">Docs</DocusaurusLink.default>;',
                            ].join("\n"),
                        },
                    ],
                },
            ],
            filename: testFilename,
        },
        {
            code: 'const view = <a href="/docs">Docs</a>;',
            errors: [{ messageId: "preferDocusaurusLink" }],
            filename: testFilename,
        },
        {
            code: [
                'import Link from "@docusaurus/Link";',
                "function View(Link: unknown) {",
                '    return <a href="/docs">Docs</a>;',
                "}",
            ].join("\n"),
            errors: [{ messageId: "preferDocusaurusLink" }],
            filename: testFilename,
        },
        {
            code: [
                'import Link from "@docusaurus/Link";',
                'const view = <a href="/docs" to="/other">Docs</a>;',
            ].join("\n"),
            errors: [{ messageId: "preferDocusaurusLink" }],
            filename: testFilename,
        },
        {
            code: '<a href="www.example.com/docs">Docs</a>;',
            errors: [{ messageId: "preferDocusaurusLink" }],
            filename: testFilename,
            options: [{ ignoreFullyResolved: true }],
        },
    ],
    valid: [
        {
            code: '<Link to="/docs">Docs</Link>',
            filename: testFilename,
        },
        {
            code: '<Navigation.a href="/docs">Docs</Navigation.a>',
            filename: testFilename,
        },
        {
            code: '<a href="https://example.com/docs">Docs</a>',
            filename: testFilename,
            options: [{ ignoreFullyResolved: true }],
        },
        {
            code: "<a href={`mailto:docs@example.com`}>Email</a>",
            filename: testFilename,
            options: [{ ignoreFullyResolved: true }],
        },
        {
            code: '<a href={"tel:123456789"}>Call</a>',
            filename: testFilename,
            options: [{ ignoreFullyResolved: true }],
        },
    ],
});
