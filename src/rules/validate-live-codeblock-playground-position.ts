/**
 * @packageDocumentation
 * ESLint rule implementation for `validate-live-codeblock-playground-position`.
 */
import type { TSESLint, TSESTree } from "@typescript-eslint/utils";

import { arrayIncludes } from "ts-extras";

import {
    getDefaultExportedObjectExpression,
    getObjectExpressionFromExpressionOrIdentifier,
    getObjectPropertyValueByName,
    getStaticStringValueFromExpressionOrIdentifier,
    isDocusaurusConfigFilePath,
} from "../_internal/docusaurus-config-ast.js";
import { createTypedRule } from "../_internal/typed-rule.js";

const defaultOptions = [] as const;
const validPlaygroundPositions = ["bottom", "top"] as const;

type MessageIds =
    | "setPlaygroundPositionBottom"
    | "setPlaygroundPositionTop"
    | "validateLiveCodeblockPlaygroundPosition";
type PlaygroundPosition = (typeof validPlaygroundPositions)[number];
type RuleSuggestion = NonNullable<
    Parameters<
        TSESLint.RuleContext<MessageIds, typeof defaultOptions>["report"]
    >[0]["suggest"]
>[number];

const createSetPlaygroundPositionSuggestion = (
    options: Readonly<{
        messageId: "setPlaygroundPositionBottom" | "setPlaygroundPositionTop";
        playgroundPosition: PlaygroundPosition;
        playgroundPositionExpression: Readonly<TSESTree.Expression>;
    }>
): RuleSuggestion => ({
    fix: (fixer) =>
        fixer.replaceText(
            options.playgroundPositionExpression,
            JSON.stringify(options.playgroundPosition)
        ),
    messageId: options.messageId,
});

/** Rule module for `validate-live-codeblock-playground-position`. */
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

                    const themeConfigExpression = getObjectPropertyValueByName(
                        configObjectExpression,
                        "themeConfig"
                    );
                    const themeConfigObject =
                        themeConfigExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  themeConfigExpression,
                                  programNode
                              );

                    if (themeConfigObject === null) {
                        return;
                    }

                    const liveCodeBlockExpression =
                        getObjectPropertyValueByName(
                            themeConfigObject,
                            "liveCodeBlock"
                        );
                    const liveCodeBlockObject =
                        liveCodeBlockExpression === null
                            ? null
                            : getObjectExpressionFromExpressionOrIdentifier(
                                  liveCodeBlockExpression,
                                  programNode
                              );

                    if (liveCodeBlockObject === null) {
                        return;
                    }

                    const playgroundPositionExpression =
                        getObjectPropertyValueByName(
                            liveCodeBlockObject,
                            "playgroundPosition"
                        );

                    if (playgroundPositionExpression === null) {
                        return;
                    }

                    const playgroundPosition =
                        getStaticStringValueFromExpressionOrIdentifier(
                            playgroundPositionExpression,
                            programNode
                        );

                    if (playgroundPosition === null) {
                        return;
                    }

                    if (
                        arrayIncludes(
                            validPlaygroundPositions,
                            playgroundPosition as PlaygroundPosition
                        )
                    ) {
                        return;
                    }

                    context.report({
                        messageId: "validateLiveCodeblockPlaygroundPosition",
                        node: playgroundPositionExpression,
                        suggest: [
                            createSetPlaygroundPositionSuggestion({
                                messageId: "setPlaygroundPositionTop",
                                playgroundPosition: "top",
                                playgroundPositionExpression,
                            }),
                            createSetPlaygroundPositionSuggestion({
                                messageId: "setPlaygroundPositionBottom",
                                playgroundPosition: "bottom",
                                playgroundPositionExpression,
                            }),
                        ],
                    });
                },
            };
        },
        defaultOptions,
        meta: {
            deprecated: false,
            docs: {
                description:
                    "require `themeConfig.liveCodeBlock.playgroundPosition` to use a supported Docusaurus value.",
                frozen: false,
                presets: [
                    "config",
                    "recommended",
                    "strict",
                    "all",
                    "experimental",
                ],
                recommended: true,
                url: "https://nick2bad4u.github.io/eslint-plugin-docusaurus-2/docs/rules/validate-live-codeblock-playground-position",
            },
            hasSuggestions: true,
            messages: {
                setPlaygroundPositionBottom:
                    'Set `themeConfig.liveCodeBlock.playgroundPosition` to `"bottom"`.',
                setPlaygroundPositionTop:
                    'Set `themeConfig.liveCodeBlock.playgroundPosition` to `"top"`.',
                validateLiveCodeblockPlaygroundPosition:
                    '`themeConfig.liveCodeBlock.playgroundPosition` must be `"top"` or `"bottom"`.',
            },
            schema: [],
            type: "problem",
        },
        name: "validate-live-codeblock-playground-position",
    });

export default rule;
