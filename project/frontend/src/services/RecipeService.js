import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Recipe';

export const RecipeService = {
    getAll: () => axios.get(API_URL),
    getById: (id) => axios.get(`${API_URL}/${id}`),
    create: (recipe) => axios.post(API_URL, recipe),
    update: (id, recipe) => axios.put(`${API_URL}/${id}`, recipe),
    delete: (id) => axios.delete(`${API_URL}/${id}`)
}; 