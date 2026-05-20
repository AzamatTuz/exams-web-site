import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../widgets/navbar/Navbar.jsx";
import Student from "../entities/student/ui/Student.jsx";

import { getSubmits, checkStudent } from "../features/exam/api/examApi.js";

export default function CheckExam() {
    const { id } = useParams();

    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    async function load() {
        try {
            const res = await getSubmits(id);

            const filtered = Object.fromEntries(
                Object.entries(res.data || {}).filter(
                    ([, student]) => !student.checked
                )
            );

            setStudents(filtered);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    async function save(studentId, scores) {
        const total = scores.reduce(
            (a, b) => a + Number(b || 0),
            0
        );

        await checkStudent(id, studentId, {
            checked: true,
            totalScore: total,
            scores
        });

        load();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77]">
            <Navbar />

            <div className="max-w-6xl mx-auto p-10">
                <h1 className="text-5xl font-black text-white mb-10">
                    Непроверенные работы
                </h1>

                {loading && (
                    <p className="text-white">
                        Загрузка...
                    </p>
                )}

                {!loading && Object.keys(students).length === 0 && (
                    <div className="bg-[#1b263b] rounded-3xl p-10 text-center">
                        <h2 className="text-white text-3xl">
                            Все работы проверены ✅
                        </h2>
                    </div>
                )}

                {Object.entries(students).map(([studentId, student]) => (
                    <Student
                        key={studentId}
                        student={student}
                        save={(scores) => save(studentId, scores)}
                    />
                ))}
            </div>
        </div>
    );
}