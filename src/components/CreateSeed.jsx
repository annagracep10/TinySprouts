import React, { useState } from 'react';
import axios from 'axios';

const CreateSeed = ({ setSelectedComponent }) => {
  const [error, setError] = useState('');
  const [image,setImage]=useState("");
  const [seed, setSeed] = useState({
    name: '',
    description: '',
    price: '',
    category: 'seed',
    quantity: '',
    seedType: '',
    germinationTime: '',
    season: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeed({
      ...seed,
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
      await axios.post('http://localhost:9090/api/admin/seed', seed, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedComponent('SeedList');
      setError(null); 
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Create Seed</h2>
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
        <label>
          Upload Image (Ensure file name same as product name) :
          <input type="file" name="file" onChange={handleImage}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateSeed;
