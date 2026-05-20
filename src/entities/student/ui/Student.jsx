import { useState } from "react";

export default function Student({ student, save }) {
    const [scores, setScores] = useState([0, 0, 0, 0]);

    return (
        <div className="bg-[#1b263b] p-8 rounded-3xl mb-10">
            <h1 className="text-3xl text-white font-bold">
                {student.name}
            </h1>

            <p className="text-gray-400 mb-6">
                {student.email}
            </p>

            {student.codes?.map((code, i) => (
                <div key={i} className="mb-5">
                    <p className="text-[#fca311] mb-2">
                        Задание {i + 1}
                    </p>

                    <pre className="bg-black p-5 rounded-xl overflow-auto text-white">
                        {code}
                    </pre>

                    <input
                        type="number"
                        placeholder="Балл"
                        onChange={(e) => {
                            const copy = [...scores];
                            copy[i] = e.target.value;
                            setScores(copy);
                        }}
                        className="w-full mt-3 p-3 rounded-xl bg-[#0d1b2a] text-white"
                    />
                </div>
            ))}

            <button
                onClick={() => save(scores)}
                className="bg-[#fca311] px-8 py-3 rounded-xl font-bold"
            >
                Сохранить оценку
            </button>

            {student.checked && (
                <p className="text-green-400 mt-4">
                    Итог: {student.score} баллов
                </p>
            )}
        </div>
    );
}