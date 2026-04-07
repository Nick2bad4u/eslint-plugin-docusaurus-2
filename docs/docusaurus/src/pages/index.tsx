import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import GitHubStats from "../components/GitHubStats";
import styles from "./index.module.css";

type HomeCard = {
    readonly description: string;
    readonly title: string;
    readonly to: string;
};

const homeCards = [
    {
        description:
            "Install the package, choose a preset, and understand what the scaffold already guarantees today.",
        title: "Get Started",
        to: "/docs/getting-started",
    },
    {
        description:
            "Browse the hand-authored rules and preset reference docs that will grow with the real Docusaurus rule catalog.",
        title: "Rules & Presets",
        to: "/docs/rules/overview",
    },
    {
        description:
            "Understand how the docs app, generated API pages, and repository-level validation fit together.",
        title: "Maintainer Docs",
        to: "/docs/developer",
    },
] as const satisfies readonly HomeCard[];

const getStyleClassName = (className: string): string =>
    styles[className] ?? "";

export default function Home() {
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
                    <p className={getStyleClassName("heroKicker")}>
                        Docusaurus-first linting for documentation repositories
                    </p>
                    <Heading as="h1" className={getStyleClassName("heroTitle")}>
                        eslint-plugin-docusaurus-2
                    </Heading>
                    <p className={getStyleClassName("heroSubtitle")}>
                        A clean ESLint plugin scaffold focused on Docusaurus
                        conventions, docs workflows, and TypeDoc integration.
                    </p>

                    <div className={getStyleClassName("heroActions")}>
                        <Link
                            className={`button button--primary button--lg ${getStyleClassName("heroActionButton")}`}
                            to="/docs/getting-started"
                        >
                            Start with the docs
                        </Link>
                        <Link
                            className={`button button--secondary button--lg ${getStyleClassName("heroActionButton")}`}
                            to="/docs/rules/overview"
                        >
                            Review presets
                        </Link>
                    </div>

                    <GitHubStats
                        className={getStyleClassName("heroLiveBadges")}
                    />
                </div>
            </header>

            <main className={getStyleClassName("mainContent")}>
                <section className="container">
                    <div className={getStyleClassName("cardGrid")}>
                        {homeCards.map((card) => (
                            <article
                                key={card.title}
                                className={getStyleClassName("card")}
                            >
                                <Heading
                                    as="h2"
                                    className={getStyleClassName("cardTitle")}
                                >
                                    {card.title}
                                </Heading>
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
            </main>
        </Layout>
    );
}
