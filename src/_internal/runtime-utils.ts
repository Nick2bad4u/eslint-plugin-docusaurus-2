/**
 * @packageDocumentation
 * Small runtime utility helpers used across internal source modules.
 */
import type { UnknownRecord } from "./types.js";

/** Safe `Array.prototype.at` wrapper with readonly support. */
export const arrayAt = <Value>(
    values: readonly Value[],
    index: number
): undefined | Value => values.at(index);

/** Return the first array item when present. */
export const arrayFirst = <Value>(
    values: readonly Value[]
): undefined | Value => values[0];

/** Type-safe `Array.prototype.includes` wrapper. */
export const arrayIncludes = <Value>(
    values: readonly Value[],
    candidate: Value
): boolean => values.includes(candidate);

/** Join string-like values with the provided separator. */
export const arrayJoin = (
    values: readonly string[],
    separator: string
): string => values.join(separator);

/** Assert that a value is neither `null` nor `undefined`. */
export const assertDefined = <Value>(
    value: Value,
    message = "Expected value to be defined."
): asserts value is Exclude<Value, null | undefined> => {
    if (value === null || value === undefined) {
        throw new TypeError(message);
    }
};

/** Check whether a value is not `undefined`. */
export const isDefined = <Value>(
    value: Value
): value is Exclude<Value, undefined> => value !== undefined;

/** Check whether a candidate collection-like value is empty. */
export const isEmpty = (value: unknown): boolean => {
    if (typeof value === "string" || Array.isArray(value)) {
        return value.length === 0;
    }

    if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
    }

    if (typeof value === "object" && value !== null) {
        return Reflect.ownKeys(value).length === 0;
    }

    return false;
};

/** Check whether a number is an integer. */
export const isInteger = (value: unknown): value is number =>
    typeof value === "number" && Number.isInteger(value);

/** Check whether a number is a safe integer. */
export const isSafeInteger = (value: unknown): value is number =>
    typeof value === "number" && Number.isSafeInteger(value);

/** Check whether a value is neither `null` nor `undefined`. */
export const isPresent = <Value>(
    value: Value
): value is Exclude<Value, null | undefined> =>
    value !== null && value !== undefined;

/** Check whether a property key exists anywhere on an object chain. */
export const keyIn = (value: unknown, key: PropertyKey): value is object =>
    typeof value === "object" && value !== null && key in value;

/** Typed `Object.entries` wrapper. */
export const objectEntries = <RecordType extends UnknownRecord>(
    value: RecordType
): readonly (readonly [keyof RecordType, RecordType[keyof RecordType]])[] =>
    Object.entries(value) as readonly (readonly [
        keyof RecordType,
        RecordType[keyof RecordType],
    ])[];

/** Typed `Object.fromEntries` wrapper. */
export const objectFromEntries = <Key extends PropertyKey, Value>(
    entries: Iterable<readonly [Key, Value]>
): Readonly<Record<Key, Value>> =>
    Object.fromEntries(entries) as Readonly<Record<Key, Value>>;

/** Typed `Object.hasOwn` wrapper. */
export const objectHasOwn = <Key extends PropertyKey>(
    value: unknown,
    key: Key
): value is Record<Key, unknown> =>
    typeof value === "object" && value !== null && Object.hasOwn(value, key);

/** Check whether a key exists on an object or its prototype chain. */
export const objectHasIn = <Key extends PropertyKey>(
    value: unknown,
    key: Key
): value is Record<Key, unknown> =>
    typeof value === "object" && value !== null && key in value;

/** Typed `Object.keys` wrapper. */
export const objectKeys = (value: object): readonly string[] =>
    Object.keys(value);

/** Typed `Object.values` wrapper. */
export const objectValues = <RecordType extends UnknownRecord>(
    value: RecordType
): readonly RecordType[keyof RecordType][] =>
    Object.values(value) as readonly RecordType[keyof RecordType][];

/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters -- Explicit call-site casts are the whole purpose of this helper. */
/**
 * Narrow an unknown value using a caller-provided generic target type.
 *
 * @typeParam Value - Requested cast target type.
 *
 * @param value - Runtime value to narrow.
 *
 * @returns The same runtime value viewed as the requested type parameter.
 */
export const safeCastTo = <Value>(value: unknown): Value => value as Value;
/* eslint-enable @typescript-eslint/no-unnecessary-type-parameters -- Re-enable after the generic cast helper. */

/** Split a string by the provided separator. */
export const stringSplit = (value: string, separator: string): string[] =>
    value.split(separator);

/** Typed `Set.prototype.has` wrapper. */
export const setHas = <Value>(
    values: ReadonlySet<Value>,
    candidate: Value
): boolean => values.has(candidate);
