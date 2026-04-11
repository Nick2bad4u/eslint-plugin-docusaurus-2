/**
 * @packageDocumentation
 * ESLint rule implementation for `require-docusaurus-faster-package-installed`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { isPackageDeclaredInNearestManifest } from "../_internal/package-manifest.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const docusaurusFasterPackageName = "@docusaurus/faster" as const;
const defaultOptions = [] as const;

type MessageIds = "requireDocusaurusFasterPackageInstalled";

/** Rule module for `require-docusaurus-faster-package-installed`. */
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

                    if (
                        configObjectExpression === null ||
                        isPackageDeclaredInNearestManifest(
                            context.filename,
                            docusaurusFasterPackageName
                        )
                    ) {
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

                    const fasterProperty =
                        getObjectPropertyValueByName(futureObject, "faster") ??
                        getObjectPropertyValueByName(
                            futureObject,
                            "experimental_faster"
                        );

                    if (fasterProperty === null) {
                        return;
                    }

                    context.report({
                        messageId: "requireDocusaurusFasterPackageInstalled",
                        node: fasterProperty,
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `@docusaurus/faster` to be declared when stable or deprecated faster flags are configured.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-docusaurus-faster-package-installed",
            },
            messages: {
                requireDocusaurusFasterPackageInstalled:
                    "Configure `@docusaurus/faster` in the nearest package manifest when using `future.faster` or deprecated `future.experimental_faster` flags.",
            },
            schema: [],
            type: "problem",
        },
        name: "require-docusaurus-faster-package-installed",
    });

export default rule;
