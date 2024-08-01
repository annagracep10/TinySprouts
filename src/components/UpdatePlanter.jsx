import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePlanter = ({ planter,setSelectedComponent  }) => {
  const [updatedPlanter, setUpdatedPlanter] = useState(planter);
  const [error, setError] = useState('');
  useEffect(() => {
    setUpdatedPlanter(planter);
  }, [planter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPlanter({
      ...updatedPlanter,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{await axios.put(`http://localhost:9090/api/admin/planter/${planter.id}`, updatedPlanter, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSelectedComponent('PlanterList');
  }
    catch(error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h2>Update Planter</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePlanter;
