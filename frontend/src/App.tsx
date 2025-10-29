// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Editor from './pages/Editor.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import MyCVs from './pages/MyCVs.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />
                {/* My CVs list */}
                <Route path="/my-cvs" element={<MyCVs />} />

                {/* Editor accepts an :id param; use 'new' for creating a new CV */}
                <Route path="/editor/:id" element={<Editor />} />

                {/* Fallback: redirect unknown routes to dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}