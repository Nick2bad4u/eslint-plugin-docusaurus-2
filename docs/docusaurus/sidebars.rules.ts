import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
    rules: [
        {
            id: "overview",
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
                    id: "presets/index",
                    label: "Preset index",
                    type: "doc",
                },
                {
                    id: "presets/minimal",
                    label: "🟢 Minimal",
                    type: "doc",
                },
                {
                    id: "presets/recommended",
                    label: "🟡 Recommended",
                    type: "doc",
                },
                {
                    id: "presets/recommended-type-checked",
                    label: "🟠 Recommended (type-checked)",
                    type: "doc",
                },
                {
                    id: "presets/strict",
                    label: "🔴 Strict",
                    type: "doc",
                },
                {
                    id: "presets/all",
                    label: "🟣 All",
                    type: "doc",
                },
                {
                    id: "presets/experimental",
                    label: "🧪 Experimental",
                    type: "doc",
                },
            ],
            label: "Presets",
            type: "category",
        },
        {
            collapsible: true,
            items: [
                {
                    id: "no-ignored-site-validations",
                    label: "no-ignored-site-validations",
                    type: "doc",
                },
                {
                    id: "no-page-css-module-imports-in-components",
                    label: "no-page-css-module-imports-in-components",
                    type: "doc",
                },
                {
                    id: "prefer-config-satisfies",
                    label: "prefer-config-satisfies",
                    type: "doc",
                },
                {
                    id: "prefer-css-modules-in-site-src",
                    label: "prefer-css-modules-in-site-src",
                    type: "doc",
                },
                {
                    id: "prefer-to-for-internal-links",
                    label: "prefer-to-for-internal-links",
                    type: "doc",
                },
                {
                    id: "require-generated-index-link-type",
                    label: "require-generated-index-link-type",
                    type: "doc",
                },
            ],
            label: "Rules",
            type: "category",
        },
    ],
};

export default sidebars;
