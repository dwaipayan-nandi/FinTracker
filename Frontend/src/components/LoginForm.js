import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import the Link component
import * as Components from './Components';
import './RegistrationForm'
import RegistrationForm from "./RegistrationForm";

function LoginForm({ history }) {
  const [signIn, toggle] = React.useState(true);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSuccessfulLogin = () => {
    window.location.reload();
    window.location.href = "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your login API endpoint
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        userData
      );

      const { token } = response.data;

      // Save the token in session storage
      sessionStorage.setItem("token", token);

      handleSuccessfulLogin();
      history.push("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If user is not found (status code 404), set the error message
        setErrorMessage(
          "User not registered. Please register before logging in."
        );
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <Components.Container>
              <RegistrationForm/>
              <Components.SignInContainer signinIn={signIn}>
                   <Components.Form onSubmit={handleSubmit}>
                   <h1 class="text-gray-800 font-bold text-2xl mb-1">Login Now!</h1>
                       <Components.Input type='text' placeholder='Username' name="username"  value={userData.username}
            onChange={handleChange}
            required/>
                       <Components.Input type='password' placeholder='Password' name="password" value={userData.password}
            onChange={handleChange}
            required/>
                       <Components.Button type='submit'>Login</Components.Button>
                   </Components.Form>
              </Components.SignInContainer>

          </Components.Container>
  );
}

export default LoginForm;
