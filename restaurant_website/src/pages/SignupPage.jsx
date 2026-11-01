import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from  '../components/AuthContext';
import Notification from '../components/Notification';
import { validateEmail, validatePassword, getServerUrl } from '../components/AuthUtils';
import '../css/Auth.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = '';
    if (password.length === 0) {
      strength = '';
    } else if (password.length < 6) {
      strength = 'weak';
    } else if (password.length < 10) {
      strength = 'medium';
    } else {
      strength = 'strong';
    }
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setNotification({ message: 'Please fill in all required fields', type: 'error' });
      setShowNotification(true);
      return;
    }

    if (!validateEmail(formData.email)) {
      setNotification({ message: 'Please enter a valid email address', type: 'error' });
      setShowNotification(true);
      return;
    }

    if (!validatePassword(formData.password)) {
      setNotification({ 
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character', 
        type: 'error' 
      });
      setShowNotification(true);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotification({ message: 'Passwords do not match', type: 'error' });
      setShowNotification(true);
      return;
    }

    if (!termsAccepted) {
      setNotification({ message: 'Please accept the terms and conditions', type: 'error' });
      setShowNotification(true);
      return;
    }

    try {
      const serverUrl = getServerUrl();
      const response = await fetch(`${serverUrl}/api/register`,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        
        login(result.user);
        
        setNotification({ message: 'Account created successfully!', type: 'success' });
        setShowNotification(true);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const error = await response.json();
        setNotification({ message: error.error || 'Registration failed', type: 'error' });
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setNotification({ 
        message: 'Connection error. Please make sure the server is running on localhost:3001', 
        type: 'error' 
      });
      setShowNotification(true);
    }
  };

  return (
    <div className="hero">
      <div className="login_form">
        <h1>Create Account</h1>
        <form className="input_box" onSubmit={handleSubmit}>
          <div className="form_group">
            <i className="fas fa-user"></i>
            <input 
              type="text" 
              className="field" 
              placeholder="Full Name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form_group">
            <i className="fas fa-envelope"></i>
            <input 
              type="email" 
              className="field" 
              placeholder="Email Address" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form_group">
            <i className="fas fa-phone"></i>
            <input 
              type="tel" 
              className="field" 
              placeholder="Phone Number (Optional)" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form_group">
            <i className="fas fa-map-marker-alt"></i>
            <textarea 
              className="field" 
              placeholder="Address (Optional)" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="2"
            ></textarea>
          </div>
          <div className="form_group">
            <i className="fas fa-lock"></i>
            <input 
              type={showPassword ? "text" : "password"} 
              className="field" 
              placeholder="Password" 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required 
            />
            <i 
              className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
            {formData.password && (
              <div className="password-strength">
                <div className={`strength-bar strength-${passwordStrength}`}></div>
              </div>
            )}
          </div>
          <div className="form_group">
            <i className="fas fa-lock"></i>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              className="field" 
              placeholder="Confirm Password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required 
            />
            <i 
              className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>
          <div className="terms_conditions">
            <input 
              type="checkbox" 
              id="terms" 
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
            </label>
          </div>
          <button type="submit" className="submit_btn">
            <span>Sign Up</span>
            <i className="fas fa-user-plus"></i>
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
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
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

export default SignupPage;