import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars = {
    rules: [
        {
            className: "sb-doc-overview",
            id: "overview",
            label: "🏁 Overview",
            type: "doc",
        },
        {
            className: "sb-doc-getting-started",
            id: "getting-started",
            label: "🚀 Getting Started",
            type: "doc",
        },
        {
            className: "sb-cat-presets",
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
            className: "sb-cat-rules",
            collapsible: true,
            items: [
                {
                    id: "no-conflicting-config-link-props",
                    label: "no-conflicting-config-link-props",
                    type: "doc",
                },
                {
                    id: "no-deprecated-on-broken-markdown-links",
                    label: "no-deprecated-on-broken-markdown-links",
                    type: "doc",
                },
                {
                    id: "no-duplicate-sidebar-doc-ids",
                    label: "no-duplicate-sidebar-doc-ids",
                    type: "doc",
                },
                {
                    id: "no-ignored-site-validations",
                    label: "no-ignored-site-validations",
                    type: "doc",
                },
                {
                    id: "no-mixed-sidebar-link-kinds",
                    label: "no-mixed-sidebar-link-kinds",
                    type: "doc",
                },
                {
                    id: "no-page-css-module-imports-in-components",
                    label: "no-page-css-module-imports-in-components",
                    type: "doc",
                },
                {
                    id: "no-redundant-social-card-metadata",
                    label: "no-redundant-social-card-metadata",
                    type: "doc",
                },
                {
                    id: "no-svg-social-card-image",
                    label: "no-svg-social-card-image",
                    type: "doc",
                },
                {
                    id: "no-useless-collapsed-sidebar-categories",
                    label: "no-useless-collapsed-sidebar-categories",
                    type: "doc",
                },
                {
                    id: "no-use-base-url-for-internal-link-components",
                    label: "no-use-base-url-for-internal-link-components",
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
                    id: "prefer-href-for-external-links",
                    label: "prefer-href-for-external-links",
                    type: "doc",
                },
                {
                    id: "prefer-sidebars-config-satisfies",
                    label: "prefer-sidebars-config-satisfies",
                    type: "doc",
                },
                {
                    id: "prefer-to-for-internal-link-components",
                    label: "prefer-to-for-internal-link-components",
                    type: "doc",
                },
                {
                    id: "prefer-to-for-internal-links",
                    label: "prefer-to-for-internal-links",
                    type: "doc",
                },
                {
                    id: "prefer-use-base-url-for-static-assets",
                    label: "prefer-use-base-url-for-static-assets",
                    type: "doc",
                },
                {
                    id: "require-default-export-pages",
                    label: "require-default-export-pages",
                    type: "doc",
                },
                {
                    id: "require-doc-sidebar-link-type",
                    label: "require-doc-sidebar-link-type",
                    type: "doc",
                },
                {
                    id: "require-generated-index-link-type",
                    label: "require-generated-index-link-type",
                    type: "doc",
                },
                {
                    id: "require-pages-plugin-excludes",
                    label: "require-pages-plugin-excludes",
                    type: "doc",
                },
            ],
            label: "Rules",
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
