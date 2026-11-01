import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type} show`}>
      <div className="notification-content">
        <i className={`fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;