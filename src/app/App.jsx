import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import EditorFile from "./pages/EditorFile";

import Admin from "./pages/Admin";
import CreateExam from "./pages/CreateExam";
import CheckExam from "./pages/CheckExam";
import CheckedExam from "./pages/CheckedExam";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/exam/:id"
                    element={
                        <ProtectedRoute>
                            <EditorFile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/create"
                    element={
                        <AdminRoute>
                            <CreateExam />
                        </AdminRoute>
                    }
                />

                
                <Route
                    path="/check/:id"
                    element={
                        <AdminRoute>
                            <CheckExam />
                        </AdminRoute>
                    }
                />

                
                <Route
                    path="/checked/:id"
                    element={
                        <AdminRoute>
                            <CheckedExam />
                        </AdminRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;