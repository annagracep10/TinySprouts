
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
          axios.get('http://localhost:9091/product/plant'),
          axios.get('http://localhost:9091/product/planter'),
          axios.get('http://localhost:9091/product/seed'),
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
      <h1>Products</h1>
      <nav>
        <ul>
          <li>
          <Link to="/">Home Page</Link>
          </li>
        </ul>
      </nav>
      
      <h2>Plants</h2>
      <ul>
        {plants.map((plant) => (
          <li key={plant.id}>
            <Link to={`/product/plant/${plant.id}`}>{plant.name} - Rs {plant.price}</Link>
          </li>
        ))}
      </ul>
      <h2>Planters</h2>
      <ul>
        {planters.map((planter) => (
          <li key={planter.id}>
            <Link to={`/product/planter/${planter.id}`}>{planter.name} - Rs {planter.price}</Link>
          </li>
        ))}
      </ul>
      <h2>Seeds</h2>
      <ul>
        {seeds.map((seed) => (
          <li key={seed.id}>
            <Link to={`/product/seed/${seed.id}`}>{seed.name} - Rs {seed.price}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
