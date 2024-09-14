
import React from 'react';
import PropertyList from './components/PropertyList';
import CreateProperty from './components/CreateProperty';
import UpdateProperty from './components/UpdateProperty';
import DeleteProperty from './components/DeleteProperty';

const App = () => {
  return (
    <div>
      <h1>Real Estate Investment Platform</h1>
      <h2>Manage Properties</h2>
      <CreateProperty />
      <UpdateProperty />
      <DeleteProperty />
      <PropertyList />
    </div>
  );
};

export default App;

/*
import React from 'react';
import PropertyList from './components/PropertyList';
import InvestmentSimulator from './components/InvestmentSimulator';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.ts')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}

const App = () => {
  return (
    <div>
      <h1>Real Estate Investment App</h1>
      <PropertyList />
      <InvestmentSimulator />
    </div>
  );
};

export default App;
*/
