import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from local storage (assuming you store the token as 'token')
        localStorage.removeItem('token');
        // Redirect to home
        navigate('/');
    };

    return (
        <div>
            {handleLogout()}
        </div>
    );
}

export default Logout;
