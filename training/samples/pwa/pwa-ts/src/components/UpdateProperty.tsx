 
import React, { useState } from 'react';

const UpdateProperty = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost/propertyAPI.php`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id: id.toString(),
        name,
        price: price.toString(),
        location,
      }),
    }).then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="number"
        placeholder="Property ID"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Property Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Update Property</button>
    </form>
  );
};

export default UpdateProperty;
