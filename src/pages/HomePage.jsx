import React, { useState } from 'react';
import { NavBar } from '../components/NavBar.jsx';
import "../styles/HomePage.css";
import { LoginForm } from '../components/LoginForm.jsx';
import { RegisterForm } from '../components/RegisterForm.jsx';

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <NavBar />
      <div className="indexcontent">
        <div className='welcome'>
          <h1>Welcome to Tiny Sprouts</h1>
          <h2>Grow Plants - Go green </h2>
          <img src="/images/plantlogo.png" alt="plantlogo" />
        </div>
        <div className="form">
          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <RegisterForm setIsLogin={setIsLogin} />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
