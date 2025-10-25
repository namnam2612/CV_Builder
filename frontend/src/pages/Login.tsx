// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api'; // Import hàm gọi API

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Xóa lỗi cũ

        try {
            // Gọi API đăng nhập
            const response = await loginUser({ username, password });
            const token = response.data.token;

            // Lưu token vào localStorage của trình duyệt
            localStorage.setItem('jwt_token', token);

            // Chuyển hướng đến trang editor sau khi đăng nhập thành công
            navigate('/dashboard');

        } catch (err) {
            setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập CV Builder</h2>
                {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="username">Tên đăng nhập</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2" htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        Đăng nhập
                    </button>
                </form>
                {/*  ĐOẠN CODE ĐƯỢC THÊM VÀO Ở ĐÂY */}
                <p className="text-center mt-4 text-sm text-gray-600">
                    Chưa có tài khoản?{' '}
                    <a href="/register" className="font-medium text-blue-600 hover:underline">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
}