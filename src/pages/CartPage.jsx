import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/CartPage.css";
import { useAlert } from '../AlertContext';

const CartPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Razorpay script'));
        document.body.appendChild(script);
      });
    };

    const fetchCartItems = async () => {
      if (!user) {
        setError('Please log in to view cart items.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:9090/api/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const items = response.data.cart.items;
        setCartItems(items);
        const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalAmount(amount);
        setLoading(false);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          showAlert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
          navigate('/');
        } else {
          setError('Failed to fetch cart items');
        }
        setLoading(false);
      }
    };

    loadRazorpayScript()
      .then(() => {
        fetchCartItems();
      })
      .catch(err => {
        console.error('Error loading Razorpay script:', err);
        showAlert('Failed to load payment gateway');
        setLoading(false);
      });
  }, [user, navigate, showAlert, setUser]);

  const removeFromCart = async (itemId) => {
    if (!user) {
      showAlert('Please log in to remove items from the cart.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:9090/api/cart/remove/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        showAlert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
      } else {
        showAlert('Failed to remove item from cart');
        console.error('Error removing item from cart:', err);
      }
    }
  };

  const checkout = async () => {
    if (!user) {
      showAlert('Please log in to proceed with checkout.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:9090/api/cart/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { cart } = response.data;
      if (cart) {
        const { id , razorpayOrderId, razorpayOrderCurrency, razorpayOrderAmount } = cart;

        if (!razorpayOrderAmount || !razorpayOrderCurrency || !razorpayOrderId) {
          console.error('Cart data is missing required fields:', cart);
          showAlert('Cart data is incomplete');
          return;
        }

        const options = {
          key: "rzp_test_Thl9rIC9HYN3Wi", 
          amount: razorpayOrderAmount, 
          currency: razorpayOrderCurrency,
          name: "TINY SPROUTS",
          description: "Order #" + id,
          order_id: razorpayOrderId,
          prefill: {
            name: user.userFullName,
            email: user.userEmail,
            contact: 9887654567
          },
          theme: {
            color: "#3399cc",
          },handler: async function (response) {
            const paymentData = {
              razorpayOrderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            };
  
            try {
              const token = localStorage.getItem('token');
              const verifyResponse = await axios.post(
                `http://localhost:9090/api/cart/verifyPayment`,
                paymentData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
  
              if (verifyResponse.data) {
                showAlert('Payment verified and order placed successfully');
              } else {
                showAlert('Payment verification failed');
              }
            } catch (error) {
              console.error('Payment verification failed:', error);
              showAlert('Payment verification failed');
            }
          },
        };

        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          console.error('Razorpay script not loaded');
          showAlert('Razorpay script not loaded');
        }
      } else {
        console.error('Cart data not available');
        showAlert('Cart data not available');
      }

    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        showAlert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
      } else {
        setCheckoutError('Failed to complete checkout');
        console.error('Error during checkout:', err);
      }
    }
  };
  
  if (loading) return <div>Loading...</div>;

  if (error && !cartItems.length) return (
    <div className="content">
      <h1>Cart</h1> 
      <div>Your cart is empty</div>
    </div>
  );

  return (
    <div>
      <div className="content">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price (Rs)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>
                      <button onClick={() => removeFromCart(item.id)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-amount">Total Amount: Rs {totalAmount}</div>
            <button className="checkout-button" onClick={checkout}>Checkout</button>
            {checkoutError && <div className="error">{checkoutError}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
