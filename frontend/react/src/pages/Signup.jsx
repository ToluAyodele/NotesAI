import React, { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // Reuse the same CSS as Login

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, password });
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
