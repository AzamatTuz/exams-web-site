import Editor from "@monaco-editor/react";

export default function ExamCard({
    i,
    task,
    codes,
    outputs,
    handleChange,
    runCode,
    isSubmitted
}) {
    return (
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl flex flex-col items-center">
            <article className="w-full">
                <div className="flex flex-col justify-between mb-5">
                    <h2 className="text-[#fca311] font-black text-2xl">
                        Задание {i + 1}
                    </h2>

                    <details className="mt-5">
                        <summary className="cursor-pointer text-gray-300">
                            Показать
                        </summary>

                        <p className="mt-4 text-white max-w-sm whitespace-pre-wrap overflow-x-auto">
                            {task}
                        </p>
                    </details>
                </div>
            </article>

            <Editor
                height="300px"
                language="javascript"
                theme="vs-dark"
                value={codes[i]}
                onChange={(v) => handleChange(i, v)}
                onMount={(editor, monaco) => {

                    const blockedKeys = [
                        monaco.KeyCode.KeyC,
                        monaco.KeyCode.KeyV,
                        monaco.KeyCode.KeyX,
                        monaco.KeyCode.KeyA
                    ];

                    blockedKeys.forEach((key) => {
                        editor.addCommand(
                            monaco.KeyMod.CtrlCmd | key,
                            () => { }
                        );
                    });


                    const node = editor.getDomNode();

                    node?.addEventListener("copy", (e) => e.preventDefault());
                    node?.addEventListener("paste", (e) => e.preventDefault());
                    node?.addEventListener("cut", (e) => e.preventDefault());
                    node?.addEventListener("contextmenu", (e) => e.preventDefault());


                    editor.onKeyDown((e) => {
                        const ctrl = e.ctrlKey || e.metaKey;

                        if (ctrl && blockedKeys.includes(e.keyCode)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                }}
                options={{
                    readOnly: isSubmitted,
                    minimap: { enabled: false },
                    contextmenu: false,
                    copyWithSyntaxHighlighting: false,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: false
                }}
            />

            <button
                disabled={isSubmitted}
                onClick={() => runCode(i)}
                className="mt-5 bg-[#fca311] hover:bg-[#ffb703] px-6 py-3 rounded-2xl font-bold cursor-pointer w-full"
            >
                Проверить
            </button>

            <pre className="bg-black/50 mt-5 rounded-2xl p-5 text-white h-28 overflow-auto w-full">
                {outputs[i]}
            </pre>
        </div>
    );
}