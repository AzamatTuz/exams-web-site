import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getExams, deleteExam } from "../api/examApi";

export default function Admin() {
    const navigate = useNavigate();

    const [exams, setExams] = useState({});
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const res = await getExams();
            setExams(res.data || {});
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    async function remove(id) {
        try {
            await deleteExam(id);
            load();
            setShowDelete(false);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">
            <Navbar />

            {/* MODAL */}
            {showDelete && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-[#1b263b] border border-white/10 rounded-3xl p-10 w-[420px] shadow-2xl">
                        <h2 className="text-3xl font-black text-white">
                            Удалить экзамен?
                        </h2>

                        <p className="text-gray-400 mt-4">
                            Это действие нельзя отменить
                        </p>

                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={() => remove(selectedId)}
                                className="flex-1 bg-red-500 py-3 rounded-xl font-bold hover:bg-red-600 transition cursor-pointer"
                            >
                                Удалить
                            </button>

                            <button
                                onClick={() => setShowDelete(false)}
                                className="flex-1 bg-gray-700 py-3 rounded-xl font-bold text-white hover:bg-gray-600 transition cursor-pointer"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto p-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-5xl font-black text-white">
                        Админ панель
                    </h1>

                    <button
                        onClick={() => navigate("/admin/create")}
                        className="bg-[#fca311] hover:bg-[#ffb703] px-8 py-4 rounded-2xl font-bold cursor-pointer transition duration-300"
                    >
                        Создать экзамен
                    </button>
                </div>

                {loading && (
                    <p className="text-white text-xl">
                        Загрузка...
                    </p>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(exams).map(([id, exam]) => (
                        <div
                            key={id}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl"
                        >
                            <h2 className="text-3xl font-black text-white">
                                {exam.title}
                            </h2>

                            <p className="text-gray-400 mt-4">
                                Дата: {exam.date}
                            </p>

                            <p className="text-gray-400 mt-2">
                                Заданий: {exam.tasks?.length || 0}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <button
                                    onClick={() => navigate(`/check/${id}`)}
                                    className="bg-blue-500 py-3 rounded-xl font-bold hover:bg-blue-600 transition cursor-pointer"
                                >
                                    Проверка
                                </button>

                                <button
                                    onClick={() => navigate(`/checked/${id}`)}
                                    className="bg-green-500 py-3 rounded-xl font-bold hover:bg-green-600 transition cursor-pointer"
                                >
                                    Архив
                                </button>

                                <button
                                    onClick={() => navigate(`/exam/${id}`)}
                                    className="bg-[#fca311] py-3 rounded-xl font-bold hover:bg-[#ff9d00] transition cursor-pointer"
                                >
                                    Открыть
                                </button>

                                <button
                                    onClick={() => {
                                        setSelectedId(id);
                                        setShowDelete(true);
                                    }}
                                    className="bg-red-500 py-3 rounded-xl font-bold hover:bg-red-600 transition cursor-pointer"
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {!loading && Object.keys(exams).length === 0 && (
                    <div className="bg-[#1b263b] rounded-3xl p-12 text-center mt-10">
                        <h2 className="text-white text-3xl">
                            Экзаменов нет
                        </h2>

                        <p className="text-gray-400 mt-4">
                            Создай первый экзамен
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}