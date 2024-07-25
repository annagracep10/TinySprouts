import React, { useState } from "react";

export const LoginForm = ({ setIsLogin }) => {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');

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
          <input type="text" value={useremail} onChange={(event) => setUseremail(event.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
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
