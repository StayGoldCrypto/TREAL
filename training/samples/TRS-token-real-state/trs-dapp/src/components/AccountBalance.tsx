import React, { useState, useEffect } from 'react';
import { useApi, useAccount } from '@gear-js/react-hooks';

const AccountBalance: React.FC = () => {
  const { api, isApiReady } = useApi();
  const { account, isAccountReady } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isApiReady && isAccountReady && account) {
        const accountInfo = await api.query.system.account(account.address);
        console.log(accountInfo); // Datos sin procesar
        console.log(accountInfo.toHuman()); // Log the response to inspect its structure
        console.table(accountInfo.toHuman()); // Muestra los datos en formato tabular
        console.dir(accountInfo.toHuman(), { depth: null }); // Profundidad infinita para objetos anidados
        console.log(JSON.stringify(accountInfo.toHuman(), null, 2)); // Formato JSON con sangría de 2 espacios
        //const freeBalance = accountInfo.data.free.toHuman(); // Adjust this line based on the logged structure
        //setBalance(freeBalance);
      }
    };

    fetchBalance();
  }, [api, isApiReady, isAccountReady, account]);

  return (
    <div>
      <h2>Account Balance</h2>
      {balance ? <p>{balance}</p> : <p>Loading...</p>}
    </div>
  );
};

export default AccountBalance;

/*

import React, { useState, useEffect } from 'react';
import { useApi, useAccount } from '@gear-js/react-hooks';

const AccountBalance: React.FC = () => {
  const { api, isApiReady } = useApi();
  const { account, isAccountReady } = useAccount();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isApiReady && isAccountReady && account) {
        const { data } = await api.query.system.account(account.address);
        setBalance(data.free.toHuman());
      }
    };

    fetchBalance();
  }, [isApiReady, isAccountReady, account, api]);

  if (!isApiReady || !isAccountReady) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Account Balance</h2>
      <p>Address: {account?.address}</p>
      <p>Balance: {balance}</p>
    </div>
  );
};

export default AccountBalance;

*/
