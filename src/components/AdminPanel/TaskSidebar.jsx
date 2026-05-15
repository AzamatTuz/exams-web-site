export default function TaskSidebar({ open, onClose }) {
    return (
        <>
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-[#14213d] transform transition ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="p-4 flex justify-between">
                    <h2 className="text-[#fca311] font-bold">
                        Тапсырмалар
                    </h2>
                    <button onClick={onClose}>✖</button>
                </div>

                <div className="p-4 space-y-4">

                    <div className="bg-[#1f2a44] p-4 rounded-xl">
                        <p className="text-[#fca311]">1. Filter + Map + Reduce</p>
                    </div>

                    <div className="bg-[#1f2a44] p-4 rounded-xl">
                        <p className="text-[#fca311]">2. Жұп / Тақ</p>
                    </div>

                    <div className="bg-[#1f2a44] p-4 rounded-xl">
                        <p className="text-[#fca311]">3. includes</p>
                    </div>

                    <div className="bg-[#1f2a44] p-4 rounded-xl">
                        <p className="text-[#fca311]">4. map + filter</p>
                    </div>

                </div>
            </div>

            {open && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50"
                />
            )}
        </>
    );
}