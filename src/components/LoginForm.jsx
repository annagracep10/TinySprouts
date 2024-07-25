import React, { useState } from "react";

export const LoginForm = ({ setIsLogin }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log("Login submitted:", { useremail, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Email</label>
          <input type="email" required value={userEmail} onChange={(event) => setUserEmail(event.target.value)} />
          <label>Password</label>
          <input type="password" required value={userPassword} onChange={(event) => setUserPassword(event.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="toggle-container">
        <span>Don't have an account? </span>
        <button className="toggle-button" onClick={() => setIsLogin(false)}>Register Here</button>
      </div>
    </div>
  );
};
