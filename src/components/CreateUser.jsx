import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = ({ setSelectedComponent }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userFullname, setUserFullName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const userData = {
        userFullName: userFullname,
        userEmail: userEmail,
        userPassword: userPassword,
        userRole: userRole
      };
  
      try {
        const response = await fetch('http://localhost:9090/api/auth/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }
  
        const result = await response.json();
        setSelectedComponent('UserList');
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      }
    };
    return (
      <div>
        <h2>Create User</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input type="text" required value={userFullname} onChange={(event) => setUserFullName(event.target.value)} />
            <label>User Email</label>
            <input type="email" required value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
            <label>Password</label>
            <input type="password" required value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
            <label>Role</label>
            <select value={userRole} required onChange={(event) => setUserRole(event.target.value)}>
              <option value="">Select Role</option>
              <option value="BUYER">BUYER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            <span> </span>
          </div>
          <button type="submit">Create User</button>
        </form>
    </div>
  );
};

export default CreateUser;
