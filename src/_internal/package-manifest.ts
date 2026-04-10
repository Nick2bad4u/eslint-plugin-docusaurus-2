import * as fs from "node:fs";
import * as path from "node:path";

/**
 * @packageDocumentation
 * Shared helpers for resolving the nearest package.json manifest and checking declared dependencies.
 */

/** Resolved nearest package manifest metadata used by package-installed rules. */
export type ResolvedPackageManifest = Readonly<{
    dependencyNames: ReadonlySet<string>;
    packageJsonPath: string;
}>;
type PackageDependencyMap = Readonly<Record<string, string>>;

type PackageManifestRecord = Readonly<{
    dependencies?: PackageDependencyMap;
    devDependencies?: PackageDependencyMap;
    optionalDependencies?: PackageDependencyMap;
    peerDependencies?: PackageDependencyMap;
}>;

const packageManifestCache = new Map<string, null | ResolvedPackageManifest>();

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

const getDependencyNamesFromManifest = (
    manifestRecord: Readonly<PackageManifestRecord>
): ReadonlySet<string> => {
    const dependencyNames = new Set<string>();

    for (const dependencyFieldName of [
        "dependencies",
        "devDependencies",
        "optionalDependencies",
        "peerDependencies",
    ] as const) {
        const dependencyField = manifestRecord[dependencyFieldName];

        if (!isRecord(dependencyField)) {
            continue;
        }

        for (const dependencyName of Object.keys(dependencyField)) {
            dependencyNames.add(dependencyName);
        }
    }

    return dependencyNames;
};

const readResolvedPackageManifest = (
    packageJsonPath: string
): null | ResolvedPackageManifest => {
    try {
        const packageJsonText = fs
            .readFileSync(packageJsonPath)
            .toString("utf8");
        const parsedPackageJson = JSON.parse(packageJsonText) as unknown;

        if (!isRecord(parsedPackageJson)) {
            return null;
        }

        return {
            dependencyNames: getDependencyNamesFromManifest(
                parsedPackageJson as PackageManifestRecord
            ),
            packageJsonPath,
        };
    } catch {
        return null;
    }
};

const findNearestPackageJsonPath = (filePath: string): null | string => {
    let currentDirectoryPath = path.dirname(path.resolve(filePath));

    while (true) {
        const packageJsonPath = path.join(currentDirectoryPath, "package.json");

        if (fs.existsSync(packageJsonPath)) {
            return packageJsonPath;
        }

        const parentDirectoryPath = path.dirname(currentDirectoryPath);

        if (parentDirectoryPath === currentDirectoryPath) {
            return null;
        }

        currentDirectoryPath = parentDirectoryPath;
    }
};

/** Find and cache the nearest package manifest for a config file path. */
export const getNearestPackageManifest = (
    filePath: string
): null | ResolvedPackageManifest => {
    const cacheKey = path.resolve(filePath);
    const cachedManifest = packageManifestCache.get(cacheKey);

    if (cachedManifest !== undefined) {
        return cachedManifest;
    }

    const packageJsonPath = findNearestPackageJsonPath(filePath);
    const manifest =
        packageJsonPath === null
            ? null
            : readResolvedPackageManifest(packageJsonPath);

    packageManifestCache.set(cacheKey, manifest);

    return manifest;
};

/** Check whether a package is declared in the nearest package manifest. */
export const isPackageDeclaredInNearestManifest = (
    filePath: string,
    packageName: string
): boolean => {
    const manifest = getNearestPackageManifest(filePath);

    return manifest?.dependencyNames.has(packageName) ?? false;
};

/** Check whether any package from a candidate list is declared nearby. */
export const isAnyPackageDeclaredInNearestManifest = (
    filePath: string,
    packageNames: readonly string[]
): boolean => {
    const manifest = getNearestPackageManifest(filePath);

    return (
        manifest !== null &&
        packageNames.some((packageName) =>
            manifest.dependencyNames.has(packageName)
        )
    );
};
