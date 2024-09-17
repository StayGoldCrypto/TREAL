import React from 'react';
import { ApiProvider, AccountProvider } from '@gear-js/react-hooks';
import AccountBalance from './components/AccountBalance';
import './styles/App.scss';

const App: React.FC = () => {
  return (
    <ApiProvider endpoint="wss://testnet.vara.network">
      <AccountProvider appName="MyDApp">
        <AccountBalance />
      </AccountProvider>
    </ApiProvider>
  );
};

export default App;
