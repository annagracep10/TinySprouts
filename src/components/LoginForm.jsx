import React, { useState } from "react";

export const LoginForm = ({ setIsLogin, setUser }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      userEmail,
      userPassword,
    };

    try {
      const response = await fetch('http://localhost:9090/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log("Login submitted:", result);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
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
