import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function EditorFile() {

    const users = [
        "Нуржан Дарибаев", "Минар Ахан", "Динара Сәрсенғали",
        "Амантай Пралиев", "Бауыржан Хайтбай", "Сұнқар Мырзакелді",
        "Айбол Мамыт", "Жандос Ауғамбаев", "Мажит Багу",
        "Әдемі Маратова", "Динара Умбетова", "Фарида Ибраим",
        "Амина Айбек", "Бақнар Жеңіс", "Ернар Жеңіс", "Нұрбек Сырым"
    ];

    const DB_URL = "https://exam-4d98a-default-rtdb.europe-west1.firebasedatabase.app/exam/v1";

    const [user, setUser] = useState('');
    const [codes, setCodes] = useState(["", "", "", ""]);
    const [outputs, setOutputs] = useState(["", "", "", ""]);
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 🔹 загрузка
    useEffect(() => {
        const saved = localStorage.getItem("all_codes");
        if (saved) setCodes(JSON.parse(saved));

        const submitted = localStorage.getItem("submitted");
        if (submitted === "true") {
            setIsSubmitted(true);
        }
        const saveUser = localStorage.getItem('user')
        if (saveUser) {
            setUser(saveUser)
        } 
    }, []);

    useEffect(() => {
        localStorage.setItem('user', user)
    }, [user])

    // 🔹 изменение кода
    const handleChange = (index, value) => {
        const newCodes = [...codes];
        newCodes[index] = value || "";

        setCodes(newCodes);
        localStorage.setItem("all_codes", JSON.stringify(newCodes));
    };

    // 🔹 запуск кода
    const runCode = (index) => {
        let logs = [];

        try {
            const originalLog = console.log;

            console.log = (...args) => {
                logs.push(args.join(" "));
            };

            new Function(codes[index])();

            console.log = originalLog;

            const newOutputs = [...outputs];
            newOutputs[index] = logs.join("\n") || "Пусто";

            setOutputs(newOutputs);
        } catch (e) {
            const newOutputs = [...outputs];
            newOutputs[index] = "❌ " + e.message;
            setOutputs(newOutputs);
        }
    };

    // 🔥 проверка по имени
    const checkUserExists = async () => {
        try {
            const res = await axios.get(`${DB_URL}.json`);

            if (!res.data) return false;

            const entries = Object.values(res.data);
            return entries.some(item => item.user === user);

        } catch (e) {
            console.log(e);
            return false;
        }
    };

    // 🔥 отправка
    const finish = async () => {

        if (isSubmitted) return;

        if (!user) {
            setMessage("Есіміңді таңда");
            return;
        }

        // ✅ подтверждение
        const confirmSubmit = window.confirm("Ты точно хочешь отправить?");
        if (!confirmSubmit) return;

        setMessage("Проверка...");

        const exists = await checkUserExists();

        if (exists) {
            setMessage("❌ Ты уже отправлял");
            setIsSubmitted(true);
            localStorage.setItem("submitted", "true");
            return;
        }

        const result = {
            user,
            codes,
            createdAt: new Date().toISOString()
        };

        try {
            await axios.post(`${DB_URL}.json`, result);

            localStorage.setItem("submitted", "true");
            setIsSubmitted(true);

            localStorage.removeItem("all_codes");

            setCodes(["", "", "", ""]);
            setOutputs(["", "", "", ""]);

            setMessage("Сохранено ✅");

        } catch (e) {
            console.log(e);
            setMessage("Ошибка ❌");
        }
    };

    return (
        <div className="min-h-screen bg-[#457b9d] text-[#e5e5e5] p-6 flex flex-col items-center gap-10">

            {/* сообщение */}
            {message && (
                <div className="fixed top-5 bg-[#14213d] text-white px-6 py-3 rounded-2xl border border-[#fca311]">
                    {message}
                </div>
            )}

            <h1 className="text-3xl font-bold text-white">
                Экзамен
            </h1>

            {/* выбор пользователя */}
            <select
                disabled={isSubmitted}
                onChange={(e) => setUser(e.target.value)}
                value={user}
                className="bg-[#14213d] text-white px-5 py-3 w-full max-w-md rounded-2xl border border-[#fca311]"
            >
                <option value="">Есімің</option>
                {users.map((u, i) => (
                    <option key={i} value={u}>{u}</option>
                ))}
            </select>

            <div className="w-full max-w-4xl bg-[#14213d] border border-[#fca311] rounded-2xl p-6 space-y-6 text-sm leading-relaxed">

                <h2 className="text-xl font-bold text-[#fca311]">
                    Тапсырмалар
                </h2>

                {/* 1 */}
               <div className='grid grid-cols-2 gap-6'>
                   <div className="bg-[#1f2a44] p-4 rounded-xl border border-gray-700">
                       <p className="font-semibold text-[#fca311] mb-2">
                           1. Сандарды сүзу, түрлендіру және қосу
                       </p>
                       <p className="text-gray-300 mb-2">
                           const numbers = [2, 5, 8, 11, 14, 17, 20];
                       </p>
                       <ul className="list-disc ml-5 text-gray-400 space-y-1">
                           <li>10-нан үлкен сандарды қалдыр (filter)</li>
                           <li>Әр санды 3-ке көбейт (map)</li>
                           <li>Барлық нәтижені қос (reduce)</li>
                       </ul>
                   </div>

                   {/* 2 */}
                   <div className="bg-[#1f2a44] p-4 rounded-xl border border-gray-700">
                       <p className="font-semibold text-[#fca311] mb-2">
                           2. Жұп және тақ сандармен жұмыс
                       </p>
                       <p className="text-gray-300 mb-2">
                           const numbers = [1,2,3,4,5,6,7,8,9,10];
                       </p>
                       <ul className="list-disc ml-5 text-gray-400 space-y-1">
                           <li>Жұп сандарды бөліп ал (filter)</li>
                           <li>Тақ сандарды бөліп ал (filter)</li>
                           <li>Екі массивті жеке-жеке 2-ге көбейт (map)</li>
                       </ul>
                   </div>

                   {/* 3 */}
                   <div className="bg-[#1f2a44] p-4 rounded-xl border border-gray-700">
                       <p className="font-semibold text-[#fca311] mb-2">
                           3. Элементтерді іздеу және тексеру
                       </p>
                       <p className="text-gray-300 mb-2">
                           const numbers = [4, 9, 12, 15, 18, 21, 24];
                       </p>
                       <ul className="list-disc ml-5 text-gray-400 space-y-1">
                           <li>15-ке тең сан бар ма (includes)</li>
                       </ul>
                   </div>

                   {/* 4 */}
                   <div className="bg-[#1f2a44] p-4 rounded-xl border border-gray-700">
                       <p className="font-semibold text-[#fca311] mb-2">
                           4. Қайталанатын элементтермен жұмыс
                       </p>
                       <p className="text-gray-300 mb-2">
                           const numbers = [1,2,2,3,3,3,4,5,5,6];
                       </p>
                       <ul className="list-disc ml-5 text-gray-400 space-y-1">
                           <li>Квадратқа көтер (map)</li>
                           <li>10-нан үлкендерін қалдыр (filter)</li>
                       </ul>
                   </div>
               </div>

            </div>

            {/* редакторы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                {codes.map((code, index) => (
                    <div key={index} className="bg-[#14213d] rounded-2xl p-4 border border-gray-700">

                        <h2 className="text-[#fca311] font-semibold mb-2">
                            Тапсырма {index + 1}
                        </h2>

                        <Editor
                            height="200px"
                            language="javascript"
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => handleChange(index, value || "")}
                            options={{
                                minimap: { enabled: false },
                                automaticLayout: true,
                                readOnly: isSubmitted,
                                quickSuggestions: true,
                                suggestOnTriggerCharacters: true,
                                wordBasedSuggestions: true,
                                tabCompletion: "on"
                            }}
                        />

                        <button
                            disabled={isSubmitted}
                            onClick={() => runCode(index)}
                            className={`mt-3 w-full py-2 rounded-lg font-semibold 
                            ${isSubmitted ? "bg-gray-500" : "bg-[#fca311] hover:bg-[#e59400] text-black"}`}
                        >
                            Тексеру
                        </button>

                        <pre className="mt-3 bg-[#212529] p-2 text-sm h-28 overflow-auto text-[#e5e5e5] border border-gray-700 rounded">
                            {outputs[index]}
                        </pre>

                    </div>
                ))}

            </div>

            {/* кнопка отправки */}
            <button
                onClick={finish}
                disabled={isSubmitted}
                className={`px-8 py-3 rounded-xl font-bold 
                ${isSubmitted ? "bg-gray-500 cursor-not-allowed" : "bg-[#fca311] hover:bg-[#e59400] text-black"}`}
            >
                {isSubmitted ? "Уже отправлено" : "Аяқтау"}
            </button>



        </div>
    );
}