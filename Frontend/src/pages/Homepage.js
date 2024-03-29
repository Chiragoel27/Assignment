import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ThemeSelector from '../Components/ThemeSelector';
import { useSelector } from 'react-redux';


const HomePage = () => {
  const [username, setUsername] = useState('');
  const [primaryColor, setPrimaryColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);

      axios.post('http://localhost:4000/api/getColor', { username: storedUsername })
        .then(response => {
          const { data } = response;
          if (data && data.user && data.user.color) {
            setPrimaryColor(data.user.color);
          } else {
            setError('Invalid response format');
          }
        })
        .catch(error => {
          console.error('Error fetching user color:', error);
          setError('Failed to fetch user color');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  document.body.style.backgroundColor = primaryColor;

  return (
    <div className='welcome'> 
      <h2>Home Page</h2>
      <h1>Welcome {username}, have a great time choosing your preference! </h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <ThemeSelector username={username}/> {/* Integrate ThemeSelector component */}
        </div>
      )}
    </div>
  );
}

export default HomePage;
