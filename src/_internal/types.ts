/**
 * @packageDocumentation
 * Internal shared type aliases used across plugin source and tests.
 */

/** JSON-compatible object shape. */
export type JsonObject = {
    readonly [key: string]: JsonValue;
};

/** Primitive JSON-compatible values. */
export type JsonPrimitive = boolean | null | number | string;

/** Recursive JSON-compatible value union. */
export type JsonValue = JsonObject | JsonPrimitive | readonly JsonValue[];

/** Readonly array of unknown values. */
export type UnknownArray = readonly unknown[];

/** Readonly record with unknown values. */
export type UnknownRecord = Readonly<Record<PropertyKey, unknown>>;
