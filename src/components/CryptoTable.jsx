// CryptoTable.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CryptoRow from './CryptoRow';
import styled from 'styled-components';

const Container = styled.div`
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin: 20px;
  overflow: hidden;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 16px;
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #888;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 6px;
    background: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 3px;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1200px;
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
  font-size: 14px;
  color: #6c757d;
`;

const Th = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 500;
  white-space: nowrap;
`;

const StatusMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 16px;
  color: #6c757d;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f8f9fa;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CryptoTable = () => {
  const { assets, status, error } = useSelector((state) => state.crypto);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAssets = [...assets].sort((a, b) => {
    if (filter === 'gainers') {
      return b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency;
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAssets = filteredAssets.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (status === 'loading') return <StatusMessage>🔄 Loading cryptocurrency data...</StatusMessage>;
  if (error) return <StatusMessage>❌ Error: {error}</StatusMessage>;

  return (
    <Container>
      <FilterBar>
        <h2 style={{ margin: 0 }}>Cryptocurrency Prices</h2>
        <div>
          <label style={{ marginRight: '12px', fontSize: '14px' }}>Sort by:</label>
          <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Assets</option>
            <option value="gainers">24h Gainers</option>
          </FilterSelect>
        </div>
      </FilterBar>
      
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              <Th>#</Th>
              <Th>Coin</Th>
              <Th>Price</Th>
              <Th>1h</Th>
              <Th>24h</Th>
              <Th>7d</Th>
              <Th>Market Cap</Th>
              <Th>Volume (24h)</Th>
              <Th>Circulating Supply</Th>
              <Th>Last 7 Days</Th>
            </tr>
          </TableHeader>
          <tbody>
            {currentAssets.map((coin, index) => (
              <CryptoRow key={coin.id} coin={coin} index={startIndex + index + 1} />
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>

      <Pagination>
        <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </PageButton>
        <span style={{ padding: '8px 16px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <PageButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default CryptoTable;