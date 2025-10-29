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
                console.log('CVs from API:', response.data); // Log để debug
                const cvList = response.data.map((cv: any) => ({
                    ...cv,
                    id: Number(cv.id) // Đảm bảo id là số
                }));
                console.log('Processed CVs:', cvList);
                setCvs(cvList); // Lưu dữ liệu đã xử lý vào state
            } catch (err: any) {
                console.error("Failed to fetch CVs", err);
                // Build a helpful error message for the UI
                let message = 'Không thể tải danh sách CV.';
                if (err.response) {
                    const status = err.response.status;
                    const data = err.response.data;
                    message += ` Server responded ${status}: ${typeof data === 'string' ? data : JSON.stringify(data)}`;
                    // If unauthorized, clear token and redirect to login
                    if (status === 401 || status === 403) {
                        localStorage.removeItem('jwt_token');
                        navigate('/login');
                        return;
                    }
                } else if (err.request) {
                    message += ' Không nhận được phản hồi từ server (kiểm tra backend hoặc CORS).';
                } else {
                    message += ` Lỗi: ${err.message}`;
                }
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        // Chỉ gọi API nếu người dùng đã đăng nhập (có token)
        const token = localStorage.getItem('jwt_token');
        console.log('JWT token present:', !!token);
        if (token) {
            console.log('JWT token (first 40 chars):', token?.substring(0, 40));
            fetchCVs();
        } else {
            // Nếu không có token, chuyển hướng về trang đăng nhập
            navigate('/login');
        }
    }, [navigate]); // Thêm navigate vào dependency array

    // Hàm xử lý nút Xóa (chỉ thông báo tạm thời, kiểm tra id trước khi xử lý)
    const handleDelete = (cvId: any) => {
        const idNum = Number(cvId);
        if (!isNaN(idNum)) {
            // TODO: gọi API xóa ở đây (DELETE /api/cv/{id})
            alert(`Sẽ xóa CV có ID: ${idNum} (chưa implement)`);
        } else {
            console.error('handleDelete called with invalid id:', cvId);
            alert('Không thể xóa: ID không hợp lệ.');
        }
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
                                        <button 
                                            onClick={() => {
                                                if (cv && cv.id) {
                                                    navigate(`/editor/${cv.id}`);
                                                    console.log('Navigating to edit CV:', cv.id);
                                                } else {
                                                    console.error('Invalid CV ID:', cv);
                                                }
                                            }} 
                                            className="text-sm text-blue-600 font-semibold hover:underline">
                                            Sửa
                                        </button>
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