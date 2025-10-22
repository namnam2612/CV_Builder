import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../api/auth';
import { logout } from '../utils/auth';

export default function Header() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function fetchUser() {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        }
        fetchUser();
    }, []);

    return (
        <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            <Link to="/" className="text-2xl font-bold text-blue-600">CV Builder</Link>

            {!user ? (
                <div className="space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-blue-600">Đăng nhập</Link>
                    <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Đăng ký
                    </Link>
                </div>
            ) : (
                <div className="relative group">
                    <button className="text-gray-800 font-medium hover:text-blue-600">
                        Tài khoản của tôi ▾
                    </button>
                    <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-md mt-2 w-48">
                        <Link to="/my-cvs" className="block px-4 py-2 hover:bg-gray-100">My CVs</Link>
                        <Link to="/editor/new" className="block px-4 py-2 hover:bg-gray-100">Tạo CV mới</Link>
                        <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}
