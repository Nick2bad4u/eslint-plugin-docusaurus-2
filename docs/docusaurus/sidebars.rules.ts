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
    ],
};

export default sidebars;
