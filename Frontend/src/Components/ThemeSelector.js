import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPrimaryColor } from '../actions/themeActions';

const ThemeSelector = ({ username }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState('white');

  const handleColorChange = async (color) => {
    setSelectedColor(color);
    dispatch(setPrimaryColor(color));

    try {
      const response = await fetch('http://localhost:4000/api/setColor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          color: color
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update color');
      }

      console.log('Color updated successfully');
      
      // Apply the selected color to the background of the body element
      document.body.style.backgroundColor = color;
    } catch (error) {
      console.error('Error updating color:', error);
      // Handle error, show message to user, etc.
    }
  };

  return (
    <div>
      <h2>Choose Primary Color Theme</h2>
      <div>
        <button onClick={() => handleColorChange('white')}>White</button>
        <button onClick={() => handleColorChange('blue')}>Blue</button>
        <button onClick={() => handleColorChange('green')}>Green</button>
        <button onClick={() => handleColorChange('red')}>Red</button>
        {/* Add more color options as needed */}
      </div>
    </div>
  );
}

export default ThemeSelector;
