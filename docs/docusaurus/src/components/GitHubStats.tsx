import Link from "@docusaurus/Link";

import styles from "./GitHubStats.module.css";

interface GitHubStatsProps {
    readonly className?: string;
}

interface LiveBadge {
    readonly alt: string;
    readonly href: string;
    readonly src: string;
}

const liveBadges = [
    {
        alt: "npm license",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/blob/main/LICENSE",
        src: "https://flat.badgen.net/npm/license/eslint-plugin-docusaurus-2?color=purple",
    },
    {
        alt: "npm total downloads",
        href: "https://www.npmjs.com/package/eslint-plugin-docusaurus-2",
        src: "https://flat.badgen.net/npm/dt/eslint-plugin-docusaurus-2?color=pink",
    },
    {
        alt: "latest GitHub release",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/releases",
        src: "https://flat.badgen.net/github/release/Nick2bad4u/eslint-plugin-docusaurus-2?color=cyan",
    },
    {
        alt: "GitHub stars",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/stargazers",
        src: "https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-docusaurus-2?color=yellow",
    },
    {
        alt: "GitHub forks",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/forks",
        src: "https://flat.badgen.net/github/forks/Nick2bad4u/eslint-plugin-docusaurus-2?color=green",
    },
    {
        alt: "GitHub open issues",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/issues",
        src: "https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-docusaurus-2?color=red",
    },
    {
        alt: "Codecov",
        href: "https://app.codecov.io/gh/Nick2bad4u/eslint-plugin-docusaurus-2",
        src: "https://flat.badgen.net/codecov/github/Nick2bad4u/eslint-plugin-docusaurus-2?color=blue",
    },
] as const satisfies readonly LiveBadge[];

const getStyleClassName = (className: string): string =>
    styles[className] ?? "";

/** Displays a row of live GitHub badge stats for the plugin repository. */
export default function GitHubStats({ className = "" }: GitHubStatsProps) {
    const badgeListClassName = [getStyleClassName("liveBadgeList"), className]
        .filter(Boolean)
        .join(" ");

    return (
        <ul className={badgeListClassName}>
            {liveBadges.map((badge) => (
                <li
                    className={getStyleClassName("liveBadgeListItem")}
                    key={badge.src}
                >
                    <Link
                        className={getStyleClassName("liveBadgeAnchor")}
                        href={badge.href}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img
                            alt={badge.alt}
                            className={getStyleClassName("liveBadgeImage")}
                            decoding="async"
                            loading="lazy"
                            src={badge.src}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
