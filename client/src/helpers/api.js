import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND_URI,
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

// Function to set the Authorization header dynamically
const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.Authorization;
    }
};

// Update token on app load or after login/logout
setAuthToken(localStorage.getItem("auth_token"));

api.interceptors.response.use(
    response => response,
    error => {
        // Handle error
        console.error("API call error:", error);
        return Promise.reject(error);
    }
);

export const csrf = async () => await api.get("sanctum/csrf-cookie");

export default api;
