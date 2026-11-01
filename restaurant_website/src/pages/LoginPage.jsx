import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Notification from '../components/Notification';
import { getServerUrl } from '../components/AuthUtils';
import '../css/Auth.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username || !password) {
      setNotification({ message: 'Please fill in all fields', type: 'error' });
      setShowNotification(true);
      setLoading(false);
      return;
    }

    try {
      const serverUrl = getServerUrl();
      const response = await fetch(`${serverUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        localStorage.setItem('userLoggedIn', 'true');
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        login(result.user);
        
        setNotification({ message: 'Login successful!', type: 'success' });
        setShowNotification(true);
        
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1500);
      } else {
        setNotification({ message: result.error || 'Login failed', type: 'error' });
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification({ 
        message: 'Connection error. Please make sure the server is running on localhost:3001', 
        type: 'error' 
      });
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero">
      <div className="login_form">
        <h1>Welcome Back</h1>
        <form className="input_box" onSubmit={handleSubmit}>
          <div className="form_group">
            <i className="fas fa-user"></i>
            <input 
              type="text" 
              className="field" 
              placeholder="Username or Email" 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form_group">
            <i className="fas fa-lock"></i>
            <input 
              type={showPassword ? "text" : "password"} 
              className="field" 
              placeholder="Password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <i 
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="remember_forgot">
            <label className="remember_me">
              <input 
                type="checkbox" 
                className="check_box" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot_password">Forgot password?</a>
          </div>
          <button type="submit" className="submit_btn" disabled={loading}>
            <span>{loading ? 'Logging in...' : 'Login'}</span>
            <i className="fas fa-arrow-right"></i>
          </button>
          <div className="divider">
            <span>or continue with</span>
          </div>
          <div className="social_icon">
            <a href="#" className="social_btn google"><i className="fab fa-google"></i></a>
            <a href="#" className="social_btn facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social_btn twitter"><i className="fab fa-twitter"></i></a>
          </div>
          <div className="tag">
            <span>Don't have an account?</span>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
      
      {showNotification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setShowNotification(false)} 
        />
      )}
    </div>
  );
};

export default LoginPage;