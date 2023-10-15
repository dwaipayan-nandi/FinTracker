import { BrowserRouter as Router, Route , Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import PeriodReport from './components/PeriodReport';
import DailyReport from './components/DailyReport';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    // Check if the session ID is present in session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false); 
    }
  }, []);


  return (
    <Router>
      {/* <div className="App">
        <h1>Expense Tracker</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/period-report">Expense in a Date Range</Link>
            </li>
            <li>
              <Link to="/daily-report">Daily Report</Link>
            </li>
          </ul>
        </nav> */}
        <Routes>
          {/* Use PrivateRoute for protected routes */}
          <Route
            path="/"
            element={<PrivateRoute element={<ExpenseForm />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/period-report"
            element={<PrivateRoute element={<PeriodReport />} isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/daily-report"
            element={<PrivateRoute element={<DailyReport />} isAuthenticated={isAuthenticated} />}
          />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        
        {/* {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )} */}
      {/* </div> */}
    </Router>
  );
}

export default App;
