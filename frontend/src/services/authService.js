// authService.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

export function setToken(token) {
    localStorage.setItem("cv_token", token);
}
export function getToken() {
    return localStorage.getItem("cv_token");
}
export function removeToken() {
    localStorage.removeItem("cv_token");
}

export async function login(email, password) {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    setToken(data.token);
    return data;
}

export async function fetchWithAuth(url, opts = {}) {
    const token = getToken();
    const headers = opts.headers ? {...opts.headers} : {};
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${url}`, {...opts, headers});
    return res;
}
