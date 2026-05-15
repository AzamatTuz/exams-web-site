import ScoreInput from "./ScoreInput.jsx";

export default function StudentCard({ item, onScoreChange }) {
    const total = item.scores.reduce((a, b) => a + b, 0);

    return (
        <div className="bg-[#1b263b] rounded-2xl p-6 border border-[#415a77]">

            {/* HEADER */}
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-[#fca311] font-bold">
                        {item.user}
                    </h2>
                    <p className="text-xs text-gray-400">
                        {item.createdAt}
                    </p>
                </div>

                <div className="bg-black px-4 py-2 rounded-xl border border-[#fca311] text-[#fca311] font-bold">
                    {total} балл
                </div>
            </div>

            {/* TASKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.codes?.map((code, index) => (
                    <div
                        key={index}
                        className="bg-[#0d1b2a] p-4 rounded-xl border border-[#415a77]"
                    >
                        <div className="flex justify-between mb-2">
                            <p className="text-[#fca311] text-sm">
                                Задача {index + 1}
                            </p>

                            <ScoreInput
                                value={item.scores[index]}
                                onChange={(val) =>
                                    onScoreChange(item.id, index, val)
                                }
                            />
                        </div>

                        <pre className="bg-black p-2 text-green-400 text-xs h-32 overflow-auto rounded">
              {code}
            </pre>
                    </div>
                ))}
            </div>

        </div>
    );
}