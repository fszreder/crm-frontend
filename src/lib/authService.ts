import axios from 'axios';

const API = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    const res = await axios.post(`${API}/login`, { email, password });
    return res.data;
};

export const register = async (email: string, password: string) => {
    return axios.post(`${API}/register`, { email, password });
};

export const checkTokenValidity = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const res = await axios.get(`${API}/auth/validate-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.status === 200;
    } catch {
        return false;
    }
};
