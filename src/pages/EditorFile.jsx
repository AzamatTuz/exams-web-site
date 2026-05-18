import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getExam, submitExam, getStudentResult } from "../api/examApi";

import ExamLoading from "../components/Editor/ExamLoading.jsx";
import SubmitModal from "../components/Editor/SubmitModal.jsx";
import MessagePopup from "../components/Editor/MessagePopup.jsx";
import ExamHeader from "../components/Editor/ExamHeader.jsx";
import ExamCard from "../components/Editor/ExamCard.jsx";
import TabTracker from "../components/TabTracker";

export default function EditorFile() {
    const { id } = useParams();

    const [exam, setExam] = useState(null);
    const [codes, setCodes] = useState([]);
    const [outputs, setOutputs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [warnings,setWarnings]=useState(0);
    const [warningText,setWarningText]=useState("");

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

            setOutputs(Array(res.data.tasks.length).fill(""));

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
                codes,
                createdAt: new Date().toISOString()
            });

            localStorage.removeItem(`exam_${id}_${user.uid}`);

            setIsSubmitted(true);
            setMessage("Экзамен отправлен");
            setShowConfirm(false);
            setCodes([]);
        } catch (e) {
            console.log(e);
        }
    }

    if (loading) return <ExamLoading />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
            <Navbar />

            <TabTracker
                finish={finish}
                setWarnings={setWarnings}
                setWarningText={setWarningText}
            />

            {warningText && (
                <div className="fixed top-24 right-6 z-[100] bg-[#0f172a] border-red-500 border px-8 py-4 rounded-2xl text-white shadow-2xl animate-pulse">
                    {warningText}
                </div>
            )}

            <MessagePopup message={message} />

            <SubmitModal
                showConfirm={showConfirm}
                finish={finish}
                setShowConfirm={setShowConfirm}
            />

            <div className="max-w-7xl mx-auto p-10">
                <ExamHeader exam={exam} />

                <div className="fixed bottom-8 right-8 z-50">
                    <button
                        disabled={isSubmitted}
                        onClick={() => setShowConfirm(true)}
                        className={`px-10 py-5 rounded-3xl font-black text-lg shadow-2xl ${
                            isSubmitted
                                ? "bg-gray-500"
                                : "bg-[#fca311] hover:bg-[#ffb703]"
                        }`}
                    >
                        {isSubmitted ? "Уже отправлено" : "Отправить экзамен"}
                    </button>
                </div>

                <div
                    className={`grid gap-10 ${
                        exam.tasks.length > 3 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                >
                    {exam.tasks.map((task, i) => (
                        <ExamCard
                            key={i}
                            i={i}
                            task={task}
                            codes={codes}
                            outputs={outputs}
                            handleChange={handleChange}
                            runCode={runCode}
                            isSubmitted={isSubmitted}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}