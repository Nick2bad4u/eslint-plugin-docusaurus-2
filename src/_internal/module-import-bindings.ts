/**
 * @packageDocumentation
 * Scope-aware helpers for matching ESM imports and their JSX usages.
 */
import {
    AST_NODE_TYPES,
    type TSESLint,
    type TSESTree,
} from "@typescript-eslint/utils";
import { arrayFirst, arrayLast } from "ts-extras";

import type { UnknownArray } from "./types.js";

import { getScopeFromContextSourceCode } from "./scope-resolution.js";
import { getVariableInScopeChain } from "./scope-variable.js";

/** Imported local bindings grouped by ESM import form. */
export type ModuleImportBindings = Readonly<{
    defaultBindings: ReadonlyMap<string, TSESTree.Identifier>;
    namedBindings: ReadonlyMap<
        string,
        ReadonlyMap<string, TSESTree.Identifier>
    >;
    namespaceBindings: ReadonlyMap<string, TSESTree.Identifier>;
}>;

type MutableNamedImportBindings = Map<string, Map<string, TSESTree.Identifier>>;

const getImportedName = (
    specifier: Readonly<TSESTree.ImportSpecifier>
): null | string => {
    const { imported } = specifier;

    if (imported.type === AST_NODE_TYPES.Identifier) {
        return imported.name;
    }

    return typeof imported.value === "string" ? imported.value : null;
};

const collectImportSpecifierBinding = (
    specifier: Readonly<TSESTree.ImportClause>,
    defaultBindings: Map<string, TSESTree.Identifier>,
    namedBindings: MutableNamedImportBindings,
    namespaceBindings: Map<string, TSESTree.Identifier>
): void => {
    if (specifier.type === AST_NODE_TYPES.ImportDefaultSpecifier) {
        defaultBindings.set(specifier.local.name, specifier.local);
        return;
    }

    if (specifier.type === AST_NODE_TYPES.ImportNamespaceSpecifier) {
        namespaceBindings.set(specifier.local.name, specifier.local);
        return;
    }

    if (specifier.importKind === "type") {
        return;
    }

    const importedName = getImportedName(specifier);
    if (importedName === null) {
        return;
    }

    const bindingsForImportedName =
        namedBindings.get(importedName) ??
        new Map<string, TSESTree.Identifier>();
    bindingsForImportedName.set(specifier.local.name, specifier.local);
    namedBindings.set(importedName, bindingsForImportedName);
};

/** Collect default, named, and namespace bindings from one module source. */
export const collectModuleImportBindings = (
    programNode: Readonly<TSESTree.Program>,
    sourceModuleName: string
): ModuleImportBindings => {
    const defaultBindings = new Map<string, TSESTree.Identifier>();
    const mutableNamedBindings: MutableNamedImportBindings = new Map();
    const namespaceBindings = new Map<string, TSESTree.Identifier>();

    for (const statement of programNode.body) {
        if (
            statement.type !== AST_NODE_TYPES.ImportDeclaration ||
            statement.source.value !== sourceModuleName ||
            statement.importKind === "type"
        ) {
            continue;
        }

        for (const specifier of statement.specifiers) {
            collectImportSpecifierBinding(
                specifier,
                defaultBindings,
                mutableNamedBindings,
                namespaceBindings
            );
        }
    }

    return {
        defaultBindings,
        namedBindings: mutableNamedBindings,
        namespaceBindings,
    };
};

const isSameIdentifier = (
    leftIdentifier: Readonly<TSESTree.Identifier>,
    rightIdentifier: Readonly<TSESTree.Identifier>
): boolean =>
    leftIdentifier === rightIdentifier ||
    (arrayFirst(leftIdentifier.range) === arrayFirst(rightIdentifier.range) &&
        arrayLast(leftIdentifier.range) === arrayLast(rightIdentifier.range));

/** Merge imported local-binding maps without losing their identifier nodes. */
export const combineImportBindings = (
    ...bindingMaps: readonly ReadonlyMap<string, TSESTree.Identifier>[]
): ReadonlyMap<string, TSESTree.Identifier> => {
    const combinedBindings = new Map<string, TSESTree.Identifier>();

    for (const bindingMap of bindingMaps) {
        for (const [localName, identifier] of bindingMap) {
            combinedBindings.set(localName, identifier);
        }
    }

    return combinedBindings;
};

