import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getSubmits } from "../api/examApi";

export default function CheckedExam() {
    const { id } = useParams();

    const [students, setStudents] = useState({});

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const res = await getSubmits(id);

        const checked = Object.fromEntries(
            Object.entries(res.data || {}).filter(
                ([, student]) => student.checked
            )
        );

        setStudents(checked);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">
            <Navbar />

            <div className="max-w-6xl mx-auto p-10">
                <h1 className="text-5xl text-white font-black mb-10">
                    Архив проверенных
                </h1>

                {Object.entries(students).map(([id, student]) => (
                    <div
                        key={id}
                        className="bg-[#1b263b] rounded-3xl p-8 mb-8"
                    >
                        <h2 className="text-white text-2xl font-bold">
                            {student.name}
                        </h2>

                        <p className="text-[#fca311] mt-4">
                            Балл: {student.totalScore || student.score}
                        </p>

                        {student.codes?.map((code, i) => (
                            <pre
                                key={i}
                                className="bg-black p-5 rounded-xl mt-4 overflow-auto text-white"
                            >
                                {code}
                            </pre>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}