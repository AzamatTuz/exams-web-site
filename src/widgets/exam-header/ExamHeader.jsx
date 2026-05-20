export default function ExamHeader({ exam }) {
    return (

        <div className="
        bg-white/5
        backdrop-blur-md
        rounded-3xl
        border border-white/10
        p-10
        mb-12
        ">

            <h1 className="
            text-6xl
            font-black
            text-white
            ">
                {exam.title}
            </h1>

            <p className="
            text-gray-300
            mt-4
            text-xl
            ">
                Дата: {exam.date}
            </p>

        </div>

    );
}