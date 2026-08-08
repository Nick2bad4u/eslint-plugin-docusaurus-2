/**
 * @packageDocumentation
 * Import-aware AST helpers for Docusaurus translation rules.
 *
 * The text-label semantics are adapted from `@docusaurus/eslint-plugin`
 * under the MIT License.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { setHas } from "ts-extras";

import type { UnknownArray } from "./types.js";

import { getStaticStringValue } from "./docusaurus-config-ast.js";
import {
    collectModuleImportBindings,
    combineImportBindings,
    isImportedCallTarget,
    isImportedJsxTagName,
    type ModuleImportBindings,
} from "./module-import-bindings.js";

/** Module source containing Docusaurus translation APIs. */
const docusaurusTranslateModuleSource = "@docusaurus/Translate" as const;

/** Imported bindings used by the Docusaurus translation API. */
export type DocusaurusTranslateBindings = Readonly<{
    componentBindings: ReadonlyMap<string, TSESTree.Identifier>;
    moduleBindings: ModuleImportBindings;
    translateFunctionBindings: ReadonlyMap<string, TSESTree.Identifier>;
}>;

/** Collect default `Translate`, named `translate`, and namespace imports. */
export const collectDocusaurusTranslateBindings = (
    programNode: Readonly<TSESTree.Program>
): DocusaurusTranslateBindings => {
    const moduleBindings = collectModuleImportBindings(
        programNode,
        docusaurusTranslateModuleSource
    );

    return {
        componentBindings: combineImportBindings(
            moduleBindings.defaultBindings,
            moduleBindings.namedBindings.get("default") ?? new Map()
        ),
        moduleBindings,
        translateFunctionBindings:
            moduleBindings.namedBindings.get("translate") ?? new Map(),
    };
};

/** Match the imported Docusaurus `Translate` component. */
export const isDocusaurusTranslateTagName = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    tagName: Readonly<TSESTree.JSXTagNameExpression>,
    bindings: DocusaurusTranslateBindings
): boolean =>
    isImportedJsxTagName(
        context,
        tagName,
        bindings.componentBindings,
        bindings.moduleBindings.namespaceBindings,
        "default"
    );

/** Match the imported Docusaurus `translate(...)` function. */
export const isDocusaurusTranslateCall = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    callee: Readonly<TSESTree.CallExpression["callee"]>,
    bindings: DocusaurusTranslateBindings
): boolean =>
    isImportedCallTarget(
        context,
        callee,
        bindings.translateFunctionBindings,
        bindings.moduleBindings.namespaceBindings,
        "translate"
    );

/** Resolve hardcoded JSX text or expression text without substitutions. */
const getStaticTextFromJsxChild = (
    child: Readonly<TSESTree.JSXChild>
): null | string => {
    if (child.type === AST_NODE_TYPES.JSXText) {
        return child.value;
    }

    if (
        child.type !== AST_NODE_TYPES.JSXExpressionContainer ||
        child.expression.type === AST_NODE_TYPES.JSXEmptyExpression
    ) {
        return null;
    }

    return getStaticStringValue(child.expression);
};

/** Check whether a static label contains text not covered by ignored tokens. */
export const isUntranslatedTextLabel = (
    child: Readonly<TSESTree.JSXChild>,
    ignoredStrings: ReadonlySet<string>
): boolean => {
    const text = getStaticTextFromJsxChild(child);

    if (text === null || text.trim().length === 0) {
        return false;
    }

    const tokens = text.trim().match(/\S+/gv) ?? [];

    return tokens.some((token) => !setHas(ignoredStrings, token));
};

/** Check whether a Translate child is static message text or non-rendered JSX. */
export const isStaticTranslateMessageChild = (
    child: Readonly<TSESTree.JSXChild>
): boolean =>
    (child.type === AST_NODE_TYPES.JSXExpressionContainer &&
        child.expression.type === AST_NODE_TYPES.JSXEmptyExpression) ||
    getStaticTextFromJsxChild(child) !== null;

/** Check whether a child is nested anywhere inside imported `Translate`. */
export const isWithinDocusaurusTranslate = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    child: Readonly<TSESTree.JSXChild>,
    bindings: DocusaurusTranslateBindings
): boolean => {
    let currentNode: Readonly<TSESTree.Node> = child.parent;

    while (currentNode.type !== AST_NODE_TYPES.Program) {
        if (
            currentNode.type === AST_NODE_TYPES.JSXElement &&
            isDocusaurusTranslateTagName(
                context,
                currentNode.openingElement.name,
                bindings
            )
        ) {
            return true;
        }

        currentNode = currentNode.parent;
    }

    return false;
};
