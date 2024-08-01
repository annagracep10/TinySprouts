import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePlant = ({ plant , setSelectedComponent }) => {
  const [updatedPlant, setUpdatedPlant] = useState(plant);
  const [error, setError] = useState('');
  useEffect(() => {
    setUpdatedPlant(plant);
  }, [plant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlant({
      ...updatedPlant,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{await axios.put(`http://localhost:9090/api/admin/plant/${plant.id}`, updatedPlant, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSelectedComponent('PlantList');
  }
    catch(error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Update Plant</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" name="name" value={plant.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={plant.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={plant.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={plant.quantity} onChange={handleChange} />
        </label>
        <label>
          Type of Plant:
          <input type="text" name="typeOfPlant" value={plant.typeOfPlant} onChange={handleChange} />
        </label>
        <label>
          Sunlight Requirements:
          <input type="text" name="sunlightRequirements" value={plant.sunlightRequirements} onChange={handleChange} />
        </label>
        <label>
          Watering Frequency:
          <input type="text" name="wateringFrequency" value={plant.wateringFrequency} onChange={handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePlant;
