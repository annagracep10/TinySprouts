import React, { useState } from 'react';
import { NavBar } from '../components/NavBar';
import "../styles/HomePage.css";
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

const HomePage = ({ setUser, user }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <div className="indexcontent">
        <div className="welcome">
          <h1>Welcome to Tiny Sprouts</h1>
          <h2>Grow Plants - Go Green</h2>
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
