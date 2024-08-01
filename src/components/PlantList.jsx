import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlantList = ({ setSelectedComponent, setSelectedPlant }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchPlants = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9090/api/product/plants', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlants(response.data);
    };

    fetchPlants();
  }, []);

  const handleUpdate = (plant) => {
    setSelectedPlant(plant);
    setSelectedComponent('UpdatePlant');
  };

  const handleDelete = async (plantId) => {
    const token = localStorage.getItem('token');
    try{await axios.delete(`http://localhost:9090/api/admin/plant/${plantId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPlants(plants.filter(plant => plant.id !== plantId));}
    catch(error){
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Plant List</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Plant ID</th>
            <th>Plant Name</th>
            <th>Type of Plant</th>
            <th>Sunlight Req.</th>
            <th>Watering Freq.</th>
            <th>Quantiy in Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant.id}>
              <td>{plant.id}</td>
              <td>{plant.name}</td> 
              <td>{plant.typeOfPlant}</td>
              <td>{plant.sunlightRequirements}</td>
              <td>{plant.wateringFrequency}</td>
              <td>{plant.quantity}</td>
              <td>Rs {plant.price}</td>
              <td>
                <button onClick={() => handleUpdate(plant)}>Update</button>
                <button onClick={() => handleDelete(plant.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlantList;
