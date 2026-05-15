import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = localStorage.getItem("auth_user");

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}