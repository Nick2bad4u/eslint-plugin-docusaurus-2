/**
 * @packageDocumentation
 * Type-level contract tests for runtime entrypoint declarations.
 */
import type { ESLint } from "eslint";

import docusaurus2Plugin from "eslint-plugin-docusaurus-2";
import { assertType } from "vitest";

assertType<ESLint.Plugin>(docusaurus2Plugin);
assertType<ESLint.Plugin["configs"] | undefined>(docusaurus2Plugin.configs);
assertType<string | undefined>(docusaurus2Plugin.meta?.name);
assertType<string | undefined>(docusaurus2Plugin.meta?.version);
assertType<ESLint.Plugin["rules"] | undefined>(docusaurus2Plugin.rules);
