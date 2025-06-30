// components/CryptoRow.jsx
import React from 'react';
import SparklineChart from './SparklineChart';
import './../CSS/CryptoRow.css';

const CryptoRow = ({ coin, index }) => {
  const formatNumber = (num) => {
    if (!num) return '—';
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const renderChangeBadge = (value) => {
    const isPositive = value >= 0;
    return (
      <span className={`badge ${isPositive ? 'badge-positive' : 'badge-negative'}`}>
        {value?.toFixed(2)}%
      </span>
    );
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="coin-info">
          <img src={coin.image} alt={coin.name} className="coin-logo" />
          <div>
            <div>{coin.name}</div>
            <div className="symbol">{coin.symbol.toUpperCase()}</div>
          </div>
        </div>
      </td>
      <td>
        <span className={coin.price_change_percentage_24h_in_currency >= 0 ? 'price-positive' : 'price-negative'}>
          ${coin.current_price?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: coin.current_price < 1 ? 6 : 2
          })}
        </span>
      </td>
      <td>{renderChangeBadge(coin.price_change_percentage_1h_in_currency)}</td>
      <td>{renderChangeBadge(coin.price_change_percentage_24h_in_currency)}</td>
      <td>{renderChangeBadge(coin.price_change_percentage_7d_in_currency)}</td>
      <td>${formatNumber(coin.market_cap)}</td>
      <td>${formatNumber(coin.total_volume)}</td>
      <td>{formatNumber(coin.circulating_supply)} {coin.symbol.toUpperCase()}</td>
      <td>
        <SparklineChart 
          data={coin.sparkline_in_7d?.price || []}
          trend={coin.price_change_percentage_7d_in_currency}
        />
      </td>
    </tr>
  );
};

export default CryptoRow;
