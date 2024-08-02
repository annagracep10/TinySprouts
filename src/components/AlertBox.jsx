import React from 'react';
import '../styles/AlertBox.css';
import { useAlert } from '../AlertContext';

const AlertBox = () => {
  const { alert, closeAlert } = useAlert();

  if (!alert.visible) return null;

  return (
    <div className="alert-box">
      <div className="alert-content">
        <span className="close-btn" onClick={closeAlert}>&times;</span>
        <p>{alert.message}</p>
        <button onClick={closeAlert}>OK</button>
      </div>
    </div>
  );
};

export default AlertBox;
