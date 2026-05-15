import { logout } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("auth_user"));

    async function handleLogout() {
        await logout();
        navigate("/");
    }

    return (
        <nav className="bg-[#0d1b2a] border-b border-[#415a77]">
            <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
                <h1
                    onClick={() => navigate("/")}
                    className="text-3xl font-black text-[#fca311] cursor-pointer"
                >
                    ExamJS
                </h1>

                <div className="flex gap-5 items-center">
                    <p
                        onClick={() => navigate("/")}
                        className="text-white transition duration-150 ease-in-out hover:text-shadow-2xs text-shadow-amber-50 cursor-pointer"
                    >
                        Home
                    </p>

                    {user && (
                        <>
                            <img
                                src={user.photo}
                                className="w-10 h-10 rounded-full"
                            />

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 px-4 py-2 rounded-xl transition duration-300 ease-in-out hover:bg-red-500 cursor-pointer text-white"
                            >
                                Выйти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}