export default function ExamLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">

                <div className="w-24 h-24 border-[8px] border-[#fca311] border-t-transparent rounded-full animate-spin"/>

                <h1 className="text-white text-4xl font-black animate-pulse">
                    Загрузка...
                </h1>

                <p className="text-gray-400">
                    Подождите немного
                </p>

            </div>
        </div>
    );
}