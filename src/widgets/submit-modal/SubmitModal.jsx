export default function SubmitModal({
                                        showConfirm,
                                        finish,
                                        setShowConfirm
                                    }) {
    if (!showConfirm) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[200]">
            <div className="bg-[#1e293b] w-[450px] rounded-3xl p-10 border border-[#334155] shadow-2xl">
                <h2 className="text-3xl font-black text-white">
                    Отправить экзамен?
                </h2>

                <p className="text-gray-400 mt-4">
                    После отправки изменить ответы нельзя
                </p>

                <div className="flex gap-4 mt-8">
                    <button
                        onClick={finish}
                        className="flex-1 bg-green-500 py-4 rounded-2xl font-bold"
                    >
                        Да
                    </button>

                    <button
                        onClick={() => setShowConfirm(false)}
                        className="flex-1 bg-red-500 py-4 rounded-2xl font-bold"
                    >
                        Нет
                    </button>
                </div>
            </div>
        </div>
    );
}