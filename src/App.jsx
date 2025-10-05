import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Website imports
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Client from "./pages/Client";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CreateGroup from "./pages/CreateGroup";
import Chat from "./pages/Chat";
import Help from "./pages/Help";
import GettingStarted from "./pages/GettingStarted";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "../src/pages/routes/ProtectedRoutes";
import AdminProtectedRoute from "../src/pages/routes/AdminProtectedRoutes";
import Website from "./pages/Website";

// Admin imports
import AdminLogin from "../src/pages/admin/AdminLogin";
import AdminPanel from "../src/pages/admin/AdminPanel";
import UserManagement from "../src/pages/admin/UserManagement";
import AdminSettings from "../src/pages/admin/AdminSettings";

// import ManageUsers from "./admin/ManageUsers";

import "./css/App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Website Protected Routes */}
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/creategroup" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
        <Route path="/website" element={<ProtectedRoute><Website /></ProtectedRoute>} />
        <Route path="/gettingstarted" element={<ProtectedRoute><GettingStarted /></ProtectedRoute>} />
        <Route path="/client" element={<ProtectedRoute><Client /></ProtectedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/adminpanel" element={<AdminPanel />} />
        <Route path="/admin/usermanagement" element={<UserManagement />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        {/* <Route path="/admin/adminpanel" element={<AdminProtectedRoute><AdminPanel /></AdminProtectedRoute>} /> */}
        {/* <Route path="/admin/users" element={<AdminProtectedRoute><ManageUsers /></AdminProtectedRoute>} /> */}

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
