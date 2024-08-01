import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanterList = ({ setSelectedComponent, setSelectedPlanter }) => {
  const [planters, setPlanters] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchPlanters = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:9090/api/product/planters', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlanters(response.data);
    };

    fetchPlanters();
  }, []);

  const handleUpdate = (planter) => {
    setSelectedPlanter(planter);
    setSelectedComponent('UpdatePlanter');
  };

  const handleDelete = async (planterId) => {
    const token = localStorage.getItem('token');
    try{await axios.delete(`http://localhost:9090/api/admin/planter/${planterId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPlanters(planters.filter(planter => planter.id !== planterId));}
    catch(error){
      setError(error.response?.data?.message || 'An error occurred');
    }  
  };

  return (
    <div>
      <h2>Planter List</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Planter ID</th>
            <th>Planter Name</th>
            <th>Material</th>
            <th>Dimensions</th>
            <th>Color</th>
            <th>Quantiy in Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {planters.map(planter => (
            <tr key={planter.id}>
              <td>{planter.id}</td>
              <td>{planter.name}</td>
              <td>{planter.material}</td>
              <td>{planter.dimensions}</td>
              <td>{planter.color}</td>
              <td>{planter.quantity}</td>
              <td>Rs {planter.price}</td>        
              <td className="adminButton">
                <button onClick={() => handleUpdate(planter)}>Update</button>
                <button onClick={() => handleDelete(planter.id)}>Delete</button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanterList;

