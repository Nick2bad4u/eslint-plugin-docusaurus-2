/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-use-base-url-for-static-assets`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-use-base-url-for-static-assets",
    getPluginRule("prefer-use-base-url-for-static-assets"),
    {
        invalid: [
            {
                code: [
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function HomePage() {",
                    '    return <img src="/img/logo.png" alt="Logo" />;',
                    "}",
                ].join("\n"),
                errors: [
                    {
                        messageId: "preferUseBaseUrlForStaticAssets",
                        suggestions: [
                            {
                                messageId: "wrapWithUseBaseUrl",
                                output: [
                                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                                    "",
                                    "export default function HomePage() {",
                                    '    return <img src={useBaseUrl("/img/logo.png")} alt="Logo" />;',
                                    "}",
                                ].join("\n"),
                            },
                        ],
                    },
                ],
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
            {
                code: [
                    "export default function Hero() {",
                    '    return <img src="/img/hero.png" alt="Hero" />;',
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferUseBaseUrlForStaticAssets" }],
                filename: "docs/docusaurus/src/components/Hero.tsx",
            },
        ],
        valid: [
            {
                code: [
                    'import useBaseUrl from "@docusaurus/useBaseUrl";',
                    "",
                    "export default function HomePage() {",
                    '    return <img src={useBaseUrl("/img/logo.png")} alt="Logo" />;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
            {
                code: [
                    "export default function Hero() {",
                    '    return <img src="https://example.com/logo.png" alt="Logo" />;',
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/Hero.tsx",
            },
        ],
    }
);
