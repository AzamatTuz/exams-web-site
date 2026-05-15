import { useEffect } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Auth({ user, setUser }) {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                const userData = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photo: currentUser.photoURL
                };

                setUser(userData);
                localStorage.setItem("auth_user", JSON.stringify(userData));
            }
        });

        return () => unsubscribe();
    }, []);

  
    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL
            };

            setUser(userData);
            localStorage.setItem("auth_user", JSON.stringify(userData));

        } catch (e) {
            console.log("Login error:", e);
        }
    };


    const logout = async () => {
        await signOut(auth);
        setUser(null);
        localStorage.removeItem("auth_user");
    };

    return (
        <div className="flex items-center gap-3">

            {user ? (
                <>
                    <img
                        src={user.photo}
                        alt=""
                        className="w-10 h-10 rounded-full border border-[#fca311]"
                    />

                    <div className="flex flex-col">
                        <span className="text-sm">{user.name}</span>
                        <span className="text-xs text-gray-400">
              {user.email}
            </span>
                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
                    >
                        Выйти
                    </button>
                </>
            ) : (
                <button
                    onClick={login}
                    className="bg-[#fca311] hover:bg-[#e59400] text-black px-4 py-2 rounded-lg font-semibold"
                >
                    Войти через Google
                </button>
            )}

        </div>
    );
}