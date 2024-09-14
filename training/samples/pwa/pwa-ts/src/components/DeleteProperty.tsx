import React, { useState } from 'react';

const DeleteProperty = () => {
  const [id, setId] = useState(0);

  const handleDelete = () => {
    fetch(`http://localhost/propertyAPI.php`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id: id.toString(),
      }),
    }).then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Property ID"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={handleDelete}>Delete Property</button>
    </div>
  );
};

export default DeleteProperty;
