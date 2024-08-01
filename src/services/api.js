import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchOrganizations = (name) => {
    return api.get(`/organizations/${name}`);
};

export default api;
