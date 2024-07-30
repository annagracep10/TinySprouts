import React, { useState } from "react";

export const LoginForm = ({ setIsLogin, setUser }) => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = {
      userEmail,
      password,
    };

    try {
      const response = await fetch('http://localhost:9090/api/auth/login', {
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
      const { accessToken } = result;
      localStorage.setItem('token', accessToken);

      // Fetch user details with token
      const userResponse = await fetch('http://localhost:9090/api/auth/user-details', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userDetails));
      setUser(userDetails);
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
          <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
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
