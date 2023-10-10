import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom'; // Import the Link component

function LoginForm({ history }) {
    const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSuccessfulLogin = () => {
    window.location.reload();
    window.location.href = '/';
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your login API endpoint
      const response = await axios.post('http://localhost:3001/auth/login', userData);

      const { token } = response.data;

      // Save the token in session storage
      sessionStorage.setItem('token', token);

      handleSuccessfulLogin();
      history.push('/');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If user is not found (status code 404), set the error message
        setErrorMessage('User not registered. Please register before logging in.');
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>} {/* Display the error message */}
      
      {/* Add a link to the registration page */}
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>
      </p>
    </div>
  );
}

export default LoginForm;
