import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

import { ruleCatalogEntries } from "../../src/_internal/rule-catalog";

const presetDocs = [
    {
        id: "presets/index",
        label: "Preset index",
        type: "doc",
    },
    {
        className: "sb-preset-minimal",
        id: "presets/minimal",
        label: "🟢 Minimal",
        type: "doc",
    },
    {
        className: "sb-preset-config",
        id: "presets/config",
        label: "🔵 Config",
        type: "doc",
    },
    {
        className: "sb-preset-recommended",
        id: "presets/recommended",
        label: "🟡 Recommended",
        type: "doc",
    },
    {
        className: "sb-preset-recommended-type-checked",
        id: "presets/recommended-type-checked",
        label: "🟠 Recommended (type-checked)",
        type: "doc",
    },
    {
        className: "sb-preset-strict",
        id: "presets/strict",
        label: "🔴 Strict",
        type: "doc",
    },
    {
        className: "sb-preset-all",
        id: "presets/all",
        label: "🟣 All",
        type: "doc",
    },
    {
        className: "sb-preset-experimental",
        id: "presets/experimental",
        label: "🧪 Experimental",
        type: "doc",
    },
] satisfies SidebarsConfig["rules"];

const ruleDocs = ruleCatalogEntries.map((entry) => ({
    id: entry.ruleName,
    label: `${String(entry.ruleNumber).padStart(3, "0")} ${entry.ruleName}`,
    type: "doc" as const,
})) satisfies SidebarsConfig["rules"];

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
            items: presetDocs,
            label: "Presets",
            type: "category",
        },
        {
            className: "sb-cat-rules",
            collapsible: true,
            items: ruleDocs,
            label: "Rules",
            type: "category",
        },
    ],
} satisfies SidebarsConfig;

export default sidebars;
