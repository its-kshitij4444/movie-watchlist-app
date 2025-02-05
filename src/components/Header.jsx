import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MovieContext } from './GlobalState';

const Header = () => {
  const { user, setUser } = useContext(MovieContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-xl font-bold">Movie Watchlist</Link>
          {user && <span>Hello, {user.name}!</span>}
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <Link to="/watchlist" className="hover:text-gray-300">My Watchlist</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;