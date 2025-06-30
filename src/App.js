// App.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCryptoData, simulateUpdate } from './features/crypto/cryptoSlice';
import Header from './components/Header';
import CryptoDashboard from './components/CryptoDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    dispatch(fetchCryptoData());
    const interval = setInterval(() => dispatch(simulateUpdate()), 1500);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  return (
    <div className="App">
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main className="container" style={{ padding: '2rem 0' }}>
        <CryptoDashboard />
      </main>
      <ToastContainer position="bottom-right" autoClose={2500} theme={darkMode ? 'dark' : 'light'} />
    </div>
  );
}

export default App;
