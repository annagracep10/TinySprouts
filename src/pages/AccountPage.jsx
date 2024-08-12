import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAlert } from '../AlertContext';

const AccountPage = () => {
  const { showAlert } = useAlert();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      showAlert("New passwords do not match");
      return;
    }
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:9090/api/user/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });

    if (response.ok) {
      showAlert('Password changed successfully');
      setIsModalOpen(false);
    } else {
      const errorData = await response.json();
      showAlert(`Error: ${errorData.message}`);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-page">
      <h2>Account Details</h2>
      <div className="user-details">
        <p><strong>Full Name:</strong> {user.userFullName}</p>
        <p><strong>Email:</strong> {user.userEmail}</p>
      </div>
      <div className="changePass">
        <button onClick={() => setIsModalOpen(true)}>Change Password</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Change Password"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Change Password</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}>
          <div>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default AccountPage;
