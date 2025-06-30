// components/CryptoDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CryptoCard from './CryptoCard';
import CryptoRow from './CryptoRow';
import { FaSearch, FaSortAmountDown, FaSortAmountUpAlt } from 'react-icons/fa';

const CryptoDashboard = () => {
  const { assets, status, error } = useSelector((state) => state.crypto);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap', direction: 'desc' });
  const [isGridView, setIsGridView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sorting logic
  const requestSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  // Filter & sort
  const filteredAssets = assets
    .filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === 'gainers') {
        return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
      }
      if (filter === 'losers') {
        return a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency;
      }
      if (sortConfig.key) {
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  // Reset page on filter/search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filter]);

  if (status === 'loading') {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>
        Error loading data: {error}
      </div>
    );
  }

  return (
    <div>
      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem', justifyContent: 'space-between' }}>
        <div className="search-wrapper" style={{ flexGrow: 1, maxWidth: '400px' }}>
          <FaSearch className="icon-left" />
          <input
            type="text"
            placeholder="Search cryptocurrencies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="btn">
          <option value="all">All</option>
          <option value="gainers">Top Gainers</option>
          <option value="losers">Top Losers</option>
        </select>

        <button className="btn" onClick={() => setIsGridView(!isGridView)}>
          {isGridView ? 'Table View' : 'Grid View'}
        </button>
      </div>

      {/* Asset List */}
      {isGridView ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {currentAssets.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      ) : (
        <div className="table-container" style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <SortableTh title="#" sortKey="market_cap_rank" {...{ sortConfig, requestSort }} />
                <th>Coin</th>
                <SortableTh title="Price" sortKey="current_price" {...{ sortConfig, requestSort }} />
                <SortableTh title="1h" sortKey="price_change_percentage_1h_in_currency" {...{ sortConfig, requestSort }} />
                <SortableTh title="24h" sortKey="price_change_percentage_24h_in_currency" {...{ sortConfig, requestSort }} />
                <SortableTh title="7d" sortKey="price_change_percentage_7d_in_currency" {...{ sortConfig, requestSort }} />
                <SortableTh title="Market Cap" sortKey="market_cap" {...{ sortConfig, requestSort }} />
                <th>Last 7 Days</th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((coin, idx) => (
                <CryptoRow key={coin.id} coin={coin} index={startIndex + idx + 1} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="btn" disabled={currentPage === 1}>
            Prev
          </button>
          <span style={{ padding: '8px 16px', fontWeight: 'bold' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="btn" disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const SortableTh = ({ title, sortKey, sortConfig, requestSort }) => {
  const isActive = sortConfig.key === sortKey;
  return (
    <th onClick={() => requestSort(sortKey)} style={{ cursor: 'pointer' }}>
      <div className="flex" style={{ gap: '0.25rem' }}>
        {title}
        {isActive && (
          sortConfig.direction === 'asc' ? <FaSortAmountUpAlt size={12} /> : <FaSortAmountDown size={12} />
        )}
      </div>
    </th>
  );
};

export default CryptoDashboard;
