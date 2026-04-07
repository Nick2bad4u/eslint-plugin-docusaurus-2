/**
 * @packageDocumentation
 * Shared helpers for explicit boolean Set membership checks.
 */
import { setHas } from "./runtime-utils.js";

/**
 * Check whether a Set contains a candidate value while intentionally exposing
 * only plain-boolean semantics at call sites.
 */
export const setContainsValue = <Type>(
    set: ReadonlySet<Type>,
    item: Type
): boolean => setHas(set, item);
