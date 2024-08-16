import React, { useState } from "react";
import PasswordInput from './PasswordInput';
import { useAlert } from '../AlertContext';

export const LoginForm = ({ setIsLogin, setUser }) => {
  const { showAlert } = useAlert();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const loginData = { userEmail, password };

    try {
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      const { accessToken } = result;
      localStorage.setItem('token', accessToken);

      const userResponse = await fetch('http://localhost:9090/api/auth/user-details', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` }
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
      showAlert(error.message);
    }
  };

  const handleRequestOtp = async () => {
    try {
      const response = await fetch(`http://localhost:9090/api/auth/request-password-reset?email=${encodeURIComponent(userEmail)}`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to request OTP');
      }

      setOtpSent(true);
      setError('OTP sent to your email.');
    } catch (error) {
      console.error('Error:', error);
      showAlert(error.message);
    }
  };

  // Handle reset password with OTP
  const handleResetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:9090/api/auth/reset-password?email=${encodeURIComponent(userEmail)}&otp=${encodeURIComponent(otp)}&newPassword=${encodeURIComponent(newPassword)}`, {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      const result = await response.json();
      showAlert('Password reset successfully');
      setIsResetPassword(false); 
      setOtpSent(false); 
      setOtp(''); 
      setNewPassword(''); 
    } catch (error) {
      console.error('Error:', error);
      showAlert(error.message);
    }
  };

  return (
    <div>
      {!isResetPassword ? (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>User Email</label>
            <input
              type="email"
              required
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
            />
            <label>Password</label>
            <PasswordInput password={password} setPassword={setPassword} />
          </div>
          <button type="submit">Login</button>
          <div className="toggle-container">
            <span>Forgot your password? </span>
            <button className="toggle-button" onClick={() => setIsResetPassword(true)}>Reset Password</button>
          </div>
        </form>
      ) : (
        <div>
          {!otpSent ? (
            <div>
              <h3>Reset Password</h3>
              <p>Enter your email to receive an OTP for resetting your password.</p>
              <input
                type="email"
                required
                value={userEmail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="Email"
              />
              <button onClick={handleRequestOtp}>Request OTP</button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div>
                <label>Enter OTP</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="OTP"
                />
                <label>New Password</label>
                <PasswordInput password={newPassword} setPassword={setNewPassword} />
                <button type="submit">Reset Password</button>
              </div>
            </form>
          )}
          <button onClick={() => setIsResetPassword(false)}>Back to Login</button>
        </div>
      )}
      <div className="toggle-container">
        <span>Don't have an account? </span>
        <button className="toggle-button" onClick={() => setIsLogin(false)}>Register Here</button>
      </div>
    </div>
  );
};
