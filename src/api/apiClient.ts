import axios from "axios";
export const apiBaseUrl = "http://localhost:4000/api";

//process.env.REACT_APP_API_URL ||
const apiClient = axios.create({
  baseURL:  apiBaseUrl,
});

// Request interceptor for adding authorization token
apiClient.interceptors.request.use(
  (config) => {
    try {
      // Safely get user data from localStorage
      const userString = localStorage.getItem('tanstack.auth.user');
      if (userString) {
        const user = JSON.parse(userString);
        const token = user?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return config; // Continue request without token if parsing fails
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('tanstack.auth.user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
