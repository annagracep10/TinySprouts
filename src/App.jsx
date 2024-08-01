import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import OrdersPage from './pages/OrdersPage';
import { NavBar } from './components/NavBar';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    }
    return null;
  });

  return (
    <Router>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:type/:id" element={<ProductDetailsPage setUser={setUser} user={user}/>} />
        <Route path="/orders" element={<OrdersPage setUser={setUser} user={user}/>} />
        <Route path="/cart" element={<CartPage setUser={setUser} user={user} />} />
        {user && user.userRole === 'ADMIN' && (
          <Route path="/admin" element={<AdminDashboard/>} /> 
        )}
      </Routes>
    </Router>
  );
}

export default App;
