import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/NavBar.css";

export const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className='navbar'>
      <div>
        <h1>Tiny Sprouts</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/orders">Your Orders</Link>
          </li>
          {user && user.userRole === 'ADMIN' && (
            <li>
              <Link to="/admin">Admin Dashboard</Link>
            </li>
          )}
          {user ? (
            <>
              <li>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </li>
              <li>
                <span>Welcome, {user.userFullName}</span>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
