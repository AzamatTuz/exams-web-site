export default function Modal({open, title, text, onClose, onConfirm, confirmText = "ОК", cancelText = "Отмена"}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]">
            <div className="bg-[#1b263b] rounded-3xl p-8 w-[450px] border border-[#415a77]">
                <h1 className="text-2xl font-bold text-[#fca311]">
                    {title}
                </h1>

                <p className="text-gray-300 mt-5">
                    {text}
                </p>

                <div className="flex justify-end gap-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-600 rounded-xl text-white"
                    >
                        {cancelText}
                    </button>

                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="px-5 py-2 bg-green-500 rounded-xl text-white"
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}