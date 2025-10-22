// src/pages/MyCVs.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyCVs } from '../api'; // ✅ Import hàm API

// Component Header (giữ nguyên hoặc bạn có thể tạo thành file riêng nếu muốn)
const MainHeader = () => {
    const navigate = useNavigate();
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const handleLogout = () => { /* ... */ }; // Giữ nguyên logic logout
    return ( <header> {/* ... Giữ nguyên JSX của header ... */} </header> );
};

export default function MyCVs() {
    const navigate = useNavigate();
    const [cvs, setCvs] = useState<any[]>([]); // State để lưu danh sách CV thật
    const [loading, setLoading] = useState(true); // State cho trạng thái tải
    const [error, setError] = useState('');     // State cho lỗi

    useEffect(() => {
        const fetchCVs = async () => {
            setLoading(true);
            setError('');
            try {
                // ✅ Gọi API để lấy danh sách CV thật
                const response = await getMyCVs();
                setCvs(response.data); // Lưu dữ liệu thật vào state
            } catch (err: any) {
                setError('Không thể tải danh sách CV.');
                console.error("Failed to fetch CVs", err);
                // Nếu token không hợp lệ hoặc hết hạn, đá về trang đăng nhập
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    localStorage.removeItem('jwt_token'); // Xóa token cũ
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        // Chỉ gọi API nếu người dùng đã đăng nhập (có token)
        if (localStorage.getItem('jwt_token')) {
            fetchCVs();
        } else {
            // Nếu không có token, chuyển hướng về trang đăng nhập
            navigate('/login');
        }
    }, [navigate]); // Thêm navigate vào dependency array

    // Hàm xử lý nút Xóa (sẽ làm sau)
    const handleDelete = (cvId: number) => {
        alert(`Sẽ xóa CV có ID: ${cvId} (chưa implement)`);
    };

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

                {/* Hiển thị trạng thái tải hoặc lỗi */}
                {loading && <p className="text-center text-gray-500 py-10">Đang tải danh sách CV...</p>}
                {error && <p className="text-center text-red-500 py-10">{error}</p>}

                {/* Hiển thị danh sách CV sau khi tải xong */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cvs.length > 0 ? (
                            cvs.map(cv => (
                                <div key={cv.id} className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition-shadow">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{cv.fullName}</h3>
                                        <p className="text-gray-600">{cv.jobTitle || 'Chưa có vị trí'}</p>
                                    </div>
                                    <div className="mt-4 flex space-x-4">
                                        <button onClick={() => navigate(`/editor/${cv.id}`)} className="text-sm text-blue-600 font-semibold hover:underline">Sửa</button>
                                        <button onClick={() => handleDelete(cv.id)} className="text-sm text-red-500 font-semibold hover:underline">Xóa</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 mt-10">Bạn chưa tạo CV nào. Hãy nhấn "Tạo CV mới" để bắt đầu!</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}