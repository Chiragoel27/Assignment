import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
// import './LoginForm.css'; // Assuming you have a separate CSS file for styling

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.message === 'Login successful') {
          // Store the username in localStorage
          localStorage.setItem('username', username);
          // Redirect to the home page using navigate function
          navigate('/home');
        } else {
          // Show a popup for wrong credentials
          alert('Wrong credentials');
        }
      } else {
        const responseData = await response.json(); // Assuming the error response is in JSON format
        if (responseData && responseData.error) {
          // Show a popup for wrong credentials
          alert(responseData.error);
        } else {
          alert('Unknown error occurred');
        }
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input_box">
          <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} required />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} required />
          <FaLock className='icon' />
        </div>
        <div className="remember-forget">
          <label>
            <input type="checkbox" name="" id="" />Remember me
          </label>
          <a href="/">Forgot Password?</a>
        </div>
        <button type='submit'>Login</button>
        <div className="register-link">
          <p>Don't have an account? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
