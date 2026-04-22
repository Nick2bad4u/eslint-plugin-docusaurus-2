import CodeBlock from "@theme/CodeBlock";

type RuleLiveDemoProps = Readonly<{
    code: string;
}>;

/** Renders a live interactive demo code block for a rule documentation page. */
export default function RuleLiveDemo({ code }: RuleLiveDemoProps) {
    return (
        <CodeBlock language="jsx" metastring="live noInline">
            {code}
        </CodeBlock>
    );
}
