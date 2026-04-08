/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-href-for-external-link-components`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-href-for-external-link-components",
    getPluginRule("prefer-href-for-external-link-components"),
    {
        invalid: [
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function GitHubLink() {",
                    '    return <Link to="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferHrefForExternalLinkComponent" }],
                filename: "docs/docusaurus/src/components/GitHubLink.tsx",
                output: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function GitHubLink() {",
                    '    return <Link href="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;',
                    "}",
                ].join("\n"),
            },
            {
                code: [
                    'import DocsLink from "@docusaurus/Link";',
                    "",
                    "export default function ContactLink() {",
                    '    return <DocsLink to={"mailto:hello@example.com"}>Email</DocsLink>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferHrefForExternalLinkComponent" }],
                filename: "docs/docusaurus/src/components/ContactLink.tsx",
                output: [
                    'import DocsLink from "@docusaurus/Link";',
                    "",
                    "export default function ContactLink() {",
                    '    return <DocsLink href={"mailto:hello@example.com"}>Email</DocsLink>;',
                    "}",
                ].join("\n"),
            },
        ],
        valid: [
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function HomePage() {",
                    '    return <Link to="/docs/intro">Docs</Link>;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function GitHubLink() {",
                    '    return <Link href="https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2">GitHub</Link>;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/GitHubLink.tsx",
            },
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "const destination = getDestination();",
                    "",
                    "export default function DynamicLink() {",
                    "    return <Link to={destination}>Destination</Link>;",
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/DynamicLink.tsx",
            },
        ],
    }
);
