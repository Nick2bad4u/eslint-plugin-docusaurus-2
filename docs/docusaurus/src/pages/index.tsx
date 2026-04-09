import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import GitHubStats from "../components/GitHubStats";
import styles from "./index.module.css";

type HomeCard = {
    readonly description: string;
    readonly icon: string;
    readonly title: string;
    readonly to: string;
};

type HeroBadge = {
    readonly description: string;
    readonly icon: string;
    readonly label: string;
};

type HeroStat = {
    readonly description: string;
    readonly title: string;
};

const heroBadges = [
    {
        description:
            "Deployment, validation, navbar, footer, PWA, and themeConfig rules live together in one focused plugin.",
        icon: "⚙️",
        label: "Config-first",
    },
    {
        description:
            "Category schemas, generated-index/doc link contracts, and duplicate doc assignment checks stay explicit.",
        icon: "🧭",
        label: "Sidebar-safe",
    },
    {
        description:
            "Pages, CSS, static assets, and component-level Docusaurus link semantics are covered when you want them.",
        icon: "🎨",
        label: "Site-aware",
    },
] as const satisfies readonly HeroBadge[];

const heroStats = [
    {
        description:
            "Focused, Docusaurus-specific checks instead of generic noise.",
        title: "37 stable rules",
    },
    {
        description:
            "From minimal through focused config enforcement to the broader site-wide tiers.",
        title: "7 flat-config presets",
    },
    {
        description:
            "Config, sidebar, theme, page, CSS, and TypeDoc-adjacent workflows.",
        title: "Docs-repo coverage",
    },
] as const satisfies readonly HeroStat[];

const homeCards = [
    {
        description:
            "Install the package, pick a preset, and understand what the plugin guarantees immediately.",
        icon: "🚀",
        title: "Get Started",
        to: "/docs/rules/getting-started",
    },
    {
        description:
            "Browse the hand-authored rule docs, rationale, and examples across the full Docusaurus rule catalog.",
        icon: "📏",
        title: "Rule Reference",
        to: "/docs/rules/overview",
    },
    {
        description:
            "Compare minimal, config, recommended, strict, and the broader rollout tiers with a linked preset matrix.",
        icon: "🛠️",
        title: "Preset Guide",
        to: "/docs/rules/presets",
    },
    {
        description:
            "Understand the docs app, generated API pages, site contract, and validation pipeline as a maintainer.",
        icon: "🧰",
        title: "Maintainer Docs",
        to: "/docs/developer",
    },
] as const satisfies readonly HomeCard[];

const ruleFamilyCards = [
    {
        description:
            "Top-level site config, deployment fields, plugin-pwa setup, validation severities, and theme-config metadata rules.",
        icon: "⚙️",
        title: "Config & theme rules",
        to: "/docs/rules/require-site-config-fields",
    },
    {
        description:
            "Sidebar category shape, category links, generated-index/doc semantics, duplicate doc assignment, and collapse-state hygiene.",
        icon: "🧭",
        title: "Sidebar & docs navigation",
        to: "/docs/rules/require-sidebar-category-type",
    },
    {
        description:
            "Component link semantics, page module contracts, CSS boundaries, and static asset usage for mature docs sites.",
        icon: "🎨",
        title: "Site-source architecture",
        to: "/docs/rules/require-default-export-pages",
    },
] as const satisfies readonly HomeCard[];

const getStyleClassName = (className: string): string =>
    styles[className] ?? "";

