import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Este archivo debería estar también en /js

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
