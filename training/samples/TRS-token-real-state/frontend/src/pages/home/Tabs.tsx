// src/pages/home/Tabs.tsx
import React, { useState } from 'react';
import Modal from './Modal';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { title: 'Account', content: <AccountContent /> },
    { title: 'Properties', content: <PropertiesContent /> },
    { title: 'Investments', content: <InvestmentsContent /> },
    { title: 'Loans', content: <LoansContent /> },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActiveTab(null);
  };

  return (
    <>
      <div style={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            style={index === activeTab ? styles.activeTab : styles.tab}
            onClick={() => handleTabClick(index)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleTabClick(index);
              }
            }}
            tabIndex={0}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {activeTab !== null && tabs[activeTab].content}
      </Modal>
    </>
  );
};

const styles = {
  tabHeaders: { display: 'flex' },
  tab: { padding: '10px', cursor: 'pointer', border: '1px solid transparent' },
  activeTab: { padding: '10px', cursor: 'pointer', fontWeight: 'bold', borderColor: 'blue' },
};

// Dummy components for the content
const AccountContent = () => (
  <div>
    <h2>Account</h2>
    <p>Balance: $1234.56</p>
    <h3>Detailed Transactions:</h3>
    <ul>
      <li>VARA - Transfer Founds: $100</li>
      <li>TREAL - Exchange Token: $200</li>
      <li>DOT - Buy VARA Token: $1200</li>
    </ul>
  </div>
);

const PropertiesContent = () => (
  <div>
    <h2>Properties</h2>
    <ul>
      <li>
        <img src="/property1.jpeg" alt="Property 1" style={{ width: '100px', height: '100px' }} />
        <p>Appartments on Sale in Buenos Aires</p>
        <select>
          <option>Rent</option>
          <option>Buy</option>
          <option>Share Ownership</option>
          <option>Grant Loan</option>
          <option>Stacking Tokens</option>
        </select>
      </li>
      <li>
        <img src="/property2.jpeg" alt="Property 2" style={{ width: '100px', height: '100px' }} />
        <p>Ranch for Sale in Mexico: </p>
        <select>
          <option>Buy</option>
          <option>Share Ownership</option>
          <option>Grant Loan</option>
        </select>
      </li>
    </ul>
  </div>
);

const InvestmentsContent = () => (
  <div>
    <h2>Investments</h2>
    <p>Shared ownership</p>
    <p>Share percent: 35%</p>
    <p>Date of Investment: 2024-01-01</p>
    <p>Amount Invested: $5000</p>
    <p>Amount Earned: $6000</p>
    <p>Current Status: Active</p>
  </div>
);

const LoansContent = () => (
  <div>
    <h2>Loans</h2>
    <ul>
      <li>
        <p>Loan 1</p>
        <p>Next Due Date: 2024-12-01</p>
        <p>Current Status: Pending</p>
        <p>Amount to Pay: $1000</p>
      </li>
      <li>
        <p>Loan 2</p>
        <p>Next Due Date: 2025-01-15</p>
        <p>Current Status: Completed</p>
        <p>Amount to Pay: $500</p>
      </li>
    </ul>
  </div>
);

export default Tabs;


/* solo pestanias y funciona bien
// src/pages/home/Tabs.tsx
import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [{ title: 'Account' }, { title: 'Properties' }, { title: 'Investments' }, { title: 'Loans' }];

  const styles = {
    tabHeaders: { display: 'flex' },
    tab: { padding: '10px', cursor: 'pointer', border: '1px solid transparent' },
    activeTab: { padding: '10px', cursor: 'pointer', fontWeight: 'bold', borderColor: 'blue' },
  };

  const handleClick = (index: number) => {
    setActiveTab(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick(index);
    }
  };

  return (
    <div style={styles.tabHeaders}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          style={index === activeTab ? styles.activeTab : styles.tab}
          onClick={() => handleClick(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          tabIndex={0} // Make the button focusable
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
*/

/* pestanias pero con error html de componente
// src/Tabs.tsx
import React, { useState, ReactNode } from 'react';

interface Tab {
  title: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

function Tabs({ tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div style={styles.tabHeaders}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={index === activeTab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div style={styles.tabContent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

const styles = {
  tabHeaders: {
    display: 'flex',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  tab: {
    padding: '10px',
    marginRight: '5px',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
  },
  activeTab: {
    padding: '10px',
    marginRight: '5px',
    borderBottom: '2px solid #007bff',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  tabContent: {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
};

export default Tabs;
*/
