import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/register', userData);

      const { token } = response.data;

      sessionStorage.setItem('token', token);
      window.location.reload();
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        
        setError('User is already registered.');
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegistrationForm;
