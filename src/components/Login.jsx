import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { MovieContext } from './GlobalState';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to Movie Watchlist</h1>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
          />
        </div>
      </div>
    </div>
  );
};

export default Login;