import api from '../api/axios';

const sensorService = {
    getLatestSensors: async () => {
        const response = await api.get('/sensors/latest');
        return response.data;
    },
    getSensorHistory: async (params) => {
        const response = await api.get('/sensors/history', { params });
        return response.data;
    },
    getStats: async () => {
        const response = await api.get('/stats');
        return response.data;
    },
    getHealth: async () => {
        const response = await api.get('/health');
        return response.data;
    }
};

export default sensorService;
