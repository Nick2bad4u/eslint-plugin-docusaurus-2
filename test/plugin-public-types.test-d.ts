/**
 * @packageDocumentation
 * Type-level contract tests for public plugin exports.
 */
import type {
    Docusaurus2ConfigName,
    Docusaurus2Plugin,
    Docusaurus2RuleId,
    Docusaurus2RuleName,
} from "eslint-plugin-docusaurus-2";

import { assertType } from "vitest";

const validConfigName = "recommended-type-checked";

assertType<Docusaurus2ConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy Docusaurus2ConfigName.
assertType<Docusaurus2ConfigName>("recommendedTypeChecked");

declare const pluginContract: Docusaurus2Plugin;
declare const ruleId: Docusaurus2RuleId;
declare const ruleName: Docusaurus2RuleName;

assertType(pluginContract.configs.recommended);
assertType(pluginContract.configs.all);
assertType(pluginContract.configs.experimental);
assertType(pluginContract.meta.name);
assertType(pluginContract.meta.namespace);
assertType(ruleId);
assertType(ruleName);
