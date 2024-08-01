import React, { useState } from "react";

export const RegisterForm = ({ setIsLogin }) => {
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
      console.log("Register submitted:", result);
      setIsLogin(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" required value={userFullname} onChange={(event) => setUserFullName(event.target.value)} />
          <label>User Email</label>
          <input type="email" required value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
          <label>Password</label>
          <input type="userPassword" required value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
          <label>Role</label>
          <select value={userRole} required onChange={(event) => setUserRole(event.target.value)}>
            <option value="">Select Role</option>
            <option value="BUYER">BUYER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <span> </span>
        </div>
        <button type="submit">Register</button>
      </form>
      <div className="toggle-container">
      <span>Already have an account? </span>
        <button className="toggle-button" onClick={() => setIsLogin(true)}>Login Here</button>
      </div>
    </div>
  );
};
