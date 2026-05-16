import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import Navbar from "../components/Navbar";
import { getExam, submitExam, getStudentResult } from "../api/examApi";

export default function EditorFile() {
    const { id } = useParams();

    const [exam, setExam] = useState(null);
    const [codes, setCodes] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const res = await getExam(id);
            setExam(res.data);

            const user = JSON.parse(localStorage.getItem("auth_user"));
            const storageKey = `exam_${id}_${user?.uid}`;

            const savedCodes = JSON.parse(localStorage.getItem(storageKey));

            setCodes(
                savedCodes || Array(res.data.tasks.length).fill("")
            );

            setOutputs(
                Array(res.data.tasks.length).fill("")
            );

            if (user) {
                const submit = await getStudentResult(id, user.uid);
                if (submit.data) setIsSubmitted(true);
            }

            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    function handleChange(i, value) {
        const arr = [...codes];
        arr[i] = value || "";
        setCodes(arr);

        const user = JSON.parse(localStorage.getItem("auth_user"));
        const storageKey = `exam_${id}_${user?.uid}`;

        localStorage.setItem(storageKey, JSON.stringify(arr));
    }

    function runCode(index) {
        let logs = [];

        try {
            const original = console.log;

            console.log = (...args) => {
                logs.push(args.join(" "));
            };

            new Function(codes[index])();

            console.log = original;

            const arr = [...outputs];
            arr[index] = logs.join("\n") || "Пусто";

            setOutputs(arr);
        } catch (e) {
            const arr = [...outputs];
            arr[index] = e.message;
            setOutputs(arr);
        }
    }

    async function finish() {
        if (isSubmitted) {
            setMessage("Вы уже отправили экзамен");
            return;
        }

        const user = JSON.parse(localStorage.getItem("auth_user"));

        try {
            await submitExam(id, user.uid, {
                name: user.name,
                email: user.email,
                codes: codes,
                createdAt: new Date().toISOString()
            });

            const storageKey = `exam_${id}_${user.uid}`;
            localStorage.removeItem(storageKey);

            setIsSubmitted(true);
            setMessage("Экзамен отправлен ✅");
            setShowConfirm(false);
            setCodes([]);
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] flex items-center justify-center">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-24 h-24 border-[8px] border-[#fca311] border-t-transparent rounded-full animate-spin" />
                    <h1 className="text-white text-4xl font-black animate-pulse">Загрузка...</h1>
                    <p className="text-gray-400">Подождите немного</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
            <Navbar />

            {message && (
                <div className="fixed top-6 right-6 z-[100] bg-[#0f172a] border border-green-500 px-8 py-4 rounded-2xl text-white shadow-2xl animate-pulse">
                    {message}
                </div>
            )}

            {showConfirm && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[200]">
                    <div className="bg-[#1e293b] w-[450px] rounded-3xl p-10 border border-[#334155] shadow-2xl">
                        <h2 className="text-3xl font-black text-white">Отправить экзамен?</h2>
                        <p className="text-gray-400 mt-4">После отправки изменить ответы нельзя</p>

                        <div className="flex gap-4 mt-8">
                            <button onClick={finish} className="flex-1 bg-green-500 py-4 rounded-2xl font-bold">
                                Да
                            </button>
                            <button onClick={() => setShowConfirm(false)} className="flex-1 bg-red-500 py-4 rounded-2xl font-bold">
                                Нет
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto p-10">
                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        disabled={isSubmitted}
                        onClick={() => setShowConfirm(true)}
                        className={`
            px-10 py-5 rounded-3xl font-black text-lg shadow-2xl transition
            ${isSubmitted ? "bg-gray-500" : "bg-[#fca311] hover:bg-[#ffb703]"}
        `}
                    >
                        {isSubmitted ? "Уже отправлено" : "Отправить экзамен"}
                    </button>
                </div>
                <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-10 mb-12">
                    <h1 className="text-6xl font-black text-white">{exam.title}</h1>
                    <p className="text-gray-300 mt-4 text-xl">Дата: {exam.date}</p>
                </div>

                <div className={`grid gap-10 ${exam.tasks.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {exam.tasks.map((task, i) => (
                        <div
                            key={i}
                            className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 shadow-xl flex flex-col items-center"
                        >
                            <article className=" w-full">
                                <div className="flex justify-between mb-5">
                                <h2 className="text-[#fca311] font-black text-2xl">
                                    Задание {i + 1}
                                </h2>

                                <details>
                                    <summary className="cursor-pointer text-gray-300">Показать</summary>
                                    <p className="mt-4 text-white max-w-sm">{task}</p>
                                </details>
                            </div>
                            </article>

                            <Editor
                                height="400px"
                                language="javascript"
                                theme="vs-dark"
                                value={codes[i]}
                                onChange={(v) => handleChange(i, v)}
                                options={{
                                    readOnly: isSubmitted,
                                    minimap: { enabled: false }
                                }}
                            />

                            <button
                                disabled={isSubmitted}
                                onClick={() => runCode(i)}
                                className="mt-5 bg-[#fca311] hover:bg-[#ffb703] px-6 py-3 rounded-2xl font-bold cursor-pointer"
                            >
                                Проверить
                            </button>

                            <pre className="bg-black/50 mt-5 rounded-2xl p-5 text-white h-28 overflow-auto w-full">
                                {outputs[i]}
                            </pre>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}