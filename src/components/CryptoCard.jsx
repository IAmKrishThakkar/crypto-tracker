// components/CryptoCard.jsx
import React from 'react';
import SparklineChart from './SparklineChart';
import './../CSS/CryptoCard.css';

const CryptoCard = ({ coin }) => {
  const priceChange24h = coin.price_change_percentage_24h_in_currency || 0;
  const isPositive = priceChange24h >= 0;

  return (
    <div className="card crypto-card">
      <div className="crypto-card-header">
        <div className="flex" style={{ gap: '10px', alignItems: 'center' }}>
          <img src={coin.image} alt={coin.name} width={36} height={36} style={{ borderRadius: '50%' }} />
          <div>
            <strong>{coin.symbol.toUpperCase()}</strong>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{coin.name}</div>
          </div>
        </div>
        <span className="badge" style={{ background: '#334155', color: '#cbd5e1', fontSize: '0.75rem' }}>
          #{coin.market_cap_rank}
        </span>
      </div>

      <div className="crypto-card-chart">
        <SparklineChart
          data={coin.sparkline_in_7d?.price || []}
          trend={priceChange24h}
          height={40}
          width={120}
        />
      </div>

      <div className="crypto-card-footer">
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>
            ${coin.current_price?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: coin.current_price < 1 ? 6 : 2,
            })}
          </div>
          <div className={isPositive ? 'price-positive' : 'price-negative'}>
            {priceChange24h.toFixed(2)}%
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Market Cap</div>
          <div style={{ fontSize: '0.9rem' }}>
            ${(coin.market_cap / 1_000_000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
