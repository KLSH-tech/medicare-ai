import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../ai-chat/context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  const location = useLocation();

  if (!user) {
    // Redirect to login but save the intended destination
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
