import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword, signInWithPopup, getIdToken } from "firebase/auth";
import axios from 'axios';
import { auth, googleProvider } from './firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';  
import { jwtDecode as jwt_decode } from 'jwt-decode';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

function Login() {
    const [alert, setAlert] = useState({ message: '', type: '' });  // Adjusted to handle both message and type
    const navigate = useNavigate(); 

    useEffect(() => {
        let timeout;
        if (alert.message !== '') {
            timeout = setTimeout(() => {
                setAlert({ message: '', type: '' });
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [alert.message]);

    const handleLogin = async (values, actions) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const token = await getIdToken(userCredential.user);
            const response = await axios.post('http://localhost:3001/api/users/login', { token });

            const jwtToken = response.data.token;
            localStorage.setItem('token', jwtToken);

            const decodedToken = jwt_decode(jwtToken);
            const userType = decodedToken.user_type;

            if (userType === 'user') {
                navigate('/user');
            } else if (userType === 'admin') {
                navigate('/admin');
            } else {
                console.error('Unknown user type:', userType);
            }

            setAlert({ message: response.data.message, type: 'success' });  // Set success alert
        } catch (error) {
            console.error('Login error:', error);
            setAlert({ message: 'Login error: ' + error.message, type: 'error' });  // Set error alert
        }
        actions.setSubmitting(false);
    };

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await getIdToken(result.user);
            const response = await axios.post('http://localhost:3001/api/users/login', { token });

            const jwtToken = response.data.token;
            localStorage.setItem('token', jwtToken);

            const decodedToken = jwt_decode(jwtToken);
            const userType = decodedToken.user_type;

            if (userType === 'user') {
                navigate('/user');
            } else if (userType === 'admin') {
                navigate('/admin');
            } else {
                console.error('Unknown user type:', userType);
            }

            setAlert({ message: response.data.message, type: 'success' });
        } catch (error) {
            console.error('Google login error:', error);
            setAlert({ message: 'Google login error: ' + error.message, type: 'error' });
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900" 
             style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/506/235/HD-wallpaper-white-hexagon-geometric-shapes-white-aesthetic.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {alert.message && (
                <div className={`absolute top-2 w-full text-center py-2 bg-${alert.type === 'success' ? 'green-500' : 'red-500'} text-white z-50`}>
                    {alert.message}
                </div>
            )}
            <div className="p-6 bg-blue-50 shadow-md rounded w-full max-w-md">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="text-2xl font-bold text-black text-center">
                                Login
                            </div>
                            <div>
                                <Field type="email" name="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded"/>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                            </div>
                            <div>
                                <Field type="password" name="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded"/>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-1000">
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
                <button
                    onClick={googleLogin}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded flex items-center justify-center hover:bg-purple-700 mt-4 transition-colors duration-1000"
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    Login with Google
                </button>
                <div className="text-center mt-4 text-sm">
                    Don't have an account?
                </div>
                <button
                    onClick={navigateToRegister}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 mt-2 transition-colors duration-1000"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Login;
