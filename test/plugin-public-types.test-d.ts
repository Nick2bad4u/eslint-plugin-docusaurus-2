/**
 * @packageDocumentation
 * Type-level contract tests for public plugin exports.
 */
import type {
    Docusaurus2Plugin,
    Docusaurus2RuleId,
    Docusaurus2RuleName,
} from "eslint-plugin-docusaurus-2";

import { assertType } from "vitest";

const validConfigName = "strict";
const validRuleId = "docusaurus-2/no-redundant-social-card-metadata";
const validRuleName = "no-mixed-sidebar-link-kinds";

type Docusaurus2ConfigName = keyof Docusaurus2Plugin["configs"];

assertType<Docusaurus2ConfigName>(validConfigName);
// @ts-expect-error Invalid preset key must not satisfy Docusaurus2ConfigName.
assertType<Docusaurus2ConfigName>("recommendedTypeChecked");

declare const pluginContract: Docusaurus2Plugin;
declare const ruleId: Docusaurus2RuleId;
declare const ruleName: Docusaurus2RuleName;

assertType(pluginContract.configs.recommended);
assertType(pluginContract.configs.config);
assertType(pluginContract.configs.all);
assertType(pluginContract.configs.experimental);
assertType<string>(pluginContract.meta.name);
assertType<string>(pluginContract.meta.version);
assertType<"docusaurus-2">(pluginContract.meta.namespace);
assertType<Docusaurus2RuleId>(validRuleId);
assertType(validRuleName);
assertType(ruleId);
assertType(ruleName);
