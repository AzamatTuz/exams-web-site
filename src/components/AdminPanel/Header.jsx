export default function Header({ onOpenTasks }) {
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#fca311]">
                Админ панель
            </h1>

            <button
                onClick={onOpenTasks}
                className="bg-[#fca311] text-black px-4 py-2 rounded-lg"
            >
                Тапсырмалар
            </button>
        </div>
    );
}