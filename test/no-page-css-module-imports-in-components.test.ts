/**
 * @packageDocumentation
 * RuleTester coverage for `no-page-css-module-imports-in-components`.
 */
import { createRuleTester, getPluginRule } from "./_internal/ruleTester";

const ruleTester = createRuleTester();

ruleTester.run(
    "no-page-css-module-imports-in-components",
    getPluginRule("no-page-css-module-imports-in-components"),
    {
        invalid: [
            {
                code: [
                    'import styles from "../pages/index.module.css";',
                    "",
                    "export default function GitHubStats() {",
                    "    return <div className={styles.heroLiveBadges}>Stats</div>;",
                    "}",
                ].join("\n"),
                errors: [{ messageId: "noPageCssModuleImportsInComponents" }],
                filename: "docs/docusaurus/src/components/GitHubStats.tsx",
            },
            {
                code: [
                    'import styles from "@site/src/pages/landing.module.scss";',
                    "",
                    "export default function HeroBadge() {",
                    "    return <span className={styles.badge}>Badge</span>;",
                    "}",
                ].join("\n"),
                errors: [{ messageId: "noPageCssModuleImportsInComponents" }],
                filename: "docs/docusaurus/src/components/HeroBadge.tsx",
            },
        ],
        valid: [
            {
                code: [
                    'import styles from "./GitHubStats.module.css";',
                    "",
                    "export default function GitHubStats() {",
                    "    return <div className={styles.liveBadgeList}>Stats</div>;",
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/components/GitHubStats.tsx",
            },
            {
                code: [
                    'import styles from "./index.module.css";',
                    "",
                    "export default function HomePage() {",
                    "    return <main className={styles.heroBanner}>Home</main>;",
                    "}",
                ].join("\n"),
                filename: "docs/docusaurus/src/pages/index.tsx",
            },
        ],
    }
);
