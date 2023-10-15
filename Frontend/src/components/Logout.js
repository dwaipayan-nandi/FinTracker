import React from 'react';

function Logout(setIsAuthenticated) {
  const handleLogout = () => {
    // Clear the session storage or local storage
    sessionStorage.removeItem('token'); 

    //setIsAuthenticated(false);

    // Redirect to the login page
    window.location.href = '/login';
  };

  return (

      <button onClick={handleLogout} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
    
  );
}

export default Logout;
