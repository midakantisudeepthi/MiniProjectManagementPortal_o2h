import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    // Dismiss automatically after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast-container-custom">
          <div className={`toast-custom ${toast.type}`}>
            <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
            <button 
              type="button" 
              className="btn-close ms-2 border-0 bg-transparent" 
              onClick={() => setToast(null)}
              style={{ fontSize: '0.7rem' }}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};
