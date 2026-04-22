/**
 * @packageDocumentation
 * Small runtime utility helpers used across internal source modules.
 */

import { keyIn as tsKeyIn } from "ts-extras";

import type { UnknownRecord } from "./types.js";

/** Check whether a key exists on an object or its prototype chain. */
export const objectHasIn = <Key extends PropertyKey>(
    value: unknown,
    key: Key
): value is Record<Key, unknown> =>
    typeof value === "object" &&
    value !== null &&
    tsKeyIn(value as UnknownRecord, key);

/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters -- Explicit call-site casts are the whole purpose of this helper. */
/** Narrow an unknown value using a caller-provided generic target type. */
export const safeCastTo = <Value>(value: unknown): Value => value as Value;
/* eslint-enable @typescript-eslint/no-unnecessary-type-parameters -- Re-enable after the generic cast helper. */
