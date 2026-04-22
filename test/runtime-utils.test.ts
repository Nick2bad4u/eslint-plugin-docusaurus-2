/**
 * @packageDocumentation
 * Vitest coverage for internal runtime utility helpers.
 */

import { describe, expect, it } from "vitest";

import { objectHasIn, safeCastTo } from "../src/_internal/runtime-utils";

describe("runtime-utils", () => {
    it("covers safeCastTo", () => {
        expect.hasAssertions();

        const castValue = safeCastTo<{ name: string }>({ name: "Nick" });

        expect(castValue.name).toBe("Nick");
    });

    it("covers objectHasIn", () => {
        expect.hasAssertions();

        const objectValue = { a: 1, b: 2 };

        expect(objectHasIn(objectValue, "toString")).toBeTruthy();
        expect(objectHasIn(objectValue, "a")).toBeTruthy();
        expect(objectHasIn(null, "a")).toBeFalsy();
    });
});
