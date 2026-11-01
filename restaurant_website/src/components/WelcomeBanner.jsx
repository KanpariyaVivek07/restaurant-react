import React, { useState, useEffect } from 'react';

const WelcomeBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    
    if (!hasSeenWelcome) {
      setIsVisible(true);
      localStorage.setItem('hasSeenWelcome', 'true');
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-banner">
      <div className="welcome-content">
        <div>
          <h3>Welcome to Vivek's Kitchen! 🎉</h3>
          <p>Enjoy 15% off your first order with code <strong>WELCOME15</strong></p>
        </div>
        <button className="close-welcome" onClick={closeBanner} aria-label="Close welcome banner">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;