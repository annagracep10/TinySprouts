import React, { useState } from 'react';
import '../styles/PasswordInput.css';

const PasswordInput = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="password-input"
      />
      <span className="eye-icon" onClick={toggleShowPassword}>
        {showPassword ? '👁️' : '👁️‍🗨️'}
      </span>
    </div>
  );
};

export default PasswordInput;
