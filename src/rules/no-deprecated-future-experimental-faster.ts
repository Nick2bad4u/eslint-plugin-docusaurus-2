/**
 * @packageDocumentation
 * ESLint rule implementation for `no-deprecated-future-experimental-faster`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type MessageIds = "noDeprecatedFutureExperimentalFaster";

const createReplacementPropertyKeyText = (
    property: Readonly<TSESTree.Property>
): null | string => {
    if (property.key.type === "Identifier") {
        return "faster";
    }

    return property.key.type === "Literal" &&
        typeof property.key.value === "string"
        ? JSON.stringify("faster")
        : null;
};

/** Rule module for `no-deprecated-future-experimental-faster`. */
const rule: TSESLint.RuleModule<MessageIds, typeof defaultOptions> =
    createTypedRule({
        create(context) {
            if (!isDocusaurusConfigFilePath(context.filename)) {
                return {};
            }

            return {
                Program(programNode: TSESTree.Program) {
                    const configObjectExpression =
                        getDefaultExportedObjectExpression(programNode);

                    if (configObjectExpression === null) {
                        return;
                    }

                    const futureExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "future"
                    );
                    const futureObject =
                        futureExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  futureExpression,
                                  programNode
                              );

                    if (futureObject === null) {
                        return;
                    }

                    const experimentalFasterProperty = findObjectPropertyByName(
                        futureObject,
                        "experimental_faster"
                    );

                    if (experimentalFasterProperty === null) {
                        return;
                    }

                    const fasterProperty = findObjectPropertyByName(
                        futureObject,
                        "faster"
                    );
                    const replacementKeyText = createReplacementPropertyKeyText(
                        experimentalFasterProperty
                    );

                    context.report({
                        fix:
                            fasterProperty !== null ||
                            replacementKeyText === null
                                ? null
                                : (fixer) =>
                                      fixer.replaceText(
                                          experimentalFasterProperty.key,
                                          replacementKeyText
                                      ),
                        messageId: "noDeprecatedFutureExperimentalFaster",
                        node: experimentalFasterProperty.key,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "disallow the deprecated `future.experimental_faster` config and prefer stable `future.faster`.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/no-deprecated-future-experimental-faster",
            },
            fixable: "code",
            messages: {
                noDeprecatedFutureExperimentalFaster:
                    "Rename deprecated `future.experimental_faster` to stable `future.faster` introduced in Docusaurus 3.10.",
            },
            schema: [],
            type: "problem",
        },
        name: "no-deprecated-future-experimental-faster",
    });

export default rule;
