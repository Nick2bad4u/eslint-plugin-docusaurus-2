/**
 * @packageDocumentation
 * Internal shared type aliases used across plugin source and tests.
 */

import type {
    JsonPrimitive as TypeFestJsonPrimitive,
    UnknownArray as TypeFestUnknownArray,
} from "type-fest";

/** JSON-compatible object shape. */
export type JsonObject = {
    readonly [key: string]: JsonValue;
};

/** Primitive JSON-compatible values. */
export type JsonPrimitive = TypeFestJsonPrimitive;

/** Recursive JSON-compatible value union. */
export type JsonValue = JsonObject | JsonPrimitive | readonly JsonValue[];

/** Readonly array of unknown values. */
export type UnknownArray = TypeFestUnknownArray;

/** Readonly record with unknown values. */
export type UnknownRecord = Readonly<Record<PropertyKey, unknown>>;
