    // src/App.tsx
    import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
    import Login from './pages/Login.tsx';
    import Editor from './pages/Editor.tsx';
    import Register from './pages/Register.tsx'; //  1. Import trang Đăng ký
    import Dashboard from './pages/Dashboard.tsx';
    import MyCVs from "./pages/MyCVs.tsx";

    export default function App() {
        return (
            <BrowserRouter>
                <Routes>
                    {/* Khi người dùng vào trang gốc, tự động chuyển đến /login */}
                    <Route path="/" element={<Navigate to="/Dashboard" />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} /> {/* ✅ 2. Thêm route cho trang Đăng ký */}
                    <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ 2. Thêm route cho Dashboard */}
                    <Route path="/dashboard" element={<MyCVs />} />

                    <Route path="/editor" element={<Editor />} />
                </Routes>
            </BrowserRouter>
        );
    }