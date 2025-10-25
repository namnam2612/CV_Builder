import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:8080/api/auth';

export async function getCurrentUser() {
    const token = getToken();
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Token không hợp lệ hoặc đã hết hạn:', error);
        localStorage.removeItem('jwt_token');
        return null;
    }
}
