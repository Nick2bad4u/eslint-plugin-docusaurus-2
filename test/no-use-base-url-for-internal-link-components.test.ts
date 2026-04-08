/**
 * @packageDocumentation
 * RuleTester coverage for `no-use-base-url-for-internal-link-components`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-use-base-url-for-internal-link-components",
    getPluginRule("no-use-base-url-for-internal-link-components"),
    {
        invalid: [
            {
                code: [
                    'import Link from "@docusaurus/Link";',
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function HomePage() {",
                    '    return <Link to={useBaseUrl("/docs/intro")}>Docs</Link>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "noUseBaseUrlForInternalLinkComponent" }],
                filename: "docs/docusaurus/src/pages/index.tsx",
                output: [
                    'import Link from "@docusaurus/Link";',
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function HomePage() {",
                    '    return <Link to="/docs/intro">Docs</Link>;',
                    "}",
                ].join("\n"),
            },
            {
                code: [
                    'import DocsLink from "@docusaurus/Link";',
                    'import baseUrlFor from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function Hero() {",
                    '    return <DocsLink href={baseUrlFor("/docs/rules/overview")}>Rules</DocsLink>;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "noUseBaseUrlForInternalLinkComponent" }],
                filename: "docs/docusaurus/src/components/Hero.tsx",
                output: [
                    'import DocsLink from "@docusaurus/Link";',
                    'import baseUrlFor from "@docusaurus/useBaseUrl";',
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
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
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
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function Hero() {",
                    '    return <Link href={useBaseUrl("https://example.com/logo.png")}>External</Link>;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/Hero.tsx",
            },
        ],
    }
);
