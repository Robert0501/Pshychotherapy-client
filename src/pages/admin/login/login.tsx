import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/login.css';
import userTypeEnum from '../../../models/enums/userTypeEnum.ts';

const Login = () => {
  const [username, setUsername] = useState(''); // State for username/email
  const [password, setPassword] = useState(''); // State for password
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    const formData = {
      username: username,
      password: password,
    };

    const response = await fetch('https://localhost:7053/api/Auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.userType === userTypeEnum.ADMIN) {
        const token = data.accessToken;

        localStorage.setItem('access_token', token);

        navigate('/admin/admin-dashboard');
      } else {
        setError('Cont invalid');
      }
    } else {
      setError('Cont invalid');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="email"
            name="email"
            id="email"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            required
          />
        </div>
        <button className="submit-button" type="button" onClick={handleSubmit}>
          Login
        </button>
        <p>{error}</p>
      </form>
    </div>
  );
};

export default Login;
