// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import LandingPage from './pages/LandingPage.tsx';
import MyCVs from './pages/MyCVs.tsx';
import Editor from './pages/Editor.tsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-cvs" element={<MyCVs />} />
                <Route path="/editor/:cvId" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
}