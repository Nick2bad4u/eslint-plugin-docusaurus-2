/**
 * @packageDocumentation
 * ESLint rule implementation for `require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    findObjectPropertyByName,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticBooleanValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createInsertObjectPropertyFix } from "../_internal/object-literal-fixes.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const requiredV4FlagName = "removeLegacyPostBuildHeadAttribute" as const;

type MessageIds =
    "requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreads";

/**
 * Rule module for
 * `require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads`.
 */
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

                    const fasterExpression =
                        getObjectPropertyValueByName(futureObject, "faster") ??
                        getObjectPropertyValueByName(
                            futureObject,
                            "experimental_faster"
                        );
                    const fasterObject =
                        fasterExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  fasterExpression,
                                  programNode
                              );

                    if (fasterObject === null) {
                        return;
                    }

                    const workerThreadsExpression =
                        getObjectPropertyValueByName(
                            fasterObject,
                            "ssgWorkerThreads"
                        );

                    if (
                        workerThreadsExpression === null ||
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            workerThreadsExpression,
                            programNode
                        ) !== true
                    ) {
                        return;
                    }

                    const v4Expression = getObjectPropertyValueByName(
                        futureObject,
                        "v4"
                    );
                    const v4Object =
                        v4Expression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  v4Expression,
                                  programNode
                              );
                    const requiredFlagProperty =
                        v4Object === null
                            ? null
                            : findObjectPropertyByName(
                                  v4Object,
                                  requiredV4FlagName
                              );
                    const requiredFlagEnabled =
                        requiredFlagProperty !== null &&
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            requiredFlagProperty.value as TSESTree.Expression,
                            programNode
                        ) === true;

                    if (requiredFlagEnabled) {
                        return;
                    }

                    context.report({
                        fix: (fixer) => {
                            if (v4Object === null) {
                                return createInsertObjectPropertyFix({
                                    fixer,
                                    indentation: "        ",
                                    objectExpression: futureObject,
                                    propertyText: `v4: { ${requiredV4FlagName}: true }`,
                                    sourceCode: context.sourceCode,
                                });
                            }

                            return requiredFlagProperty === null
                                ? createInsertObjectPropertyFix({
                                      fixer,
                                      indentation: "            ",
                                      objectExpression: v4Object,
                                      propertyText: `${requiredV4FlagName}: true`,
                                      sourceCode: context.sourceCode,
                                  })
                                : fixer.replaceText(
                                      requiredFlagProperty.value,
                                      "true"
                                  );
                        },
                        messageId:
                            "requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreads",
                        node: workerThreadsExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `future.v4.removeLegacyPostBuildHeadAttribute` when faster `ssgWorkerThreads` are enabled.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads",
            },
            fixable: "code",
            messages: {
                requireV4RemoveLegacyPostBuildHeadAttributeForSsgWorkerThreads:
                    "Enable `future.v4.removeLegacyPostBuildHeadAttribute: true` when using Docusaurus Faster `ssgWorkerThreads`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-v4-remove-legacy-post-build-head-attribute-for-ssg-worker-threads",
    });

export default rule;
