import axios from 'axios';

// Base API URL for the backend
const API_URL = 'http://localhost:5000/api/auth';

// Sign up function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;  // Returns token or success response
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;  // Returns token or success response
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
