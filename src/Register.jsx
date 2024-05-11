import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, signInWithPopup, getIdToken } from "firebase/auth";
import axios from 'axios';
import { auth, googleProvider } from './firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const registerSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

function Register() {
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        if (alert !== '') {
            timeout = setTimeout(() => {
                setAlert('');
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [alert]);

    const handleRegister = async (values, actions) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const token = await getIdToken(userCredential.user);
            const response = await axios.post('http://localhost:3001/api/users/register', {
                email: userCredential.user.email,
                firebaseUid: userCredential.user.uid,
                token: token,
            });

            const jwtToken = response.data.token; // Extract JWT token from backend response
            localStorage.setItem('token', jwtToken);

            // Decode JWT token to extract user type
            const decodedToken = jwt_decode(jwtToken);
            const userType = decodedToken.user_type;

            if (userType === 'user') {
                navigate('/user');
            } else if (userType === 'admin') {
                navigate('/admin');
            } else {
                console.error('Unknown user type:', userType);
            }

            setAlert('Registration successful');
            console.log('Backend response:', response.data);
        } catch (error) {
            console.error('Registration error:', error);
            setAlert('Registration error: ' + error.message);
        }
        actions.setSubmitting(false);
    };

    const googleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await getIdToken(result.user);
            const response = await axios.post('http://localhost:3001/api/users/register', { token });

            const jwtToken = response.data.token; // Extract JWT token from backend response
            localStorage.setItem('token', jwtToken);

            // Decode JWT token to extract user type
            const decodedToken = jwt_decode(jwtToken);
            const userType = decodedToken.user_type;

            if (userType === 'user') {
                navigate('/user');
            } else if (userType === 'admin') {
                navigate('/admin');
            } else {
                console.error('Unknown user type:', userType);
            }

            setAlert('Google sign up successful');
        } catch (error) {
            console.error('Google sign up error:', error);
            setAlert('Google sign up error: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900" 
             style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/506/235/HD-wallpaper-white-hexagon-geometric-shapes-white-aesthetic.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {alert && (
                <div className={`absolute top-2 w-full text-center py-2 bg-${alert.includes('successful') ? 'green-500' : 'red-500'} text-white z-50`}>
                    {alert}
                </div>
            )}
            <div className="p-6 bg-blue-50 shadow-md rounded w-full max-w-md">
                <Formik
                    initialValues={{ email: '', password: '', confirmPassword: '' }}
                    validationSchema={registerSchema}
                    onSubmit={handleRegister}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="text-2xl font-bold text-black text-center">
                                Register
                            </div>
                            <Field type="email" name="email" placeholder="Email" className="w-full p-2 border border-gray-300 rounded"/>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                            <Field type="password" name="password" placeholder="Password" className="w-full p-2 border border-gray-300 rounded"/>
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
                            <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full p-2 border border-gray-300 rounded"/>
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm"/>
                            <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors duration-1000">
                                Register
                            </button>
                            <div className="flex items-center justify-center mt-4">
                                <button
                                    type="button"
                                    className="w-full py-2 px-4 bg-purple-600 text-white rounded hover:bg-purple-700"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <button
                    onClick={googleSignUp}
                    className="w-full py-2 px-4 bg-purple-600 text-white rounded flex items-center justify-center hover:bg-purple-700 mt-4 transition-colors duration-1000"
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-2" />
                    Sign Up with Google
                </button>
            </div>
        </div>
    );
    
    
}

export default Register;
