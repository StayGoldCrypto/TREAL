import React, { useEffect, useState } from 'react';

type Property = {
  id: number;
  name: string;
  price: number;
  location: string;
};

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch('http://localhost/propertyAPI.php', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setProperties(data));
  }, []);

  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.name} - {property.location} - ${property.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;


/*
import React from 'react';

type Property = {
  id: number;
  name: string;
  price: number;
  location: string;
};

const properties: Property[] = [
  { id: 1, name: 'Property 1', price: 100000, location: 'New York' },
  { id: 2, name: 'Property 2', price: 120000, location: 'Los Angeles' },
  // Más propiedades...
];

const PropertyList = () => {
  return (
    <div>
      <h2>Available Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.name} - {property.location} - ${property.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
*/
