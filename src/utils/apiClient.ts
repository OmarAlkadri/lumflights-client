import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3030/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Add an interceptor to include the token in every request
apiClient.interceptors.request.use((config) => {
  // Retrieve the token (e.g., from localStorage or a global store)
  const token = localStorage.getItem('authToken'); // Replace with your token retrieval method
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Add the token to the headers
  }
  return config;
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response, // Pass the response if it's successful
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error
      console.warn('Unauthorized! Redirecting to login...');
      window.location.href = '/auth/login'; // Replace with your login page route
    }
    return Promise.reject(error); // Reject the error to handle it in the calling function
  }
);

export default apiClient;
