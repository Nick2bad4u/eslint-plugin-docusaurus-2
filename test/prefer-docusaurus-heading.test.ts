/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-docusaurus-heading`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();
const testFilename = "test.tsx";

ruleTester.run(
    "prefer-docusaurus-heading",
    getPluginRule("prefer-docusaurus-heading"),
    {
        invalid: [
            {
                code: [
                    'import Heading from "@theme/Heading";',
                    "const view = <h2>Overview</h2>;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferDocusaurusHeading",
                        suggestions: [
                            {
                                messageId: "replaceWithDocusaurusHeading",
                                output: [
                                    'import Heading from "@theme/Heading";',
                                    'const view = <Heading as="h2">Overview</Heading>;',
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: testFilename,
            },
            {
                code: [
                    'import ThemeHeading from "@theme/Heading";',
                    "const view = <h3 />;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferDocusaurusHeading",
                        suggestions: [
                            {
                                messageId: "replaceWithDocusaurusHeading",
                                output: [
                                    'import ThemeHeading from "@theme/Heading";',
                                    'const view = <ThemeHeading as="h3" />;',
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: testFilename,
            },
            {
                code: [
                    'import * as ThemeHeading from "@theme/Heading";',
                    "const view = <h4>Details</h4>;",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferDocusaurusHeading",
                        suggestions: [
                            {
                                messageId: "replaceWithDocusaurusHeading",
                                output: [
                                    'import * as ThemeHeading from "@theme/Heading";',
                                    'const view = <ThemeHeading.default as="h4">Details</ThemeHeading.default>;',
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: testFilename,
            },
            {
                code: "const view = <><h1>One</h1><h2>Two</h2><h3>Three</h3><h4>Four</h4><h5>Five</h5><h6>Six</h6></>;",
                errors: [
                    { messageId: "preferDocusaurusHeading" },
                    { messageId: "preferDocusaurusHeading" },
                    { messageId: "preferDocusaurusHeading" },
                    { messageId: "preferDocusaurusHeading" },
                    { messageId: "preferDocusaurusHeading" },
                    { messageId: "preferDocusaurusHeading" },
                ],
                filename: testFilename,
            },
            {
                code: [
                    'import Heading from "@theme/Heading";',
                    "function View(Heading: unknown) {",
                    "    return <h2>Overview</h2>;",
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferDocusaurusHeading" }],
                filename: testFilename,
            },
            {
                code: [
                    'import Heading from "@theme/Heading";',
                    'const view = <h2 as="h3">Overview</h2>;',
                ].join("\n"),
                errors: [{ messageId: "preferDocusaurusHeading" }],
                filename: testFilename,
            },
        ],
        valid: [
            {
                code: '<Heading as="h1">Heading</Heading>',
                filename: testFilename,
            },
            {
                code: '<Theme.Heading as="h2">Heading</Theme.Heading>',
                filename: testFilename,
            },
            {
                code: "<section><p>Not a heading</p></section>",
                filename: testFilename,
            },
        ],
    }
);
