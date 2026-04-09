/**
 * @packageDocumentation
 * ESLint rule implementation for `require-head-tag-tag-name`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import {
    getArrayExpressionFromExpressionOrIdentifier,
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;

type HeadTagName = "link" | "meta" | "script";

type HeadTagSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];
type HeadTagSuggestionMessageId =
    | "setHeadTagTagNameLink"
    | "setHeadTagTagNameMeta"
    | "setHeadTagTagNameScript";
type MessageIds =
    | "requireHeadTagTagName"
    | "setHeadTagTagNameLink"
    | "setHeadTagTagNameMeta"
    | "setHeadTagTagNameScript";

const inferHeadTagName = (
    headTagObject: Readonly<TSESTree.ObjectExpression>,
    programNode: Readonly<TSESTree.Program>
): HeadTagName | null => {
    const attributesExpression = getObjectPropertyValueByName(
        headTagObject,
        "attributes"
    );
    const attributesObject =
        attributesExpression === null
            ? null
            : getObjectExpressionFromExpressionOrIdentifier(
                  attributesExpression,
                  programNode
              );
    const innerHtmlExpression = getObjectPropertyValueByName(
        headTagObject,
        "innerHTML"
    );

    if (innerHtmlExpression !== null) {
        return "script";
    }

    if (attributesObject === null) {
        return null;
    }

    const relExpression = getObjectPropertyValueByName(attributesObject, "rel");
    const hrefExpression = getObjectPropertyValueByName(
        attributesObject,
        "href"
    );

    if (relExpression !== null || hrefExpression !== null) {
        return "link";
    }

    const metaIndicatorPropertyNames = [
        "charset",
        "charSet",
        "content",
        "http-equiv",
        "httpEquiv",
        "name",
        "property",
    ] as const;

    return metaIndicatorPropertyNames.some(
        (propertyName) =>
            getObjectPropertyValueByName(attributesObject, propertyName) !==
            null
    )
        ? "meta"
        : null;
};

const createInsertTagNameFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    headTagObject: Readonly<TSESTree.ObjectExpression>,
    tagName: HeadTagName
): TSESLint.RuleFix => {
    const tagNameText = `tagName: ${JSON.stringify(tagName)}`;
    const firstProperty = headTagObject.properties[0];

    if (firstProperty === undefined) {
        return fixer.insertTextAfterRange(
            [headTagObject.range[0], headTagObject.range[0] + 1],
            tagNameText
        );
    }

    return fixer.insertTextBefore(firstProperty, `${tagNameText}, `);
};

const createReplaceTagNameFix = (
    fixer: Readonly<TSESLint.RuleFixer>,
    tagNameExpression: Readonly<TSESTree.Expression>,
    tagName: HeadTagName
): TSESLint.RuleFix =>
    fixer.replaceText(tagNameExpression, JSON.stringify(tagName));

const createSetHeadTagTagNameSuggestion = (
    options: Readonly<{
        headTagObject: Readonly<TSESTree.ObjectExpression>;
        messageId: HeadTagSuggestionMessageId;
        tagName: HeadTagName;
        tagNameExpression: null | Readonly<TSESTree.Expression>;
    }>
): HeadTagSuggestion => ({
    fix: (fixer) =>
        options.tagNameExpression === null
            ? createInsertTagNameFix(
                  fixer,
                  options.headTagObject,
                  options.tagName
              )
            : createReplaceTagNameFix(
                  fixer,
                  options.tagNameExpression,
                  options.tagName
              ),
    messageId: options.messageId,
});

const getHeadTagSuggestions = (
    options: Readonly<{
        headTagObject: Readonly<TSESTree.ObjectExpression>;
        inferredTagName: HeadTagName | null;
        tagNameExpression: null | Readonly<TSESTree.Expression>;
    }>
): readonly HeadTagSuggestion[] => {
    if (options.inferredTagName === "link") {
        return [
            createSetHeadTagTagNameSuggestion({
                ...options,
                messageId: "setHeadTagTagNameLink",
                tagName: "link",
            }),
        ];
    }

    if (options.inferredTagName === "meta") {
        return [
            createSetHeadTagTagNameSuggestion({
                ...options,
                messageId: "setHeadTagTagNameMeta",
                tagName: "meta",
            }),
        ];
    }

    if (options.inferredTagName === "script") {
        return [
            createSetHeadTagTagNameSuggestion({
                ...options,
                messageId: "setHeadTagTagNameScript",
                tagName: "script",
            }),
        ];
    }

    return [
        createSetHeadTagTagNameSuggestion({
            ...options,
            messageId: "setHeadTagTagNameMeta",
            tagName: "meta",
        }),
        createSetHeadTagTagNameSuggestion({
            ...options,
            messageId: "setHeadTagTagNameLink",
            tagName: "link",
        }),
        createSetHeadTagTagNameSuggestion({
            ...options,
            messageId: "setHeadTagTagNameScript",
            tagName: "script",
        }),
    ];
};

/** Rule module for `require-head-tag-tag-name`. */
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

                    const headTagsExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "headTags"
                    );
                    const headTagsArrayExpression =
                        headTagsExpression === null
                            ? null
                            : getArrayExpressionFromExpressionOrIdentifier(
                                  headTagsExpression,
                                  programNode
                              );

                    if (headTagsArrayExpression === null) {
                        return;
                    }

                    for (const headTagEntry of headTagsArrayExpression.elements) {
                        if (headTagEntry?.type !== "ObjectExpression") {
                            continue;
                        }

                        const tagNameExpression = getObjectPropertyValueByName(
                            headTagEntry,
                            "tagName"
                        );

                        if (tagNameExpression !== null) {
                            const staticTagName =
                                getStaticStringValueFromExpressionOrIdentifier(
                                    tagNameExpression,
                                    programNode
                                );

                            if (
                                staticTagName !== null &&
                                staticTagName.trim().length > 0
                            ) {
                                continue;
                            }
                        }

                        const inferredTagName = inferHeadTagName(
                            headTagEntry,
                            programNode
                        );
                        const suggestions = getHeadTagSuggestions({
                            headTagObject: headTagEntry,
                            inferredTagName,
                            tagNameExpression,
                        });

                        context.report({
                            messageId: "requireHeadTagTagName",
                            node: tagNameExpression ?? headTagEntry,
                            suggest: suggestions,
                        });
                    }
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require top-level `headTags` entries to declare a non-empty `tagName`.",
                frozen: false,
                presets: [
                    "config",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: false,
                requiresTypeChecking: false,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/require-head-tag-tag-name",
            },
            hasSuggestions: true,
            messages: {
                requireHeadTagTagName:
                    "Top-level `headTags` entries should declare a non-empty `tagName` so Docusaurus can emit the intended tag.",
                setHeadTagTagNameLink: 'Set `tagName` to `"link"`.',
                setHeadTagTagNameMeta: 'Set `tagName` to `"meta"`.',
                setHeadTagTagNameScript: 'Set `tagName` to `"script"`.',
            },
            schema: [],
            type: "problem",
        },
        name: "require-head-tag-tag-name",
    });

export default rule;
