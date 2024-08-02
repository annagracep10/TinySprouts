import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { NavBar } from '../components/NavBar';
import "../styles/Content.css"
import "../styles/Product.css"


const ProductsPage = () => {
  const [plants, setPlants] = useState([]);
  const [planters, setPlanters] = useState([]);
  const [seeds, setSeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [plantRes, planterRes, seedRes] = await Promise.all([
          axios.get('http://localhost:9090/api/product/plants'),
          axios.get('http://localhost:9090/api/product/planters'),
          axios.get('http://localhost:9090/api/product/seeds'),
        ]);
        setPlants(plantRes.data);
        setPlanters(planterRes.data);
        setSeeds(seedRes.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="content">
        <h1>Products</h1>
        
        <h2>Plants</h2>
        <div className="product-container">
          {plants.map((plant) => (
            <div key={plant.id} className="product-item">
              <Link to={`/product/plant/${plant.id}`}>
                <img 
                  src={`/images/plant/${plant.name}.jpg`} 
                  alt={plant.name} 
                  className="product-image" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg'; }} // Fallback image
                />
              </Link>     
                <div className="product-info">
                  <span className="product-name">{plant.name}</span>
                  <span className="product-price">Rs {plant.price}</span>
                </div>
              
            </div>
          ))}
        </div>
        
        <h2>Planters</h2>
        <div className="product-container">
          {planters.map((planter) => (
            <div key={planter.id} className="product-item">
              <Link to={`/product/planter/${planter.id}`}>
                <img 
                  src={`/images/planter/${planter.name}.jpg`} 
                  alt={planter.name} 
                  className="product-image" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg'; }} // Fallback image
                />
              </Link>
                <div className="product-info">
                  <span className="product-name">{planter.name}</span>
                  <span className="product-price">Rs {planter.price}</span>
                </div>
              
            </div>
          ))}
        </div>
        
        <h2>Seeds</h2>
        <div className="product-container">
          {seeds.map((seed) => (
            <div key={seed.id} className="product-item">
              <Link to={`/product/seed/${seed.id}`}>
                <img 
                  src={`/images/seed/${seed.name}.jpg`} 
                  alt={seed.name} 
                  className="product-image" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg'; }} // Fallback image
                />
              </Link>
                <div className="product-info">
                  <span className="product-name">{seed.name}</span>
                  <span className="product-price">Rs {seed.price}</span>
                </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
