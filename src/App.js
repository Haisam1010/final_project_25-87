import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Home from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import Post from "./Post";

// Custom hook to get user data from JWT in localStorage
function useAuth() {
  const [userType, setUserType] = React.useState(undefined);  // Use undefined to indicate not yet determined
  const [isLoading, setIsLoading] = React.useState(true);  // Track loading state

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        setUserType(decodedToken.user_type);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUserType(null);
      }
    } else {
      setUserType(null);
    }
    setIsLoading(false);  // Update loading state after check
  }, []);

  return { userType, isLoading };
}

// Protected route component
function ProtectedRoute({ children, allowedTypes }) {
  const { userType, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;  // or any other loading indicator
  }

  if (!userType || !allowedTypes.includes(userType)) {
    return <Navigate to="/login" />;
  }

  return children;
}

function Layout() {
  const location = useLocation();
  const showNavbarAndFooter = !location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {showNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Post />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
