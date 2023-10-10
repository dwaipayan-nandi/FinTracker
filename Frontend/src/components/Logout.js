// Logout.js

import React from 'react';

function Logout(setIsAuthenticated) {
  const handleLogout = () => {
    // Clear the session storage or local storage
    sessionStorage.removeItem('token'); 

    setIsAuthenticated(false);

    // Redirect to the login page
    window.location.href = '/login';
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
