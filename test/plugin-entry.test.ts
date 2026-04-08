/**
 * @packageDocumentation
 * Vitest coverage for the published plugin entrypoints.
 */
import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";

import { presetConfigNames } from "../src/_internal/preset-config-references";
import docusaurus2Plugin from "../src/plugin";

const requireFromTestModule = createRequire(import.meta.url);
const packageJson = requireFromTestModule("../package.json") as {
    version: string;
};

const expectedPluginVersion = packageJson.version;

const expectedConfigRegistryShape = expect.objectContaining(
    Object.fromEntries(
        [...presetConfigNames].map((configName) => [
            configName,
            expect.any(Object),
        ])
    )
);

describe("plugin entry module", () => {
    it("exports the default plugin object with configs, meta, processors, and rules", () => {
        expect.hasAssertions();
        expect(docusaurus2Plugin).toStrictEqual(
            expect.objectContaining({
                configs: expect.any(Object),
                meta: expect.any(Object),
                processors: expect.any(Object),
                rules: expect.any(Object),
            })
        );

        expect(docusaurus2Plugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-docusaurus-2",
                namespace: "docusaurus-2",
                version: expectedPluginVersion,
            })
        );
    });

    it("exposes the documented preset keys and registered rules", () => {
        expect.hasAssertions();
        expect(docusaurus2Plugin.configs).toStrictEqual(
            expectedConfigRegistryShape
        );
        expect(
            Object.keys(docusaurus2Plugin.rules).toSorted((left, right) =>
                left.localeCompare(right)
            )
        ).toStrictEqual([
            "no-conflicting-config-link-props",
            "no-deprecated-on-broken-markdown-links",
            "no-duplicate-sidebar-doc-ids",
            "no-ignored-site-validations",
            "no-page-css-module-imports-in-components",
            "no-svg-social-card-image",
            "no-use-base-url-for-internal-link-components",
            "no-useless-collapsed-sidebar-categories",
            "prefer-config-satisfies",
            "prefer-css-modules-in-site-src",
            "prefer-href-for-external-links",
            "prefer-sidebars-config-satisfies",
            "prefer-to-for-internal-link-components",
            "prefer-to-for-internal-links",
            "prefer-use-base-url-for-static-assets",
            "require-default-export-pages",
            "require-doc-sidebar-link-type",
            "require-generated-index-link-type",
            "require-pages-plugin-excludes",
        ]);
    });

    it("exports the same runtime shape from plugin.mjs", async () => {
        expect.hasAssertions();

        const runtimePluginModule = (await import("../plugin.mjs")) as {
            default: unknown;
        };

        expect(runtimePluginModule.default).toStrictEqual(
            expect.objectContaining({
                meta: expect.objectContaining({
                    name: "eslint-plugin-docusaurus-2",
                    namespace: "docusaurus-2",
                    version: expectedPluginVersion,
                }),
            })
        );
    });

    it("exports the same runtime shape from dist/plugin.cjs", () => {
        expect.hasAssertions();

        const runtimePlugin = requireFromTestModule("../dist/plugin.cjs") as {
            meta?: {
                name?: unknown;
                namespace?: unknown;
                version?: unknown;
            };
        };

        expect(runtimePlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-docusaurus-2",
                namespace: "docusaurus-2",
                version: expectedPluginVersion,
            })
        );
    });

    it("resolves the package self-reference through CJS", () => {
        expect.hasAssertions();

        const packageRuntimePlugin = requireFromTestModule(
            "eslint-plugin-docusaurus-2"
        ) as typeof docusaurus2Plugin;

        expect(packageRuntimePlugin.meta).toStrictEqual(
            expect.objectContaining({
                name: "eslint-plugin-docusaurus-2",
                namespace: "docusaurus-2",
                version: expectedPluginVersion,
            })
        );
    });
});
