/**
 * Repair stale third-party dependency metadata before npm resolves the tree.
 *
 * This root-owned npm configuration is excluded from published tarballs. Keep
 * every repair exact and fail when upstream metadata changes so the workaround
 * cannot silently outlive the defect it addresses.
 */

/**
 * @typedef {object} DependencyManifest
 *
 * @property {string} [name]
 * @property {Record<string, string>} [peerDependencies]
 * @property {string} [version]
 */

/**
 * @typedef {object} TypeScriptPeerRepair
 *
 * @property {string} declaredTypeScriptPeer
 * @property {string} name
 * @property {string} supportedTypeScriptPeer
 * @property {string} version
 */

/** @type {readonly TypeScriptPeerRepair[]} */
const TYPESCRIPT_PEER_REPAIRS = [
    {
        declaredTypeScriptPeer: "^5.4.4",
        name: "madge",
        supportedTypeScriptPeer: "^5.4.4 || ^6.0.0",
        version: "8.0.0",
    },
    {
        declaredTypeScriptPeer: "^5.0.0",
        name: "tsconfck",
        supportedTypeScriptPeer: "^5.0.0 || ^6.0.0",
        version: "3.1.6",
    },
];

/**
 * Allow optional TypeScript integrations to use the TypeScript 6 toolchain
 * exercised by this repository's build and dependency-analysis checks.
 *
 * @param {DependencyManifest} manifest The candidate dependency manifest.
 *
 * @returns {DependencyManifest} The effective manifest used for resolution.
 */
export function transformManifest(manifest) {
    const repair = TYPESCRIPT_PEER_REPAIRS.find(
        (candidate) =>
            candidate.name === manifest.name &&
            candidate.version === manifest.version
    );

    if (repair === undefined) {
        return manifest;
    }

    const declaredTypeScriptPeer = manifest.peerDependencies?.["typescript"];

    if (declaredTypeScriptPeer !== repair.declaredTypeScriptPeer) {
        throw new Error(
            `Remove or update the ${repair.name}@${repair.version} TypeScript peer repair: expected ${repair.declaredTypeScriptPeer}, received ${String(declaredTypeScriptPeer)}.`
        );
    }

    return {
        ...manifest,
        peerDependencies: {
            ...manifest.peerDependencies,
            typescript: repair.supportedTypeScriptPeer,
        },
    };
}
