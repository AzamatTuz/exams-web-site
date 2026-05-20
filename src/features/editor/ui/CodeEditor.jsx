import Editor from "@monaco-editor/react";

export default function CodeEditor({
                                       index,
                                       code,
                                       output,
                                       handleChange,
                                       runCode
                                   }) {
    return (
        <div className="bg-[#1b263b] rounded-3xl p-5 border border-[#415a77] shadow-xl">
            <div className="flex justify-between mb-4">
                <h1 className="text-[#fca311] font-bold text-xl">
                    Задание {index + 1}
                </h1>

                <button
                    onClick={() => runCode(index)}
                    className="bg-green-500 px-5 py-2 rounded-xl font-bold hover:bg-green-600 duration-200"
                >
                    Проверка
                </button>
            </div>

            <Editor
                height="250px"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) =>
                    handleChange(index, value || "")
                }
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    automaticLayout: true,
                    quickSuggestions: true,
                    suggestOnTriggerCharacters: true,
                    tabCompletion: "on"
                }}
            />

            <div className="mt-4 bg-black rounded-xl p-4 h-[120px] overflow-auto text-green-400 border border-gray-700">
                <pre>
                    {output || "Консоль"}
                </pre>
            </div>
        </div>
    );
}