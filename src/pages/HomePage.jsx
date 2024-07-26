import React, { useState, useEffect } from 'react';
import { NavBar } from '../components/NavBar.jsx';
import "../styles/HomePage.css";
import { LoginForm } from '../components/LoginForm.jsx';
import { RegisterForm } from '../components/RegisterForm.jsx';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      <div className="indexcontent">
        <div className='welcome'>
          <h1>Welcome to Tiny Sprouts</h1>
          <h2>Grow Plants - Go green </h2>
          <img src="/images/plantlogo.png" alt="plantlogo" />
        </div>
        <div className="form">
          {user ? (
            <div>
              <h2>Welcome, {user.userFullName}</h2>
            </div>
          ) : (
            isLogin ? (
              <LoginForm setIsLogin={setIsLogin} setUser={setUser} />
            ) : (
              <RegisterForm setIsLogin={setIsLogin} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
