import api from '../api/axios';

const alertService = {
    getAlerts: async () => {
        const response = await api.get('/alerts');
        return response.data;
    }
};

export default alertService;
