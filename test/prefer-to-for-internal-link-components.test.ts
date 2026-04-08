/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-to-for-internal-link-components`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-to-for-internal-link-components",
    getPluginRule("prefer-to-for-internal-link-components"),
    {
        invalid: [
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function HomePage() {",
                    '    return <Link href="/docs/intro">Docs</Link>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferToForInternalLinkComponent" }],
                filename: "docs/docusaurus/src/pages/index.tsx",
                output: [
                    'import Link from "@docusaurus/Link";',
                    "",
                    "export default function HomePage() {",
                    '    return <Link to="/docs/intro">Docs</Link>;',
                    "}",
                ].join("\n"),
            },
            {
                code: [
                    'import DocsLink from "@docusaurus/Link";',
                    "",
                    "export default function Hero() {",
                    '    return <DocsLink href="/docs/rules/overview">Rules</DocsLink>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferToForInternalLinkComponent" }],
                filename: "docs/docusaurus/src/components/Hero.tsx",
                output: [
                    'import DocsLink from "@docusaurus/Link";',
                    "",
                    "export default function Hero() {",
                    '    return <DocsLink to="/docs/rules/overview">Rules</DocsLink>;',
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
                    "export default function HomePage() {",
                    '    return <Link href="/docs/intro" to="/docs/intro">Docs</Link>;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
        ],
    }
);
