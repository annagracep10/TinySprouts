import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/CartPage.css";

const CartPage = ({ user }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setError('Please log in to view cart items.');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:9090/api/cart/${user.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data.cart.items);  // Accessing the `items` array within the `cart` object
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  const removeFromCart = async (itemId) => {
    if (!user) {
      alert('Please log in to remove items from the cart.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:9090/api/cart/${user.userId}/remove/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(cartItems.filter(item => item.id !== itemId));  // Ensure we're using the correct `id` field
    } catch (err) {
      alert('Failed to remove item from cart');
      console.error('Error removing item from cart:', err);
    }
  };

  const checkout = async () => {
    if (!user) {
      alert('Please log in to proceed with checkout.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:9090/api/cart/${user.userId}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Checkout successful!');
      setCartItems([]);  // Clear the cart on successful checkout
    } catch (err) {
      setCheckoutError('Failed to complete checkout');
      console.error('Error during checkout:', err);
    }
  };


  if (loading) return <div>Loading...</div>;

  // If there's an error and the user is logged in
  if (error && !cartItems.length) return (
    <div>
      <h1>Cart</h1> 
      <div>Your cart is empty</div>
    </div>
    
  )
  

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
            <button className="checkout-button" onClick={checkout}>Checkout</button>
            {checkoutError && <div className="error">{checkoutError}</div>}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
