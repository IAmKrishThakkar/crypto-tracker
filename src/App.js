import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCryptoData, simulateUpdate } from './features/crypto/cryptoSlice';
import CryptoTable from './components/CryptoTable';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCryptoData());

    const interval = setInterval(() => {
      dispatch(simulateUpdate());
    }, 1500); // Every 1.5 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>📈</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
