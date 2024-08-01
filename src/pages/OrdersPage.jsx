import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/OrdersPage.css";

const OrdersPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
      fetchOrders(user.userId);
    }
  }, [user]);

  const fetchOrders = async (userId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9090/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          navigate('/');
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      console.log('Fetched data:', data); 
      setOrders(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err); 
      setError(err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:9090/api/orders/cancel/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          navigate('/');
          return;
        }
        throw new Error('Failed to cancel order');
      }

      fetchOrders(userId);  
    } catch (err) {
      console.error('Error cancelling order:', err); 
      setError(err.message || 'Failed to cancel order');
    }
  };

  return (
    <div>
      <div className="orders-page">
        <h1>Your Orders</h1>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.length > 0 && (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Items</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>
                    {order.items.map(item => (
                      <div key={item.id} className="item">
                        <p><strong>{item.productName}</strong></p>
                        <p>Type: {item.productType}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: Rs {item.price}</p>
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.status !== 'CANCELLED' && (
                      <button onClick={() => cancelOrder(order.id)} className="cancel-button">Cancel Order</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
