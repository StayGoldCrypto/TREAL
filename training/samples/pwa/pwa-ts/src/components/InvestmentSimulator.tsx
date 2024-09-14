import React, { useState } from 'react';

const InvestmentSimulator = () => {
  const [amount, setAmount] = useState<number>(0);
  const [returnRate] = useState<number>(0.05); // 5% retorno de inversión
  const [result, setResult] = useState<number | null>(null);

  const handleSimulate = () => {
    const potentialReturn = amount + (amount * returnRate);
    setResult(potentialReturn);
  };

  return (
    <div>
      <h2>Investment Simulator</h2>
      <input
        type="number"
        placeholder="Enter investment amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button onClick={handleSimulate}>Simulate</button>
      {result && <p>Potential return: ${result}</p>}
    </div>
  );
};

export default InvestmentSimulator;
