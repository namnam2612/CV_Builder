// src/pages/MyCVs.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Component Header dành riêng cho các trang sau khi đăng nhập
const MainHeader = () => {
    const navigate = useNavigate();
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/'); // Quay về trang chủ
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="/" className="flex items-center gap-1.5">
                        <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded"></div>
                        <div><span className="text-lg font-bold text-gray-900">CV Builder</span></div>
                    </a>
                    <div className="relative">
                        <button
                            onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                            onBlur={() => setTimeout(() => setAccountMenuOpen(false), 200)}
                            className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-2"
                        >
                            Tài khoản của tôi
                        </button>
                        {accountMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                                <a href="/my-cvs" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">CV của tôi</a>
                                <a href="/editor/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Tạo CV mới</a>
                                <hr className="my-1"/>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Đăng xuất</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default function MyCVs() {
    const navigate = useNavigate();
    const [cvs, setCvs] = useState<any[]>([]);

    useEffect(() => {
        // Logic gọi API getMyCVs() sẽ được thêm vào đây
        const fakeCVs = [
            { id: 1, fullName: 'Lê Văn Nam', jobTitle: 'Kỹ sư Phần mềm' },
            { id: 2, fullName: 'Hồ sơ Ứng tuyển Vị trí Quản lý', jobTitle: 'Quản lý Dự án' },
        ];
        setCvs(fakeCVs);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <MainHeader />
            <main className="container mx-auto p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">CV của bạn</h2>
                    <button onClick={() => navigate('/editor/new')} className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700">
                        + Tạo CV mới
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cvs.map(cv => (
                        <div key={cv.id} className="bg-white rounded-lg shadow-md p-5">
                            <h3 className="font-bold text-lg text-gray-900">{cv.fullName}</h3>
                            <p className="text-gray-600">{cv.jobTitle || 'Chưa có vị trí'}</p>
                            <div className="mt-4 flex space-x-4">
                                <button onClick={() => navigate(`/editor/${cv.id}`)} className="text-sm text-blue-600 font-semibold hover:underline">Sửa</button>
                                <button className="text-sm text-red-500 font-semibold hover:underline">Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}