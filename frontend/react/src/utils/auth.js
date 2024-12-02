export const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem('authToken', token); // Save token in localStorage
    } else {
      localStorage.removeItem('authToken'); // Remove token from localStorage
    }
  };
  
  export const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Retrieve token from localStorage
  };
  
  export const removeAuthToken = () => {
    localStorage.removeItem('authToken'); // Remove token
  };
  