// src/pages/MyCVs.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyCVs() {
    const navigate = useNavigate();
    const [cvs, setCvs] = useState<any[]>([]);

    useEffect(() => {
        // Logic gọi API getMyCVs() sẽ được thêm vào đây
        const fakeCVs = [
            { id: 1, fullName: 'Lê Văn Nam', jobTitle: 'Kỹ sư Phần mềm' },
        ];
        setCvs(fakeCVs);
    }, []);

    return (
        <main className="container mx-auto p-6">
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
    );
}