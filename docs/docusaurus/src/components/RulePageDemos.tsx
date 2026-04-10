import RuleLiveDemo from "./RuleLiveDemo";

const localSearchRuntimeHintCode = `function LocalSearchRuntimeHint() {
    const [mode, setMode] = useState("start");
    const isStaticMode = mode === "serve";

    return (
        <div
            style={{
                border: "1px solid rgb(37 194 160 / 45%)",
                borderRadius: 12,
                padding: 16,
            }}
        >
            <button
                type="button"
                onClick={() => setMode(isStaticMode ? "start" : "serve")}
            >
                Toggle runtime ({mode})
            </button>
            <p style={{ margin: "0.85rem 0 0" }}>
                {isStaticMode
                    ? "The statically built site is being served, so a local-search index can be available."
                    : "The dev server is running, so local-search indexing may not reflect the real built search experience yet."}
            </p>
        </div>
    );
}

render(<LocalSearchRuntimeHint />);`;

const liveCodeBlockPackageDemoCode = `function LiveCodeBlockPackageDemo() {
    const [enabled, setEnabled] = useState(true);

    return (
        <div
            style={{
                border: "1px solid rgb(37 194 160 / 45%)",
                borderRadius: 12,
                padding: 16,
            }}
        >
            <button type="button" onClick={() => setEnabled((value) => !value)}>
                Toggle package installed
            </button>
            <p style={{ margin: "0.85rem 0 0" }}>
                {enabled
                    ? "The theme package is present, so live playground UI can render."
                    : "Without the package, the config can point at a theme that the workspace does not actually own."}
            </p>
        </div>
    );
}

render(<LiveCodeBlockPackageDemo />);`;

const liveCodeBlockConfigDemoCode = `function LiveCodeBlockConfigDemo() {
    const [position, setPosition] = useState("bottom");

    return (
        <div
            style={{
                border: "1px solid rgb(37 194 160 / 45%)",
                borderRadius: 12,
                padding: 16,
            }}
        >
            <button
                type="button"
                onClick={() =>
                    setPosition((value) => (value === "bottom" ? "top" : "bottom"))
                }
            >
                Playground position: {position}
            </button>
            <p style={{ margin: "0.85rem 0 0" }}>
                The live-codeblock theme is what makes a setting like playgroundPosition meaningful to the docs UI.
            </p>
        </div>
    );
}

render(<LiveCodeBlockConfigDemo />);`;

export function LocalSearchRuntimeHintDemo() {
    return <RuleLiveDemo code={localSearchRuntimeHintCode} />;
}

export function LiveCodeBlockPackageDemo() {
    return <RuleLiveDemo code={liveCodeBlockPackageDemoCode} />;
}

export function LiveCodeBlockConfigDemo() {
    return <RuleLiveDemo code={liveCodeBlockConfigDemoCode} />;
}
