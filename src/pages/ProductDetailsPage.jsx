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

  const imageUrl = `/images/${product.category}/${product.id}.jpg`;

  return (
    <div>
      <NavBar />
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
            {product.season && <p><strong>Season :</strong>{product.season}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
