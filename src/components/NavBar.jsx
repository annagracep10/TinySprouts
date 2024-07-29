import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../styles/NavBar.css";

export const NavBar = ({ setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
