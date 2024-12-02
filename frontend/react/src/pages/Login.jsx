import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      console.log("Login successful:", response.data);

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to the notes dashboard
      navigate('/notes');
    } catch (error) {
        if(error.response.data.error==='Invalid username or password.'){
            toast.error('Invalid Username or Password')
        }
        
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='main-container'>
      <ToastContainer/>
      
      <div className='form-container' >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      </div>
    </div>
  );
};

export default Login;
