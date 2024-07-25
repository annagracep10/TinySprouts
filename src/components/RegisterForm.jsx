import React, { useState } from "react";

export const RegisterForm = ({ setIsLogin }) => {
  const [useremail, setUseremail] = useState('');
  const [userFullname, setUserFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle registration logic here
    console.log("Register submitted:", { userFullname, useremail, password, role });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" value={userFullname} onChange={(event) => setUserFullName(event.target.value)} />
          <label>User Email</label>
          <input type="text" value={useremail} onChange={(event) => setUseremail(event.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <label>Role</label>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="">Select Role</option>
            <option value="User">USER</option>
            <option value="Admin">ADMIN</option>
          </select>
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