export default function Home() {
    const heroArtUrl = useBaseUrl("/img/docusaurus.svg");
    const heroMarkUrl = useBaseUrl("/img/docusaurus_speed.svg");

    return (
        <Layout
            title="ESLint plugin for Docusaurus sites"
            description="Documentation for eslint-plugin-docusaurus-2."
        >
            <Head>
                <meta
                    content="eslint-plugin-docusaurus-2, docusaurus, typedoc, eslint plugin"
                    name="keywords"
                />
            </Head>

            <header className={getStyleClassName("heroBanner")}>
                <div
                    className={`container ${getStyleClassName("heroContent")}`}
                >
                    <div className={getStyleClassName("heroGrid")}>
                        <div>
                            <p className={getStyleClassName("heroKicker")}>
                                Docusaurus-first linting for documentation
                                repositories
                            </p>
                            <Heading
                                as="h1"
                                className={getStyleClassName("heroTitle")}
                            >
                                eslint-plugin-docusaurus-2
                            </Heading>
                            <p className={getStyleClassName("heroSubtitle")}>
                                A purpose-built ESLint plugin for Docusaurus
                                config, themeConfig, navbar/footer schema,
                                sidebars, pages, CSS boundaries, and
                                TypeDoc-integrated docs workflows.
                            </p>

                            <div className={getStyleClassName("heroActions")}>
                                <Link
                                    className={`button button--lg ${getStyleClassName("heroActionButton")} ${getStyleClassName("heroActionPrimary")}`}
                                    to="/docs/rules/getting-started"
                                >
                                    Start with the docs
                                </Link>
                                <Link
                                    className={`button button--lg ${getStyleClassName("heroActionButton")} ${getStyleClassName("heroActionSecondary")}`}
                                    to="/docs/rules/overview"
                                >
                                    Browse the rule catalog
                                </Link>
                            </div>

                            <div className={getStyleClassName("heroBadgeRow")}>
                                {heroBadges.map((badge) => (
                                    <div
                                        key={badge.label}
                                        className={getStyleClassName(
                                            "heroBadge"
                                        )}
                                    >
                                        <p
                                            className={getStyleClassName(
                                                "heroBadgeLabel"
                                            )}
                                        >
                                            <span
                                                className={getStyleClassName(
                                                    "heroBadgeIcon"
                                                )}
                                            >
                                                {badge.icon}
                                            </span>
                                            {badge.label}
                                        </p>
                                        <p
                                            className={getStyleClassName(
                                                "heroBadgeDescription"
                                            )}
                                        >
                                            {badge.description}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <GitHubStats
                                className={getStyleClassName("heroLiveBadges")}
                            />

                            <div className={getStyleClassName("heroStats")}>
                                {heroStats.map((stat) => (
                                    <div
                                        key={stat.title}
                                        className={getStyleClassName(
                                            "heroStatCard"
                                        )}
                                    >
                                        <p
                                            className={getStyleClassName(
                                                "heroStatHeading"
                                            )}
                                        >
                                            {stat.title}
                                        </p>
                                        <p
                                            className={getStyleClassName(
                                                "heroStatDescription"
                                            )}
                                        >
                                            {stat.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className={getStyleClassName("heroPanel")}>
                            <div
                                className={getStyleClassName("heroPanelStack")}
                            >
                                <img
                                    alt="eslint-plugin-docusaurus-2 accent mark"
                                    className={getStyleClassName(
                                        "heroPanelMark"
                                    )}
                                    decoding="async"
                                    loading="eager"
                                    src={heroMarkUrl}
                                />
                                <img
                                    alt="eslint-plugin-docusaurus-2 mascot"
                                    className={getStyleClassName(
                                        "heroPanelLogo"
                                    )}
                                    decoding="async"
                                    loading="eager"
                                    src={heroArtUrl}
                                />
                                <p
                                    className={getStyleClassName(
                                        "heroPanelCaption"
                                    )}
                                >
                                    Built for docs-heavy Docusaurus codebases
                                    that want config correctness, navigation
                                    safety, and maintainable site structure.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </header>

            <main className={getStyleClassName("mainContent")}>
                <section
                    className={`container ${getStyleClassName("sectionBlock")}`}
                >
                    <Heading
                        as="h2"
                        className={getStyleClassName("sectionTitle")}
                    >
                        🚀 Start here
                    </Heading>
                    <p className={getStyleClassName("sectionSubtitle")}>
                        Pick the entry point that matches how you want to adopt
                        the plugin: quick-start docs, the full rule catalog,
                        preset guidance, or the maintainer-facing architecture
                        docs.
                    </p>

                    <div className={getStyleClassName("cardGrid")}>
                        {homeCards.map((card) => (
                            <article
                                key={card.title}
                                className={getStyleClassName("card")}
                            >
                                <div
                                    className={getStyleClassName("cardHeader")}
                                >
                                    <span
                                        className={getStyleClassName(
                                            "cardIcon"
                                        )}
                                    >
                                        {card.icon}
                                    </span>
                                    <Heading
                                        as="h3"
                                        className={getStyleClassName(
                                            "cardTitle"
                                        )}
                                    >
                                        {card.title}
                                    </Heading>
                                </div>
                                <p
                                    className={getStyleClassName(
                                        "cardDescription"
                                    )}
                                >
                                    {card.description}
                                </p>
                                <Link
                                    className={getStyleClassName("cardLink")}
                                    to={card.to}
                                >
                                    Open section
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>

                <section
                    className={`container ${getStyleClassName("sectionBlock")}`}
                >
                    <Heading
                        as="h2"
                        className={getStyleClassName("sectionTitle")}
                    >
                        🧭 What the plugin covers
                    </Heading>
                    <p className={getStyleClassName("sectionSubtitle")}>
                        The rule catalog is intentionally centered on the pain
                        points unique to Docusaurus repositories: config shape,
                        themeConfig semantics, sidebars, site-source boundaries,
                        and TypeDoc-adjacent docs workflows.
                    </p>

                    <div className={getStyleClassName("cardGrid")}>
                        {ruleFamilyCards.map((card) => (
                            <article
                                key={card.title}
                                className={getStyleClassName("card")}
                            >
                                <div
                                    className={getStyleClassName("cardHeader")}
                                >
                                    <span
                                        className={getStyleClassName(
                                            "cardIcon"
                                        )}
                                    >
                                        {card.icon}
                                    </span>
                                    <Heading
                                        as="h3"
                                        className={getStyleClassName(
                                            "cardTitle"
                                        )}
                                    >
                                        {card.title}
                                    </Heading>
                                </div>
                                <p
                                    className={getStyleClassName(
                                        "cardDescription"
                                    )}
                                >
                                    {card.description}
                                </p>
                                <Link
                                    className={getStyleClassName("cardLink")}
                                    to={card.to}
                                >
                                    Explore rules
                                </Link>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
