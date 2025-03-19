import React, { useState, useEffect } from 'react';
import UpdateItem from './components/UpdateItem';

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // State to store the fetched item
  const [item, setItem] = useState(null);

  // Fetch the existing item from the server when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/1`);
        if (!response.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      {item ? (
        <UpdateItem item={item} />
      ) : (
        <p>Loading item data...</p>
      )}
    </div>
  );
}

export default App;
