import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path based on your project structure

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Check authentication state

    return isAuthenticated ? children : <Navigate to="/" replace />; // Redirect to the landing page if not authenticated
};

export default ProtectedRoute;
