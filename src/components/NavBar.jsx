import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
              Home Page
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className={({ isActive }) => isActive ? "active" : ""}>
              Your Orders
            </NavLink>
          </li>
          {user && user.userRole === 'ADMIN' && (
            <li>
              <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>
                Admin Dashboard
              </NavLink>
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
