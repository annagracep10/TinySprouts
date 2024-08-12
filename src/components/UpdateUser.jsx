import React, { useState } from 'react';
import axios from 'axios';

const UpdateUser = ({ user ,setSelectedComponent }) => {
  const [formData, setFormData] = useState({
    userFullName: user.userFullName,
    userEmail: user.userEmail,
    userPassword: user.userPassword,
    phone : user.phone,
    address : user.address,
    userRole: user.userRole,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:9090/api/user/update/${user.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('User updated successfully');
      setSelectedComponent('UserList');
      setError(null);
    } catch (err) {
      setError('Failed to update user');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" required name="userFullName" value={formData.userFullName} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" required name="userEmail" value={formData.userEmail} onChange={handleChange} />
        </label>
        <label>
          Mobile Number:
          <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text"  name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" required name="userPassword" value={formData.userPassword} onChange={handleChange} />
        </label>
        <label>
          Role:
          <select name="userRole" required value={formData.userRole} onChange={handleChange}>
            <option value="ADMIN">ADMIN</option>
            <option value="BUYER">BUYER</option>
          </select>
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
