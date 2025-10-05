// src/routes/AdminProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const admin = localStorage.getItem("admin"); // store admin auth info in localStorage

    if (!admin) {
        // not logged in as admin → redirect to admin login
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
