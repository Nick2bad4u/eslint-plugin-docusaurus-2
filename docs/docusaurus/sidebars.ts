import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    docs: [
        {
            id: "intro",
            label: "🏁 Overview",
            type: "doc",
        },
        {
            id: "getting-started",
            label: "🚀 Getting Started",
            type: "doc",
        },
        {
            collapsible: true,
            items: [
                {
                    id: "developer/index",
                    label: "Maintainer Overview",
                    type: "doc",
                },
                {
                    id: "developer/docusaurus-site-contract",
                    label: "Docs Site Contract",
                    type: "doc",
                },
                {
                    id: "developer/deploy-pages-seo-and-indexnow",
                    label: "Pages SEO & IndexNow",
                    type: "doc",
                },
            ],
            label: "🛠️ Developer",
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
