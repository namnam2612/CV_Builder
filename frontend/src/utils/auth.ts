export function getToken() {
    return localStorage.getItem('jwt_token');
}

export function logout() {
    localStorage.removeItem('jwt_token');
    window.location.href = '/';
}
