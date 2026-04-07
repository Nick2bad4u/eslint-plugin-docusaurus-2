/**
 * @packageDocumentation
 * RuleTester coverage for `prefer-css-modules-in-site-src`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "prefer-css-modules-in-site-src",
    getPluginRule("prefer-css-modules-in-site-src"),
    {
        invalid: [
            {
                code: [
                    'import "./Hero.css";',
                    "",
                    "export default function Hero() {",
                    "    return null;",
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferCssModules" }],
                filename: "docs/docusaurus/src/components/Hero.tsx",
            },
            {
                code: [
                    'import "@site/src/css/custom.css";',
                    "",
                    "export default function HomePage() {",
                    "    return null;",
                    "}",
                ].join("\n"),
                errors: [{ messageId: "preferCssModules" }],
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
        ],
        valid: [
            {
                code: [
                    'import styles from "./Hero.module.css";',
                    "",
                    "export default function Hero() {",
                    "    return <div className={styles.hero}>Hero</div>;",
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/Hero.tsx",
            },
            {
                code: 'import "../css/custom.css";',
                filename: "docs/docusaurus/src/js/modernEnhancements.ts",
            },
        ],
    }
);
