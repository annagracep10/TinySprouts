import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeedList = ({ setSelectedComponent, setSelectedSeed }) => {
  const [seeds, setSeeds] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchSeeds = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9090/api/product/seeds', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSeeds(response.data);
    };

    fetchSeeds();
  }, []);

  const handleUpdate = (seed) => {
    setSelectedSeed(seed);
    setSelectedComponent('UpdateSeed');
  };

  const handleDelete = async (seedId) => {
    const token = localStorage.getItem('token');
    try{await axios.delete(`http://localhost:9090/api/admin/seed/${seedId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSeeds(seeds.filter(seed => seed.id !== seedId));}
    catch(error){
      setError(error.response?.data?.message || 'An error occurred');
    } 
  };

  return (
    <div>
      <h2>Seed List</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Seed ID</th>
            <th>Seed Name</th>
            <th>Seed Type</th>
            <th>Germination Time</th>
            <th>Season</th>
            <th>Quantity in Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seeds.map(seed => (
            <tr key={seed.id}>
              <td>{seed.id}</td>
              <td>{seed.name}</td>
              <td>{seed.seedType}</td>
              <td>{seed.germinationTime}</td>
              <td>{seed.season}</td>
              <td>{seed.quantity}</td>
              <td>Rs {seed.price}</td>
              <td>
                <button onClick={() => handleUpdate(seed)}>Update</button>
                <button onClick={() => handleDelete(seed.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeedList;
