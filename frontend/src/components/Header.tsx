import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, LogOut, FileText, Plus, ChevronDown } from 'lucide-react';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void;
}

export default function Header({ isLoggedIn, onLogout }: HeaderProps) {
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    return (
        <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            CV Builder
                        </span>
                    </Link>
                    
                    <div className="hidden md:flex items-center gap-6">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <Link 
                                    to="/my-cvs" 
                                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                                >
                                    CV của tôi
                                </Link>
                                <Link 
                                    to="/editor/new" 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tạo CV mới
                                </Link>
                                
                                {/* Account Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                                    >
                                        <User className="w-5 h-5" />
                                        Tài khoản của tôi
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isAccountMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                            <Link 
                                                to="/my-cvs" 
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsAccountMenuOpen(false)}
                                            >
                                                <FileText className="w-4 h-4" />
                                                CV của tôi
                                            </Link>
                                            <Link 
                                                to="/editor/new" 
                                                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                onClick={() => setIsAccountMenuOpen(false)}
                                            >
                                                <Plus className="w-4 h-4" />
                                                Tạo CV mới
                                            </Link>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <button
                                                onClick={() => {
                                                    onLogout();
                                                    setIsAccountMenuOpen(false);
                                                }}
                                                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link 
                                    to="/login" 
                                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                                >
                                    Đăng nhập
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
                                >
                                    Bắt đầu miễn phí
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}

