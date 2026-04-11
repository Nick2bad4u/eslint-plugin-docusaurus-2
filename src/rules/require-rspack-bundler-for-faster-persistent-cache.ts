/**
 * @packageDocumentation
 * ESLint rule implementation for `require-rspack-bundler-for-faster-persistent-cache`.
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

type MessageIds = "requireRspackBundlerForFasterPersistentCache";

/** Rule module for `require-rspack-bundler-for-faster-persistent-cache`. */
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

                    const persistentCacheExpression =
                        getObjectPropertyValueByName(
                            fasterObject,
                            "rspackPersistentCache"
                        );

                    if (
                        persistentCacheExpression === null ||
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            persistentCacheExpression,
                            programNode
                        ) !== true
                    ) {
                        return;
                    }

                    const rspackBundlerProperty = findObjectPropertyByName(
                        fasterObject,
                        "rspackBundler"
                    );
                    const rspackBundlerEnabled =
                        rspackBundlerProperty !== null &&
                        getStaticBooleanValueFromExpressionOrIdentifier(
                            rspackBundlerProperty.value as TSESTree.Expression,
                            programNode
                        ) === true;

                    if (rspackBundlerEnabled) {
                        return;
                    }

                    context.report({
                        fix: (fixer) =>
                            rspackBundlerProperty === null
                                ? createInsertObjectPropertyFix({
                                      fixer,
                                      indentation: "            ",
                                      objectExpression: fasterObject,
                                      propertyText: "rspackBundler: true",
                                      sourceCode: context.sourceCode,
                                  })
                                : fixer.replaceText(
                                      rspackBundlerProperty.value,
                                      "true"
                                  ),
                        messageId:
                            "requireRspackBundlerForFasterPersistentCache",
                        node: persistentCacheExpression,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `future.faster.rspackBundler` when `rspackPersistentCache` is enabled in faster config.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-rspack-bundler-for-faster-persistent-cache",
            },
            fixable: "code",
            messages: {
                requireRspackBundlerForFasterPersistentCache:
                    "Enable `rspackBundler: true` when using Docusaurus Faster `rspackPersistentCache`.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-rspack-bundler-for-faster-persistent-cache",
    });

export default rule;
