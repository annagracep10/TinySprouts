import React, { useState } from 'react';
import axios from 'axios';

const CreatePlant = ({ setSelectedComponent }) => {
  const [error, setError] = useState('');
  const [image,setImage]=useState("");
  const [plant, setPlant] = useState({
    name: '',
    description: '',
    price: '',
    category: 'plant',
    quantity: '',
    typeOfPlant: '',
    sunlightRequirements: '',
    wateringFrequency: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant({
      ...plant,
      [name]: value
    });
  };

  const handleImage=(e)=>{
    setImage(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData= new FormData();
    formData.append('image',image)
    try {
      await axios.post('http://localhost:5000/upload', formData);
      await axios.post('http://localhost:9090/api/admin/plant', plant, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedComponent('PlantList');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Create Plant</h2>
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
        <label>
          Upload Image (Ensure file name same as product name) :
          <input type="file" name="file" onChange={handleImage}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePlant;
