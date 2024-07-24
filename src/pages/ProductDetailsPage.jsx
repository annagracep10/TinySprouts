// src/components/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

const ProductDetailPage = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [type, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.response ? error.response.data.message : error.message}</div>;

  if (!product) return <div>No product found</div>;

  return (
    <div>
      <NavBar></NavBar>
      <div className='content'>
      <h1>Product Detail</h1>
      <h2>{product.name}</h2>
      <p>Price: Rs {product.price}</p>
      {product.description && <p>Description: {product.description}</p>}
      {product.quantity !== undefined && <p>Stock Left: {product.quantity}</p>}
      {product.category && <p>Category: {product.category}</p>}
      {product.material && <p>Material: {product.material}</p>}
      {product.dimensions && <p>Dimensions: {product.dimensions}</p>}
      {product.color && <p>Color: {product.color}</p>}
      {product.typeOfPlant && <p>Type of Plant: {product.typeOfPlant}</p>}
      {product.sunlightRequirements && <p>Sunlight Requirements: {product.sunlightRequirements}</p>}
      {product.wateringFrequency && <p>Watering Frequency: {product.wateringFrequency}</p>}
      {product.seedType && <p>Seed Type: {product.seedType}</p>}
      {product.germinationTime && <p>Germination Time: {product.germinationTime} days</p>}
      {product.season && <p>Season: {product.season}</p>}
    </div>

      </div>
      
  );
};

export default ProductDetailPage;
