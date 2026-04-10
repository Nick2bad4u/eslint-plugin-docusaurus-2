import CodeBlock from "@theme/CodeBlock";

type RuleLiveDemoProps = Readonly<{
    code: string;
}>;

export default function RuleLiveDemo({ code }: RuleLiveDemoProps) {
    return (
        <CodeBlock language="jsx" metastring="live noInline">
            {code}
        </CodeBlock>
    );
}
