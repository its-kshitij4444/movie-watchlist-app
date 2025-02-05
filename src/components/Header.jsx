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
    <header className="text-white border-b-2 rounded-b-lg w-full py-4 px-6 backdrop-blur-md">
      <div className="mx-auto flex justify-evenly items-center">
        <div className="flex text-center items-center space-x-4">
          <Link to="/" className="min-[320px]:text-md min-[640px]:text-2xl font-bold">Movie Watchlist</Link>
          {user && <span className='min-[320px]:text-md min-[640px]:text-2xl text-blue-700 font-bold'>Hello, {user.name}!</span>}
        </div>
        {user && (
          <div className="flex text-center items-center space-x-4">
            <Link to="/watchlist" className="min-[320px]:text-md min-[640px]:text-lg hover:text-gray-300">My Watchlist</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded min-[320px]:px-2 min-[320px]:py-1 "
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