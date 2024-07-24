import React from 'react';
import { NavBar } from '../components/NavBar.jsx';
import "../styles/Content.css"


const HomePage = () => {
  return (
    <div>
      <NavBar/>
      <div className='content'>
        <img src="/images/image.png" alt=" Nursery Picture" 
        style={{
        
          objectFit: 'cover', 
        }}/>
      </div>
      
    </div>
  );
};

export default HomePage;