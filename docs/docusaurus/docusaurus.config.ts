import { themes as prismThemes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const organizationName = "Nick2bad4u";
const projectName = "eslint-plugin-docusaurus-2";
const siteUrl = "https://nick2bad4u.github.io";
const baseUrl =
    process.env["DOCUSAURUS_BASE_URL"] ?? "/eslint-plugin-docusaurus-2/";
const editUrl = `https://github.com/${organizationName}/${projectName}/blob/main/docs/docusaurus/`;

const suppressKnownWebpackWarningsPlugin = () => ({
    configureWebpack() {
        return {
            ignoreWarnings: [
                {
                    message:
                        /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/u,
                    module: /vscode-languageserver-types[\\/]lib[\\/]umd[\\/]main\.js/u,
                },
            ],
        };
    },
    name: "suppress-known-webpack-warnings",
});

const config: Config = {
    title: "eslint-plugin-docusaurus-2",
    tagline:
        "ESLint plugin for Docusaurus sites and TypeDoc-integrated documentation workflows.",
    url: siteUrl,
    baseUrl,
    organizationName,
    projectName,
    favicon: "img/logo.svg",
    future: {
        v4: {
            removeLegacyPostBuildHeadAttribute: true,
            useCssCascadeLayers: false,
        },
    },
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },
    markdown: {
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
        mermaid: true,
    },
    onBrokenAnchors: "warn",
    onBrokenLinks: "warn",
    plugins: [
        suppressKnownWebpackWarningsPlugin,
        "docusaurus-plugin-image-zoom",
        [
            "@docusaurus/plugin-content-docs",
            {
                id: "rules",
                path: "../rules",
                routeBasePath: "docs/rules",
                sidebarPath: "./sidebars.rules.ts",
            },
        ],
    ],
    presets: [
        [
            "classic",
            {
                blog: false,
                docs: {
                    path: "site-docs",
                    routeBasePath: "docs",
                    sidebarPath: "./sidebars.ts",
                    editUrl,
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],
    themeConfig: {
        image: "img/logo.png",
        navbar: {
            title: "eslint-plugin-docusaurus-2",
            logo: {
                alt: "eslint-plugin-docusaurus-2 logo.",
                src: "img/logo.svg",
            },
            items: [
                {
                    label: "Docs",
                    position: "left",
                    to: "/docs/intro",
                },
                {
                    label: "Rules",
                    position: "left",
                    to: "/docs/rules/overview",
                },
                {
                    href: `https://github.com/${organizationName}/${projectName}`,
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            copyright: `© ${new Date().getFullYear()} Nick2bad4u · Built with Docusaurus.`,
            links: [
                {
                    title: "Docs",
                    items: [
                        {
                            label: "Overview",
                            to: "/docs/intro",
                        },
                        {
                            label: "Rules overview",
                            to: "/docs/rules/overview",
                        },
                    ],
                },
                {
                    title: "Project",
                    items: [
                        {
                            label: "GitHub",
                            href: `https://github.com/${organizationName}/${projectName}`,
                        },
                        {
                            label: "Issues",
                            href: `https://github.com/${organizationName}/${projectName}/issues`,
                        },
                    ],
                },
            ],
        },
        prism: {
            darkTheme: prismThemes.dracula,
            theme: prismThemes.github,
        },
        zoom: {
            selector: ".markdown img",
        },
    },
    themes: ["@docusaurus/theme-mermaid"],
};

export default config;