/** Check whether an imported local binding is the visible binding at a node. */
export const isImportBindingVisibleAtNode = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    node: Readonly<TSESTree.Node>,
    importIdentifier: Readonly<TSESTree.Identifier>
): boolean => {
    const scope = getScopeFromContextSourceCode(context, node);

    if (scope === null) {
        return false;
    }

    const variable = getVariableInScopeChain(scope, importIdentifier.name);

    return (
        variable?.identifiers.some((identifier) =>
            isSameIdentifier(identifier, importIdentifier)
        ) ?? false
    );
};

/** Check whether a direct identifier resolves to one of the imported bindings. */
export const isDirectImportedIdentifier = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    identifier: Readonly<TSESTree.Identifier | TSESTree.JSXIdentifier>,
    importBindings: ReadonlyMap<string, TSESTree.Identifier>
): boolean => {
    const importIdentifier = importBindings.get(identifier.name);

    return (
        importIdentifier !== undefined &&
        isImportBindingVisibleAtNode(context, identifier, importIdentifier)
    );
};

/** Resolve the first imported local name that remains visible at a node. */
export const getVisibleImportLocalNameAtNode = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    node: Readonly<TSESTree.Node>,
    importBindings: ReadonlyMap<string, TSESTree.Identifier>
): string | undefined => {
    for (const [localName, importIdentifier] of importBindings) {
        if (isImportBindingVisibleAtNode(context, node, importIdentifier)) {
            return localName;
        }
    }

    return undefined;
};

/** Check a direct `namespace.exportName` member against an imported namespace. */
export const isImportedNamespaceMember = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    objectIdentifier: Readonly<TSESTree.Identifier | TSESTree.JSXIdentifier>,
    propertyIdentifier: Readonly<TSESTree.Identifier | TSESTree.JSXIdentifier>,
    namespaceBindings: ReadonlyMap<string, TSESTree.Identifier>,
    expectedPropertyName: string
): boolean =>
    propertyIdentifier.name === expectedPropertyName &&
    isDirectImportedIdentifier(context, objectIdentifier, namespaceBindings);

/** Match a JSX tag imported directly or through a namespace export. */
export const isImportedJsxTagName = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    tagName: Readonly<TSESTree.JSXTagNameExpression>,
    directBindings: ReadonlyMap<string, TSESTree.Identifier>,
    namespaceBindings: ReadonlyMap<string, TSESTree.Identifier>,
    namespaceExportName: string
): boolean => {
    if (tagName.type === AST_NODE_TYPES.JSXIdentifier) {
        return isDirectImportedIdentifier(context, tagName, directBindings);
    }

    return (
        tagName.type === AST_NODE_TYPES.JSXMemberExpression &&
        tagName.object.type === AST_NODE_TYPES.JSXIdentifier &&
        isImportedNamespaceMember(
            context,
            tagName.object,
            tagName.property,
            namespaceBindings,
            namespaceExportName
        )
    );
};

/** Match a call target imported directly or through a namespace export. */
export const isImportedCallTarget = <
    MessageIds extends string,
    Options extends Readonly<UnknownArray>,
>(
    context: Readonly<TSESLint.RuleContext<MessageIds, Options>>,
    callee: Readonly<TSESTree.CallExpression["callee"]>,
    directBindings: ReadonlyMap<string, TSESTree.Identifier>,
    namespaceBindings: ReadonlyMap<string, TSESTree.Identifier>,
    namespaceExportName: string
): boolean => {
    if (callee.type === AST_NODE_TYPES.Identifier) {
        return isDirectImportedIdentifier(context, callee, directBindings);
    }

    return (
        callee.type === AST_NODE_TYPES.MemberExpression &&
        !callee.computed &&
        callee.object.type === AST_NODE_TYPES.Identifier &&
        callee.property.type === AST_NODE_TYPES.Identifier &&
        isImportedNamespaceMember(
            context,
            callee.object,
            callee.property,
            namespaceBindings,
            namespaceExportName
        )
    );
};
