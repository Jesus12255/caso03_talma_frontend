import api from '@/api/axios';

const authService = {
    login: async (credentials: { username: string; password: string }) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};

export default authService;
