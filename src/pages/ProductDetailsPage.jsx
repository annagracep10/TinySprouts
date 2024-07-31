import React, { useState, useEffect } from 'react';
import {  useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = ({ user }) => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response;
        switch (type) {
          case 'plant':
            response = await axios.get(`http://localhost:9091/product/plant/${id}`);
            break;
          case 'planter':
            response = await axios.get(`http://localhost:9091/product/planter/${id}`);
            break;
          case 'seed':
            response = await axios.get(`http://localhost:9091/product/seed/${id}`);
            break;
          default:
            throw new Error('Invalid product type');
        }
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [type, id]);

  const addToCart = async () => {
    if (!user) {
      alert('Please log in to add items to the cart.');
      navigate('/');
      return;
    }
  
    const cartItem = {
      productId: product.id,
      productName: product.name,
      quantity: quantity,
      productType: type,
    };
  
    const token = localStorage.getItem('token');

  const requestConfig = {
    method: 'post',
    url: `http://localhost:9090/api/cart/add`,
    data: cartItem,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    await axios(requestConfig);
    alert('Item added to cart');
    setCartError(null);  // Clear any previous errors
  } catch (err) {
    console.error('Error adding to cart:', err);
    const errorMessage = err.response ? err.response.data.message : 'Failed to add item to cart';
    setCartError(errorMessage);
  }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!product) return <div>No product found</div>;

  const imageUrl = `/images/${product.category}/${product.id}.jpg`;

  return (
    <div>
      <div className='content'>
        <h1>Product Detail</h1>
        <div className='product-detail'>
          <img
            src={imageUrl}
            alt={product.name}
            className='product-image'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/default.jpg';
            }}
          />
          <div className='product-detailinfo'>
            <h2>{product.name}</h2>
            <p><strong>Price :</strong> Rs {product.price}</p>
            {product.description && <p><strong>Description :</strong> {product.description}</p>}
            {product.quantity !== undefined && <p><strong>Stock Left :</strong> {product.quantity}</p>}
            {product.material && <p><strong>Material :</strong> {product.material}</p>}
            {product.dimensions && <p><strong>Dimensions :</strong> {product.dimensions}</p>}
            {product.color && <p><strong>Color :</strong> {product.color}</p>}
            {product.typeOfPlant && <p><strong>Type of Plant :</strong> {product.typeOfPlant}</p>}
            {product.sunlightRequirements && <p><strong>Sunlight Requirements :</strong> {product.sunlightRequirements}</p>}
            {product.wateringFrequency && <p><strong>Watering Frequency :</strong> {product.wateringFrequency}</p>}
            {product.seedType && <p><strong>Seed Type :</strong> {product.seedType}</p>}
            {product.germinationTime && <p><strong>Germination Time :</strong> {product.germinationTime} days</p>}
            {product.season && <p><strong>Season :</strong> {product.season}</p>}
            <div className="addCart">
              <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
              <br></br>
              <br></br>
              <button onClick={addToCart}>Add to Cart</button>
              {cartError && <div className="error">{cartError}</div>}
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
