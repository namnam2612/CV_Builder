// src/api/index.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api', // URL gốc của backend Spring Boot
});

// Interceptor để tự động thêm token vào mỗi request
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Định nghĩa các hàm gọi API
export const loginUser = (credentials: any) => api.post('/auth/login', credentials);
// (Sau này chúng ta sẽ thêm các hàm khác ở đây)
export const registerUser = (userData: any) => api.post('/auth/register', userData); // dangky
// ...
export const getMyCVs = () => api.get('/cv/my-cvs');
// ...

export default api;