import React, { useState } from 'react';
import axios from 'axios';
import { useAlert } from '../AlertContext'; // Assuming you have an AlertContext for displaying alerts

const UpdateUser = ({ user, setSelectedComponent }) => {
  const { showAlert } = useAlert(); // Use the showAlert function from the context

  const [userFullName, setUserFullName] = useState(user.userFullName);
  const [userEmail] = useState(user.userEmail);
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [userRole, setUserRole] = useState(user.userRole);
  const [userPassword] = useState(user.userPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:9090/api/user/update/${user.userId}`,
        {
          userFullName,
          userEmail,
          userPassword,
          phone,
          address,
          userRole
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showAlert('User updated successfully');
        setSelectedComponent('UserList');
      } else {
        const errorMessage = response.data.message || 'Failed to update user';
        showAlert(`Error: ${errorMessage}`);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update user';
      showAlert(`Error: ${errorMessage}`);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userEmail}
            disabled
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="ADMIN">ADMIN</option>
            <option value="BUYER">BUYER</option>
          </select>
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
