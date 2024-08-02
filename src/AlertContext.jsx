import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', visible: false });

  const showAlert = (message) => {
    setAlert({ message, visible: true });
  };

  const closeAlert = () => {
    setAlert({ message: '', visible: false });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
