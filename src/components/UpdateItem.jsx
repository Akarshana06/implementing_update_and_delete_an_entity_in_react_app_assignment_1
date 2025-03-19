import React, { useState } from 'react';

const UpdateItem = ({ item }) => {
  // 1. Initialize state for the form
  const [formData, setFormData] = useState({
    name: item.name || '',
    description: item.description || '',
    // Add other fields as necessary
  });

  // 2. Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://${import.meta.env.VITE_API_URI}/doors/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      // Optionally, handle successful update (e.g., show a success message)
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error updating item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      {/* Add other form fields as necessary */}
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItem;
