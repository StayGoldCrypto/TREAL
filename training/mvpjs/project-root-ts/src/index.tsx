import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Usa 'createRoot' en lugar de 'render'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/
