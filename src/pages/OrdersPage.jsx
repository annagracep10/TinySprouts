import React, { useState, useEffect } from 'react';
import "../styles/OrdersPage.css";
import { NavBar } from '../components/NavBar';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.userId);
      fetchOrders(user.userId);
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9090/api/orders/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
        <div className="orders-page">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order">
              <h2>Order ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <div className="items-list">
                {order.items.map(item => (
                  <div key={item.id} className="item">
                    <h3>{item.productName}</h3>
                    <p>Type: {item.productType}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
    
  );
};

export default OrdersPage;
