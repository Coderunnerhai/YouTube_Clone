import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
const navigate = useNavigate();


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5100/users/login', form);
    alert(res.data.message);

    // Save token
    localStorage.setItem('token', res.data.token);

    // ✅ Save userId
    localStorage.setItem('userId', res.data.user.userId);

    // Save user in React context
    setUser(res.data.user);

    // Navigate to home page
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  } finally {
    setLoading(false);
  }
};

const handleLogin = async () => {
  try {
    const res = await fetch('http://localhost:5100/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const response = await res.json();

    if (!res.ok) throw new Error(response.message || 'Login failed');

    // ✅ Save the token after successful login
    localStorage.setItem('token', response.token);

    console.log('✅ Logged in successfully');
  } catch (err) {
    console.error('❌ Login error:', err.message);
  }
};

  return (
    <div className="signin-wrapper">
  <form onSubmit={handleSubmit} className="signin-form">
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Sign In</button>
    </form>
    </div>
  );
};

export default Login;