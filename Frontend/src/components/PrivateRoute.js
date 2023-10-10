import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default PrivateRoute;
