// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Editor from './pages/Editor.tsx';
// Sau này chúng ta sẽ thêm Dashboard ở đây

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Khi người dùng vào trang gốc, tự động chuyển đến /login */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/editor" element={<Editor />} />
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
    );
}