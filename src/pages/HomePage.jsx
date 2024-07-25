import React from 'react';
import { NavBar } from '../components/NavBar.jsx';
import "../styles/Content.css"


const HomePage = () => {
  return (
    <div>
      <NavBar/>
      <div className="indexcontent">
      <h1>Welcome to Tiny Sprouts</h1>
      <h2>Grow Plants - Go green </h2>
      <img src="/images/plantlogo.png" alt="plantlogo" />
      </div>
      
    </div>
  );
};

export default HomePage;