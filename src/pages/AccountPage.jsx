import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAlert } from '../AlertContext';

const AccountPage = () => {
  const { showAlert } = useAlert();
  const [user, setUser] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:9090/api/auth/user-details', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUserFullName(data.userFullName);
          setUserEmail(data.userEmail);
          setPhone(data.phone);
          setAddress(data.address);
        } else {
          showAlert('Failed to fetch user details');
        }
      } catch (error) {
        showAlert('An error occurred while fetching user details');
      }
    };

    fetchUserDetails();
  }, [showAlert]);

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      showAlert("New passwords do not match");
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:9090/api/user/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        showAlert('Password changed successfully');
        setIsPasswordModalOpen(false);
      } else {
        const errorData = await response.json();
        showAlert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      showAlert('An error occurred while changing password');
    }
  };

  const handleEditDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:9090/api/user/update/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userFullName,
          userEmail,
          userPassword : user.userPassword,
          phone,
          address,
          userRole : user.userRole
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        showAlert('Details updated successfully');
        setIsEditModalOpen(false);
      } else {
        const errorData = await response.json();
        showAlert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      showAlert('An error occurred while updating details');
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
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>
      <div className="buttons">
        <button onClick={() => setIsPasswordModalOpen(true)}>Change Password</button>
        <br />
        <button onClick={() => setIsEditModalOpen(true)}>Edit Details</button>
      </div>

      {/* Password Change Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
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
          <button type="button" onClick={() => setIsPasswordModalOpen(false)}>Cancel</button>
        </form>
      </Modal>

      {/* Edit Details Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Details"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Edit Details</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleEditDetails();
        }}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              value={userFullName}
              onChange={(e) => setUserFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default AccountPage;
