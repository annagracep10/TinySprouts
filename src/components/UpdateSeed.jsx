import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSeed = ({ seed ,setSelectedComponent }) => {
  const [updatedSeed, setUpdatedSeed] = useState(seed);
  const [error, setError] = useState('');
  useEffect(() => {
    setUpdatedSeed(seed);
  }, [seed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedSeed({
      ...updatedSeed,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{await axios.put(`http://localhost:9090/api/admin/seed/${seed.id}`, updatedSeed, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSelectedComponent('SeedList');
  }
    catch(error){
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Update Seed</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" name="name" value={seed.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={seed.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={seed.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={seed.quantity} onChange={handleChange} />
        </label>
        <label>
          Seed Type:
          <input type="text" name="seedType" value={seed.seedType} onChange={handleChange} />
        </label>
        <label>
          Germination Time:
          <input type="number" name="germinationTime" value={seed.germinationTime} onChange={handleChange} />
        </label>
        <label>
          Season:
          <input type="text" name="season" value={seed.season} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateSeed;
