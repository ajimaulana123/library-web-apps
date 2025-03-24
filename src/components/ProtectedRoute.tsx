
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'librarian' | 'student';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // If authentication is still loading, show nothing
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required, check if the user has that role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect admin to admin dashboard
    if (user?.role === 'admin' || user?.role === 'librarian') {
      return <Navigate to="/admin/dashboard" replace />;
    }
    
    // Redirect student to student dashboard
    if (user?.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    }
    
    // Fallback to home page for any other case
    return <Navigate to="/" replace />;
  }

  // If authenticated and has the required role (or no specific role required), render children
  return <>{children}</>;
};

export default ProtectedRoute;
