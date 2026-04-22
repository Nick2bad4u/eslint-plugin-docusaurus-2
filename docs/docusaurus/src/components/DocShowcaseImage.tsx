import useBaseUrl from "@docusaurus/useBaseUrl";

type DocShowcaseImageProps = Readonly<{
    alt: string;
    assetPath: `/${string}`;
    compact?: boolean;
}>;

const DOC_SHOWCASE_IMAGE_CLASS_NAME = "doc-showcase-image";
const DOC_SHOWCASE_IMAGE_COMPACT_CLASS_NAME = "doc-showcase-image--compact";

const getClassName = (compact: boolean): string =>
    compact
        ? `${DOC_SHOWCASE_IMAGE_CLASS_NAME} ${DOC_SHOWCASE_IMAGE_COMPACT_CLASS_NAME}`
        : DOC_SHOWCASE_IMAGE_CLASS_NAME;

/** Renders a rule showcase image with optional compact layout. */
export default function DocShowcaseImage({
    alt,
    assetPath,
    compact = false,
}: DocShowcaseImageProps) {
    return (
        <img
            alt={alt}
            className={getClassName(compact)}
            src={useBaseUrl(assetPath)}
        />
    );
}
