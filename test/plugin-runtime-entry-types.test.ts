/**
 * @packageDocumentation
 * Runtime-backed type contract tests for published entrypoint declarations.
 */

import type { Docusaurus2Plugin } from "eslint-plugin-docusaurus-2";

import docusaurus2Plugin from "eslint-plugin-docusaurus-2";
import { describe, expect, it } from "vitest";

describe("plugin runtime entrypoint types", () => {
    it("matches the expected ESLint plugin declaration surface", () => {
        expect.hasAssertions();

        const pluginContract: Docusaurus2Plugin = docusaurus2Plugin;

        expect(pluginContract.configs).toBeDefined();
        expect(pluginContract.meta?.name).toBeDefined();
        expect(pluginContract.meta?.version).toBeDefined();
        expect(pluginContract.rules).toBeDefined();
    });
});
