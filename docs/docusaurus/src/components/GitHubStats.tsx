import Link from "@docusaurus/Link";

import styles from "./GitHubStats.module.css";

type GitHubStatsProps = {
    readonly className?: string;
};

type LiveBadge = {
    readonly alt: string;
    readonly href: string;
    readonly src: string;
};

const liveBadges = [
    {
        alt: "GitHub license.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/blob/main/LICENSE",
        src: "https://flat.badgen.net/github/license/Nick2bad4u/eslint-plugin-docusaurus-2?color=purple",
    },
    {
        alt: "GitHub stars.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/stargazers",
        src: "https://flat.badgen.net/github/stars/Nick2bad4u/eslint-plugin-docusaurus-2?color=yellow",
    },
    {
        alt: "GitHub open issues.",
        href: "https://github.com/Nick2bad4u/eslint-plugin-docusaurus-2/issues",
        src: "https://flat.badgen.net/github/open-issues/Nick2bad4u/eslint-plugin-docusaurus-2?color=red",
    },
] as const satisfies readonly LiveBadge[];

const getStyleClassName = (className: string): string =>
    styles[className] ?? "";

export default function GitHubStats({ className = "" }: GitHubStatsProps) {
    const badgeListClassName = [getStyleClassName("liveBadgeList"), className]
        .filter(Boolean)
        .join(" ");

    return (
        <ul className={badgeListClassName}>
            {liveBadges.map((badge) => (
                <li
                    key={badge.src}
                    className={getStyleClassName("liveBadgeListItem")}
                >
                    <Link
                        className={getStyleClassName("liveBadgeAnchor")}
                        href={badge.href}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            alt={badge.alt}
                            className={getStyleClassName("liveBadgeImage")}
                            src={badge.src}
                            loading="lazy"
                            decoding="async"
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
}
