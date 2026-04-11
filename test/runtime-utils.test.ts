/**
 * @packageDocumentation
 * Vitest coverage for internal runtime utility helpers.
 */

import { describe, expect, it } from "vitest";

import {
    arrayAt,
    arrayFirst,
    arrayIncludes,
    arrayJoin,
    assertDefined,
    isDefined,
    isEmpty,
    isInteger,
    isPresent,
    isSafeInteger,
    keyIn,
    objectEntries,
    objectFromEntries,
    objectHasIn,
    objectHasOwn,
    objectKeys,
    objectValues,
    safeCastTo,
    setHas,
    stringSplit,
} from "../src/_internal/runtime-utils";

describe("runtime-utils", () => {
    it("covers array helpers", () => {
        expect.hasAssertions();

        expect(
            arrayAt(
                [
                    "a",
                    "b",
                    "c",
                ],
                1
            )
        ).toBe("b");
        expect(arrayAt(["a"], 3)).toBeUndefined();
        expect(
            arrayFirst([
                1,
                2,
                3,
            ])
        ).toBe(1);

        const firstEmptyValue = arrayFirst<string>([]);

        expect(firstEmptyValue).toBeUndefined();
        expect(
            arrayIncludes(
                [
                    1,
                    2,
                    3,
                ],
                2
            )
        ).toBeTruthy();
        expect(arrayJoin(["a", "b"], ", ")).toBe("a, b");
    });

    it("covers defined and presence guards", () => {
        expect.hasAssertions();

        const assertDefinedValue: typeof assertDefined = assertDefined;

        expect(isDefined("value")).toBeTruthy();
        expect(isDefined(undefined)).toBeFalsy();
        expect(isPresent(null)).toBeFalsy();
        expect(isPresent(undefined)).toBeFalsy();
        expect(isPresent(0)).toBeTruthy();

        let thrownError: unknown = undefined;

        try {
            assertDefinedValue(undefined, "missing");
        } catch (error: unknown) {
            thrownError = error;
        }

        expect(thrownError).toBeInstanceOf(TypeError);
        expect((thrownError as Error).message).toBe("missing");

        const value: string | undefined = "ready";

        assertDefinedValue(value);

        expect(value).toBe("ready");
    });

    it("covers emptiness checks", () => {
        expect.hasAssertions();

        expect(isEmpty("")).toBeTruthy();
        expect(isEmpty("x")).toBeFalsy();
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty([1])).toBeFalsy();
        expect(isEmpty(new Map())).toBeTruthy();
        expect(isEmpty(new Set([1]))).toBeFalsy();
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty({ a: 1 })).toBeFalsy();
        expect(isEmpty(false)).toBeFalsy();
    });

    it("covers numeric guards", () => {
        expect.hasAssertions();

        expect(isInteger(3)).toBeTruthy();
        expect(isInteger(3.14)).toBeFalsy();
        expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBeTruthy();
        expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBeFalsy();
    });

    it("covers object helpers", () => {
        expect.hasAssertions();

        const objectValue = { a: 1, b: 2 };
        const fromEntries = objectFromEntries([
            ["x", 1] as const,
            ["y", 2] as const,
        ]);

        expect(keyIn(objectValue, "a")).toBeTruthy();
        expect(keyIn(null, "a")).toBeFalsy();
        expect(objectHasOwn(objectValue, "a")).toBeTruthy();
        expect(objectHasOwn(objectValue, "c")).toBeFalsy();
        expect(objectHasIn(objectValue, "toString")).toBeTruthy();
        expect(objectEntries(objectValue)).toStrictEqual([
            ["a", 1],
            ["b", 2],
        ]);
        expect(objectKeys(objectValue)).toStrictEqual(["a", "b"]);
        expect(objectValues(objectValue)).toStrictEqual([1, 2]);
        expect(fromEntries).toStrictEqual({ x: 1, y: 2 });
    });

    it("covers miscellaneous wrappers", () => {
        expect.hasAssertions();

        const castValue = safeCastTo<{ name: string }>({ name: "Nick" });

        expect(castValue.name).toBe("Nick");
        expect(stringSplit("a/b/c", "/")).toStrictEqual([
            "a",
            "b",
            "c",
        ]);
        expect(setHas(new Set(["content"]), "content")).toBeTruthy();
        expect(setHas(new Set(["content"]), "strict")).toBeFalsy();
    });
});
