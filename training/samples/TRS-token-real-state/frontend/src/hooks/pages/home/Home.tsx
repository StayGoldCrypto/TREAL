
// src/Home.tsx
import React from 'react';
import Tabs from './Tabs';
import AccountBalance from './AccountBalance';
import PropertyList from './PropertyList';
import InvestmentDashboard from './InvestmentDashboard';

function Home() {
  const tabs = [
    { title: 'Account Balance', content: <AccountBalance /> },
    { title: 'Property List', content: <PropertyList /> },
    { title: 'Investment Dashboard', content: <InvestmentDashboard /> },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Welcome to Stay Gold Crypto TREAL DAPP</h1>
      <Tabs tabs={tabs} />
    </div>
  );
}

export { Home };


/*
function Home() {
  return <div>Welcome to Stay Gold Crypto TREAL DAPP</div>;
}

export { Home };
*/

/*
// src/Home.tsx
import React, { useState } from 'react';

function Home() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Submitted: ${text}`);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Home Page</h1>
      
      <section style={{ marginBottom: '20px' }}>
        <h2>Counter</h2>
        <p>Count: {count}</p>
        <button onClick={handleClick} style={{ padding: '10px', fontSize: '16px' }}>
          Increment
        </button>
      </section>

      <section>
        <h2>Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text-input" style={{ display: 'block', marginBottom: '10px' }}>
            Enter some text:
          </label>
          <input
            id="text-input"
            type="text"
            value={text}
            onChange={handleChange}
            style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
          />
          <button
            type="submit"
            style={{ padding: '10px', fontSize: '16px' }}
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export { Home };

*/


