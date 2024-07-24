import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Tiny Sprouts</h1>
      <nav>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default HomePage;