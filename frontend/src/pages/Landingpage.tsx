// src/pages/LandingPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, ArrowRight, Briefcase, ChevronDown, Award, Zap, Users, TrendingUp, Menu, X } from 'lucide-react';

export default function LandingPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setIsLoggedIn(false);
        setAccountMenuOpen(false);
    };

    // (Đây là toàn bộ code giao diện của bạn, được giữ nguyên)
    // const dropdownMenus = { ... };
    // const templates = [ ... ];
    // const features = [ ... ];
    // const reviews = [ ... ];
    // const companies = [ ... ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
            {/* Header */}
            <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <a href="/" className="flex items-center gap-1.5">
                            {/* ... logo ... */}
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            {/* ✅ LOGIC HIỂN THỊ TÙY THEO TRẠNG THÁI ĐĂNG NHẬP */}
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                        className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2"
                                    >
                                        Tài khoản của tôi <ChevronDown className="w-4 h-4" />
                                    </button>
                                    {accountMenuOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                            <a href="/my-cvs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CV của tôi</a>
                                            <a href="/editor/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tạo CV mới</a>
                                            <hr className="my-1"/>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Đăng xuất</button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <a href="/login" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Đăng nhập</a>
                                    <a href="/register" className="bg-blue-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-blue-700 font-medium">Tạo CV của tôi</a>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
            {/* ... Toàn bộ phần còn lại của Landing Page (Hero, Features, v.v.) giữ nguyên ... */}
        </div>
    );
}