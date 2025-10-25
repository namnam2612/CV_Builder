// src/pages/Register.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api'; // ✅ 1. Import hàm API

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // ✅ 2. Gọi API đăng ký với dữ liệu từ form
            const response = await registerUser({ username, email, password });
            const token = response.data.token;

            // ✅ 3. Lưu token và chuyển hướng
            localStorage.setItem('jwt_token', token);
            navigate('/login'); // Chuyển đến trang editor sau khi đăng ký thành công
        } catch (err: any) {
            // ✅ 4. Hiển thị lỗi từ backend nếu có
            setError(err.response?.data?.message || err.response?.data || 'Đăng ký thất bại. Vui lòng thử lại.');
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng ký tài khoản</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Tên đăng nhập</label>
                        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Mật khẩu</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Đăng ký
                    </button>
                </form>
                <p className="text-center mt-4 text-sm text-gray-600">
                    Đã có tài khoản?{' '}
                    <a href="/login" className="font-medium text-blue-600 hover:underline">
                        Đăng nhập ngay
                    </a>
                </p>
            </div>
        </div>
    );
}