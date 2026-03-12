import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const roomService = {
    getAllRooms: async () => {
        const response = await api.get('/rooms');
        return response.data;
    },
    getRoomById: async (id) => {
        const response = await api.get(`/rooms/${id}`);
        return response.data;
    },
};

export default api;
