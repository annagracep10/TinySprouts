import React, { useEffect, useState } from 'react';

const AccountPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        <button>Change Password</button>
      </div>
      <div className="editDetails">
        <button>Edit Details</button>
      </div>
      <div className="addDetails">
        <button>Add Contact</button>
        <button>Add Address</button>
      </div>
    </div>
  );
};

export default AccountPage;
