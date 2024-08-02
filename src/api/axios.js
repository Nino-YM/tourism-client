import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('Adding token to request headers:', token);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getUserProfile = async () => {
    const userId = localStorage.getItem('user_id'); // Assuming the user ID is stored in local storage
    if (!userId) {
        throw new Error('User ID not found in local storage');
    }

    try {
        const response = await api.get(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createLocation = async (data) => {
    try {
        const response = await api.post('/locations', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Auth endpoints
export const login = async (data) => {
    try {
        const response = await api.post('/login', data);
        const { access_token, user } = response.data; // Destructure correctly
        localStorage.setItem('token', access_token);
        localStorage.setItem('user_id', user.id_user); // Assuming user object has id_user
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const register = (data) => api.post('/register', data);
export const logout = () => api.post('/logout');

// User endpoints
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Article endpoints
export const getArticles = () => api.get('/articles');
export const createArticle = (data) => api.post('/articles', data);
export const getArticle = (id) => api.get(`/articles/${id}`);
export const updateArticle = (id, data) => api.put(`/articles/${id}`, data);
export const deleteArticle = (id) => api.delete(`/articles/${id}`);


// Event endpoints
export const getEvents = () => api.get('/events');
export const getEvent = (id) => api.get(`/events/${id}`);
export const createEvent = (data) => api.post('/events', data);
export const updateEvent = (id, data) => api.put(`/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Location endpoints
export const getLocations = () => api.get('/locations');
export const getLocation = (id) => api.get(`/locations/${id}`);
export const updateLocation = (id, data) => api.put(`/locations/${id}`, data);
export const deleteLocation = (id) => api.delete(`/locations/${id}`);

// Review endpoints
export const getReviews = () => api.get('/reviews');
export const getReview = (id) => api.get(`/reviews/${id}`);
export const createReview = (data) => api.post('/reviews', data);
export const updateReview = (id, data) => api.put(`/reviews/${id}`, data);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// Comment endpoints
export const getComments = () => api.get('/comments');
export const getComment = (id) => api.get(`/comments/${id}`);
export const createComment = (data) => api.post('/comments', data);
export const updateComment = (id, data) => api.put(`/comments/${id}`, data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);

export default api;
