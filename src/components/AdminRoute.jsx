import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

    const user = JSON.parse(localStorage.getItem("auth_user"));

    // 🔥 ВСТАВЬ СЮДА СВОЙ EMAIL
    const ADMIN_EMAIL = "tuzelbajazamat361@gmail.com";

    if (!user) {
        return <Navigate to="/" />;
    }

    // 🔒 проверка админа
    if (user.email !== ADMIN_EMAIL) {
        return <Navigate to="/exam" />;
    }

    return children;
}