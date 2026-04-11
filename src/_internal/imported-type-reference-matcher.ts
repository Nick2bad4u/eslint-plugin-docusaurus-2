import type { TSESTree } from "@typescript-eslint/utils";

type ImportedTypeReferenceMatcherOptions = Readonly<{
    fallbackTypeNames?: readonly string[];
    importSource: string;
    typeName: string;
}>;

const getImportedTypeReferenceNames = (
    programNode: Readonly<TSESTree.Program>,
    options: ImportedTypeReferenceMatcherOptions
): Readonly<{
    directTypeNames: ReadonlySet<string>;
    namespaceImportNames: ReadonlySet<string>;
}> => {
    const directTypeNames = new Set(
        options.fallbackTypeNames ?? [options.typeName]
    );
    const namespaceImportNames = new Set<string>();

    for (const statement of programNode.body) {
        if (
            statement.type !== "ImportDeclaration" ||
            statement.source.value !== options.importSource
        ) {
            continue;
        }

        for (const specifier of statement.specifiers) {
            if (
                specifier.type === "ImportSpecifier" &&
                specifier.imported.type === "Identifier" &&
                specifier.imported.name === options.typeName
            ) {
                directTypeNames.add(specifier.local.name);
            }

            if (specifier.type === "ImportNamespaceSpecifier") {
                namespaceImportNames.add(specifier.local.name);
            }
        }
    }

    return {
        directTypeNames,
        namespaceImportNames,
    };
};

export const createImportedTypeReferenceMatcher = (
    programNode: Readonly<TSESTree.Program>,
    options: ImportedTypeReferenceMatcherOptions
) => {
    const importedTypeReferenceNames = getImportedTypeReferenceNames(
        programNode,
        options
    );

    return (
        typeNode: Readonly<TSESTree.TypeNode>
    ): typeNode is TSESTree.TSTypeReference => {
        if (typeNode.type !== "TSTypeReference") {
            return false;
        }

        if (typeNode.typeName.type === "Identifier") {
            return importedTypeReferenceNames.directTypeNames.has(
                typeNode.typeName.name
            );
        }

        return (
            typeNode.typeName.type === "TSQualifiedName" &&
            typeNode.typeName.left.type === "Identifier" &&
            typeNode.typeName.right.type === "Identifier" &&
            importedTypeReferenceNames.namespaceImportNames.has(
                typeNode.typeName.left.name
            ) &&
            typeNode.typeName.right.name === options.typeName
        );
    };
};
