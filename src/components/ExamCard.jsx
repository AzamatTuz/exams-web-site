import { Link } from "react-router-dom";

export default function ExamCard({ id, title, date, result }) {
    return (
        <div className="bg-[#1b263b] rounded-3xl p-8 border border-[#415a77] hover:border-[#fca311] transition duration-300 ease-in-out">
            <h2 className="text-2xl font-bold text-[#fca311]">
                {title}
            </h2>

            <p className="text-gray-400 mt-2">
                Дата: {date}
            </p>

            <div className="mt-5">
                {result?.checked ? (
                    <>
                        <p className="text-green-400 font-bold">
                            Проверено ✅
                        </p>

                        <p className="text-xl mt-2 text-white font-bold">
                            Балл:{" "}
                            <span className="text-[#fca311] font-black">
                                {result.totalScore ?? 0}
                            </span>
                        </p>
                    </>
                ) : result ? (
                    <p className="text-yellow-400">
                        На проверке ⏳
                    </p>
                ) : (
                    <p className="text-gray-400">
                        Не отправлено
                    </p>
                )}
            </div>

            <Link
                to={`/exam/${id}`}
                className="mt-6 inline-block bg-[#fca311] px-6 py-3 rounded-xl font-bold text-black"
            >
                Открыть
            </Link>
        </div>
    );
}