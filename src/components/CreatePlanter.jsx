import React, { useState } from 'react';
import axios from 'axios';

const CreatePlanter = ({ setSelectedComponent }) => {
  const [error, setError] = useState('');
  const [image,setImage]=useState("");
  const [planter, setPlanter] = useState({
    name: '',
    description: '',
    price: '',
    category: 'planter',
    quantity: '',
    material: '',
    dimensions: '',
    color: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlanter({
      ...planter,
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
      await axios.post('http://localhost:9090/api/admin/planter', planter, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedComponent('PlanterList');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Create Planter</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={planter.name} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={planter.description} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={planter.price} onChange={handleChange} />
        </label>
        <label>
          Quantity:
          <input type="number" name="quantity" value={planter.quantity} onChange={handleChange} />
        </label>
        <label>
          Material:
          <input type="text" name="material" value={planter.material} onChange={handleChange} />
        </label>
        <label>
          Dimensions:
          <input type="text" name="dimensions" value={planter.dimensions} onChange={handleChange} />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={planter.color} onChange={handleChange} />
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

export default CreatePlanter;
