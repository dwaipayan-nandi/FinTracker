import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as Components from './Components';

function RegistrationForm() {
  const [signIn, toggle] = React.useState(true);
  const [userData, setUserData] = useState({
    usernamer: '',
    passwordr: '',
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
    
<Components.Container>
              <Components.SignUpContainer signinIn={signIn}>
                  <Components.Form onSubmit={handleSubmit}>
                  <h1 class="text-gray-800 font-bold text-2xl mb-1">Create Account!</h1>
                      <Components.Input type='text' placeholder='Username' name='username' value={userData.username}
            onChange={handleChange}
            required/>
                      <Components.Input type='password' placeholder='Password' name='password' value={userData.password}
            onChange={handleChange}
            required/>
                      <Components.Button type='submit'>Sign Up</Components.Button>
                  </Components.Form>
              </Components.SignUpContainer>

              <Components.OverlayContainer signinIn={signIn}>
                  <Components.Overlay signinIn={signIn}>

                  <Components.LeftOverlayPanel signinIn={signIn}>
                      <h1 class="text-white font-bold text-4xl font-sans">FinTracker</h1>
                        <div><br/></div>
                        <p class="text-white mt-1">Already a member??</p>
                        <div><br/></div>
                        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                      <Components.GhostButton onClick={() => toggle(true)}>
                          Login Now!
                      </Components.GhostButton>
                      </Components.LeftOverlayPanel>

                      <Components.RightOverlayPanel signinIn={signIn}>
                      <h1 class="text-white font-bold text-4xl font-sans">FinTracker</h1>
                        <div><br/></div>
                        <p class="text-white mt-1">Don't have an account??</p>
                        <div><br/></div>
                        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
		<div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                            <Components.GhostButton onClick={() => toggle(false)}>
                                Join Now!
                            </Components.GhostButton> 
                      </Components.RightOverlayPanel>
  
                  </Components.Overlay>
              </Components.OverlayContainer>

          </Components.Container>

  );
}

export default RegistrationForm;
